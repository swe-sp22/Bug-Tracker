using BugTrackingSystem.Models;

namespace BugTrackingSystem.Services;

public interface IProjectsService
{
    Task<List<Project>> GetAllProjectsAsync();
    Task<Project?> GetProjectAsync(int projectId);
    Task CreateProjectAsync(Project project);
    Task UpdateProjectAsync(Project dbProject, Project updatedProject);
    Task DeleteProjectAsync(Project project);
}
