using BugTrackingSystem.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BugTrackingSystem.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Project>()
                .HasIndex(p => p.Name).IsUnique(true);
        }

        public DbSet<Administrator> Administrators => Set<Administrator>();
        public DbSet<Customer> Customers => Set<Customer>();
        public DbSet<StaffMember> StaffMembers => Set<StaffMember>();
        public DbSet<Bug> Bugs => Set<Bug>();
        public DbSet<BugComment> BugComments => Set<BugComment>();
        public DbSet<Project> Projects => Set<Project>();
    }
}
