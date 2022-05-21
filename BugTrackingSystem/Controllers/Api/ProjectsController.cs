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
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectsService _projectsService;
        private readonly UserManager<Customer> _userManager;

        public ProjectsController(IProjectsService projectsService, UserManager<Customer> userManager)
        {
            _projectsService = projectsService;
            _userManager = userManager;
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            return await _projectsService.GetAllProjectsAsync();
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            var project = await _projectsService.GetProjectAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            return project;
        }

        // PUT: api/Projects/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, Project project)
        {
            var dbProject = await _projectsService.GetProjectAsync(id);
            if (dbProject is null)
            {
                return NotFound();
            }

            var user = await _userManager.GetUserAsync(User);
            if (user is not Administrator)
            {
                return BadRequest();
            }

            await _projectsService.UpdateProjectAsync(dbProject, project);
            return NoContent();
        }

        // POST: api/Projects
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user is not Administrator)
            {
                return Forbid();
            }

            try
            {
                await _projectsService.CreateProjectAsync(project);
                return CreatedAtAction("GetProject", new { id = project.Id }, project);
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(ex.InnerException?.Message ?? ex.Message);
            }
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _projectsService.GetProjectAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            var user = await _userManager.GetUserAsync(User);
            if (user is not Administrator)
            {
                return Forbid();
            }

            await _projectsService.DeleteProjectAsync(project);

            return NoContent();
        }
    }
}
