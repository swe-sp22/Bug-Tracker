using Microsoft.AspNetCore.Mvc;
using BugTrackingSystem.Models;
using BugTrackingSystem.Services;
using Microsoft.AspNetCore.Identity;
using BugTrackingSystem.Filters;

namespace BugTrackingSystem.Controllers;

[ValidateModel]
public class ProjectsController : Controller
{
    private readonly IProjectsService _projectsService;
    private readonly UserManager<Customer> _userManager;

    public ProjectsController(IProjectsService projectsService, UserManager<Customer> userManager)
    {
        _projectsService = projectsService;
        _userManager = userManager;
    }

    // GET: Projects
    public async Task<IActionResult> Index()
    {
        return View(await _projectsService.GetAllProjectsAsync());
    }

    // GET: Projects/Details/5
    public async Task<IActionResult> Details(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var project = await _projectsService.GetProjectAsync(id.Value);
        if (project == null)
        {
            return NotFound();
        }

        return View(project);
    }

    // GET: Projects/Create
    public async Task<IActionResult> CreateAsync()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user is not Administrator)
        {
            return Forbid();
        }

        return View();
    }

    // GET: Projects/Edit/5
    public async Task<IActionResult> Edit(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var project = await _projectsService.GetProjectAsync(id.Value);
        if (project == null)
        {
            return NotFound();
        }

        var user = await _userManager.GetUserAsync(User);
        if (user is not Administrator)
        {
            return Forbid();
        }

        return View(project);
    }

    // GET: Projects/Delete/5
    public async Task<IActionResult> Delete(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var project = await _projectsService.GetProjectAsync(id.Value);
        if (project == null)
        {
            return NotFound();
        }

        var user = await _userManager.GetUserAsync(User);
        if (user is not Administrator)
        {
            return Forbid();
        }

        return View(project);
    }
}
