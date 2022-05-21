using BugTrackingSystem.Data;
using BugTrackingSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace BugTrackingSystem.Services;

public class ProjectsService : IProjectsService
{
    private readonly ApplicationDbContext _context;

    public ProjectsService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task CreateProjectAsync(Project project)
    {
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteProjectAsync(Project project)
    {
        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();
    }

    public async Task<List<Project>> GetAllProjectsAsync()
    {
        return await _context.Projects.ToListAsync();
    }

    public async Task<Project?> GetProjectAsync(int projectId)
    {
        return await _context.Projects.FindAsync(projectId);
    }

    public async Task UpdateProjectAsync(Project dbProject, Project updatedProject)
    {
        dbProject.Name = updatedProject.Name;
        dbProject.Description = updatedProject.Description;

        await _context.SaveChangesAsync();
    }
}
