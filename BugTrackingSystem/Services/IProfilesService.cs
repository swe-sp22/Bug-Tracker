using BugTrackingSystem.Models;

namespace BugTrackingSystem.Services;

public interface IProfilesService
{
    Task<Customer?> GetProfileAsync(string userName);
    Task MakeStaffMember(Customer profile);
    Task MakeAdmin(Customer profile);
    Task<List<Customer>> GetAllProfilesAsync();
}
