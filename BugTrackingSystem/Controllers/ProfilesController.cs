using Microsoft.AspNetCore.Mvc;
using BugTrackingSystem.Models;
using BugTrackingSystem.Services;
using Microsoft.AspNetCore.Identity;
using BugTrackingSystem.Filters;

namespace BugTrackingSystem.Controllers;

[ValidateModel]
public class ProfilesController : Controller
{
    private readonly IProfilesService _profilesService;
    private readonly UserManager<Customer> _userManager;

    public ProfilesController(IProfilesService profilesService, UserManager<Customer> userManager)
    {
        _profilesService = profilesService;
        _userManager = userManager;
    }

    // GET: Profiles
    public async Task<IActionResult> Index()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user is not Administrator)
        {
            // Only admins can view all users.
            return Forbid();
        }
        return View(await _profilesService.GetAllProfilesAsync());
    }

    // GET: Profiles/Details/UserName
    public async Task<IActionResult> Details(string? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var profile = await _profilesService.GetProfileAsync(id);
        if (profile == null)
        {
            return NotFound();
        }

        return View(profile);
    }
}
