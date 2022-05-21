using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BugTrackingSystem.Data;
using BugTrackingSystem.Models;
using Microsoft.AspNetCore.Identity;
using BugTrackingSystem.Services;
using BugTrackingSystem.Filters;

namespace BugTrackingSystem.Controllers.Api;

[ValidateModel]
[Route("api/[controller]")]
[Area("api")]
[ApiController]
public class ProfilesController : ControllerBase
{
    private readonly IProfilesService _profilesService;
    private readonly UserManager<Customer> _userManager;

    public ProfilesController(IProfilesService profilesService, UserManager<Customer> userManager)
    {
        _profilesService = profilesService;
        _userManager = userManager;
    }

    // POST: api/Profiles/UserName/MakeStaff
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost("{id}/MakeStaff")]
    public async Task<ActionResult<Project>> MakeStaff(string id)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user is not Administrator)
        {
            return Forbid();
        }

        var profile = await _profilesService.GetProfileAsync(id);
        if (profile is StaffMember)
        {
            return BadRequest($"User '{id}' is already a staff member.");
        }

        if (profile is null)
        {
            return NotFound();
        }

        try
        {
            await _profilesService.MakeStaffMember(profile);
            return NoContent();
        }
        catch (DbUpdateException ex)
        {
            return BadRequest(ex.InnerException?.Message ?? ex.Message);
        }
    }

    // POST: api/Profiles/UserName/MakeAdmin
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost("{id}/MakeAdmin")]
    public async Task<ActionResult<Project>> MakeAdmin(string id)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user is not Administrator)
        {
            return Forbid();
        }

        var profile = await _profilesService.GetProfileAsync(id);
        if (profile is Administrator)
        {
            return BadRequest($"User '{id}' is already an administrator.");
        }

        if (profile is null)
        {
            return NotFound();
        }

        try
        {
            await _profilesService.MakeAdmin(profile);
            return NoContent();
        }
        catch (DbUpdateException ex)
        {
            return BadRequest(ex.InnerException?.Message ?? ex.Message);
        }
    }
}
