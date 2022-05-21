using System.ComponentModel.DataAnnotations;

namespace BugTrackingSystem.Models;

public class Bug
{
    public int Id { get; set; }

    [Required()]
    public Customer Customer { get; set; } = null!;

    [Required]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public BugStatus Status { get; set; }

    public BugComment[] Comments { get; set; } = null!;

    public StaffMember? AssignedTo { get; set; }

    [Required]
    public Project Project { get; set; } = null!;
}
