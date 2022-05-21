using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BugTrackingSystem.Data;
using BugTrackingSystem.Models;
using Microsoft.AspNetCore.Identity;
using BugTrackingSystem.Services;
using BugTrackingSystem.Filters;

namespace BugTrackingSystem.Controllers.Api
{
    [ValidateModel]
    [Route("api/[controller]")]
    [Area("api")]
    [ApiController]
    public class BugsController : ControllerBase
    {
        private readonly IBugsService _bugsService;
        private readonly UserManager<Customer> _userManager;

        public BugsController(IBugsService bugsService, UserManager<Customer> userManager)
        {
            _bugsService = bugsService;
            _userManager = userManager;
        }

        // GET: api/Bugs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bug>>> GetBugs()
        {
            return await _bugsService.GetAllBugsAsync();
        }

        // GET: api/Bugs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bug>> GetBug(int id)
        {
            var bug = await _bugsService.GetBugAsync(id);
            if (bug == null)
            {
                return NotFound();
            }

            return bug;
        }

        // PUT: api/Bugs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBug(int id, Bug bug)
        {
            var dbBug = await _bugsService.GetBugAsync(id);
            if (dbBug is null)
            {
                return NotFound();
            }

            var user = await _userManager.GetUserAsync(User);
            if (user is not Administrator /*&& user.Id != bug.Customer.Id*/) // TODO: Can a user edit his own bug? What fields should be changed by admin only?
            {
                return BadRequest();
            }

            await _bugsService.UpdateBugAsync(dbBug, bug);
            return NoContent();
        }

        // POST: api/Bugs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Bug>> PostBug(Bug bug)
        {
            if (bug.Status != BugStatus.New ||
                bug.AssignedTo != null ||
                bug.Comments != null)
            {
                return BadRequest("A new bug must have BugStatus.New, be unassigned, and have no comments.");
            }

            await _bugsService.CreateBugAsync(bug);
            return CreatedAtAction("GetBug", new { id = bug.Id }, bug);
        }

        // DELETE: api/Bugs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBug(int id)
        {
            var bug = await _bugsService.GetBugAsync(id);
            if (bug == null)
            {
                return NotFound();
            }

            var user = await _userManager.GetUserAsync(User);
            if (user is not Administrator)
            {
                return Forbid();
            }

            await _bugsService.DeleteBugAsync(bug);

            return NoContent();
        }

        // POST: api/Bugs/5/ChangeStatus
        [HttpPost("{id}/ChangeStatus")]
        public async Task<IActionResult> ChangeStatus(int id, BugStatus bugStatus)
        {
            var bug = await _bugsService.GetBugAsync(id);
            if (bug == null)
            {
                return NotFound();
            }

            var user = await _userManager.GetUserAsync(User);
            if (user is not (Administrator or StaffMember))
            {
                return Forbid();
            }

            if (bugStatus is BugStatus.NotABug or BugStatus.NotReproducible)
            {
                return BadRequest();
            }

            await _bugsService.UpdateBugStatusAsync(bug, bugStatus);

            return NoContent();
        }

        // POST: api/Bugs/5/Assign
        [HttpPost("{id}/Assign")]
        public async Task<IActionResult> Assign(int id, Customer customer)
        {
            var bug = await _bugsService.GetBugAsync(id);
            if (bug == null)
            {
                return NotFound();
            }

            var user = await _userManager.GetUserAsync(User);
            if (user is not Administrator)
            {
                return Forbid();
            }

            if (customer is not StaffMember staffMember)
            {
                return BadRequest();
            }

            await _bugsService.AssignToAsync(bug, staffMember);

            return NoContent();
        }
    }
}
