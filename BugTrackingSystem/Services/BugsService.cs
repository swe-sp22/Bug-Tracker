using BugTrackingSystem.Data;
using BugTrackingSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace BugTrackingSystem.Services;

public class BugsService : IBugsService
{
    private readonly ApplicationDbContext _context;

    public BugsService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AssignToAsync(Bug bug, StaffMember staffMember)
    {
        bug.AssignedTo = staffMember;
        await _context.SaveChangesAsync();
    }

    public async Task CreateBugAsync(Bug bug)
    {
        _context.Bugs.Add(bug);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteBugAsync(Bug bug)
    {
        _context.Bugs.Remove(bug);
        await _context.SaveChangesAsync();
    }

    public async Task<List<Bug>> GetAllBugsAsync()
    {
        return await _context.Bugs.ToListAsync();
    }

    public async Task<Bug?> GetBugAsync(int bugId)
    {
        return await _context.Bugs.FindAsync(bugId);
    }

    public async Task UpdateBugAsync(Bug dbBug, Bug updatedBug)
    {
        dbBug.Title = updatedBug.Title;
        dbBug.Description = updatedBug.Description;
        dbBug.Project = updatedBug.Project;
        dbBug.AssignedTo = updatedBug.AssignedTo;

        await _context.SaveChangesAsync();
    }

    public async Task UpdateBugStatusAsync(Bug bug, BugStatus bugStatus)
    {
        bug.Status = bugStatus;
        await _context.SaveChangesAsync();
    }
}
