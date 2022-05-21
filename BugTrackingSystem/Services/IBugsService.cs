using BugTrackingSystem.Models;

namespace BugTrackingSystem.Services;

public interface IBugsService
{
    Task<List<Bug>> GetAllBugsAsync();
    Task<Bug?> GetBugAsync(int bugId);
    Task CreateBugAsync(Bug bug);
    Task UpdateBugAsync(Bug dbBug, Bug updatedBug);
    Task DeleteBugAsync(Bug bug);
    Task UpdateBugStatusAsync(Bug bug, BugStatus bugStatus);
    Task AssignToAsync(Bug bug, StaffMember staffMember);
}
