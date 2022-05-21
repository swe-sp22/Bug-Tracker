using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using BugTrackingSystem.Controllers.Api;
using BugTrackingSystem.Models;
using BugTrackingSystem.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace ApiTests;

public class BugsControllerTests
{
    private class MockBugsService : IBugsService
    {
        private readonly List<Bug> _bugs = new();

        public Task AssignToAsync(Bug bug, StaffMember staffMember)
        {
            _bugs.Single(b => b.Id == bug.Id).AssignedTo = staffMember;
            return Task.CompletedTask;
        }

        public Task CreateBugAsync(Bug bug)
        {
            _bugs.Add(bug);
            return Task.CompletedTask;
        }

        public Task DeleteBugAsync(Bug bug)
        {
            if (!_bugs.Remove(bug))
            {
                throw new Exception("Bug doesn't exist.");
            }

            return Task.CompletedTask;
        }

        public Task<List<Bug>> GetAllBugsAsync() => Task.FromResult(_bugs);

        public Task<Bug?> GetBugAsync(int bugId) => Task.FromResult(_bugs.SingleOrDefault(b => b.Id == bugId));

        public Task UpdateBugAsync(Bug dbBug, Bug updatedBug)
        {
            if (!_bugs.Remove(dbBug))
            {
                throw new Exception("Bug doesn't exist.");
            }

            _bugs.Add(updatedBug);
            return Task.CompletedTask;
        }

        public Task UpdateBugStatusAsync(Bug bug, BugStatus bugStatus)
        {
            _bugs.Single(b => b.Id == bug.Id).Status = bugStatus;
            return Task.CompletedTask;
        }
    }

    private class UserManagerMock : UserManager<Customer>
    {
        public UserManagerMock() : base(new UserStoreMock(), null, null, null, null, null, null, null, null)
        {
        }

        public Customer Customer { get; set; } = null!;

        public override Task<Customer> GetUserAsync(ClaimsPrincipal principal) => Task.FromResult(Customer);
    }

    private class UserStoreMock : IUserStore<Customer>
    {
        public Task<IdentityResult> CreateAsync(Customer user, CancellationToken cancellationToken) => throw new NotImplementedException();

        public Task<IdentityResult> DeleteAsync(Customer user, CancellationToken cancellationToken) => throw new NotImplementedException();

        public void Dispose() => throw new NotImplementedException();

        public Task<Customer> FindByIdAsync(string userId, CancellationToken cancellationToken) => throw new NotImplementedException();

        public Task<Customer> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken) => throw new NotImplementedException();

        public Task<string> GetNormalizedUserNameAsync(Customer user, CancellationToken cancellationToken) => throw new NotImplementedException();

        public Task<string> GetUserIdAsync(Customer user, CancellationToken cancellationToken) => throw new NotImplementedException();

        public Task<string> GetUserNameAsync(Customer user, CancellationToken cancellationToken) => throw new NotImplementedException();

        public Task SetNormalizedUserNameAsync(Customer user, string normalizedName, CancellationToken cancellationToken) => throw new NotImplementedException();

        public Task SetUserNameAsync(Customer user, string userName, CancellationToken cancellationToken) => throw new NotImplementedException();

        public Task<IdentityResult> UpdateAsync(Customer user, CancellationToken cancellationToken) => throw new NotImplementedException();
    }

    [Fact]
    public async Task TestAddBug()
    {
        var userManager = new UserManagerMock();
        var controller = new BugsController(new MockBugsService(), userManager);
        var newBug = new Bug { Title = "Bug title..", Description = "Bug description" };
        var result = await controller.PostBug(newBug);

        Assert.IsType<CreatedAtActionResult>(result.Result);
        Assert.Equal(201, ((CreatedAtActionResult)result.Result!).StatusCode);

        var bug = (await controller.GetBug(0)).Value;
        Assert.Equal(bug, newBug);
    }

    [Fact]
    public async Task TestGetBug_NotFound()
    {
        var userManager = new UserManagerMock();
        var controller = new BugsController(new MockBugsService(), userManager);

        var result = await controller.GetBug(0);
        Assert.IsType<NotFoundResult>(result.Result);
        Assert.Equal(404, ((NotFoundResult)result.Result!).StatusCode);
    }
}
