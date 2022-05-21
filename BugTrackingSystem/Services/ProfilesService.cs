using BugTrackingSystem.Data;
using BugTrackingSystem.Models;
using BugTrackingSystem.Services;
using Microsoft.EntityFrameworkCore;

namespace BugTrackingSystem.Services;

public class ProfilesService : IProfilesService
{
    private readonly ApplicationDbContext _context;

    public ProfilesService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Customer>> GetAllProfilesAsync()
    {
        return await _context.Customers.ToListAsync();
    }

    public Task<Customer?> GetProfileAsync(string userName)
    {
        return Task.FromResult(_context.Customers.SingleOrDefault(c => c.UserName == userName));
    }

    public async Task MakeStaffMember(Customer profile)
    {
        await _context.Database.ExecuteSqlRawAsync("UPDATE [dbo].[AspNetUsers] SET [Discriminator]={0} WHERE Id={1}", nameof(StaffMember), profile.Id);
    }

    public async Task MakeAdmin(Customer profile)
    {
        await _context.Database.ExecuteSqlRawAsync("UPDATE [dbo].[AspNetUsers] SET [Discriminator]={0} WHERE Id={1}", nameof(Administrator), profile.Id);
    }
}
