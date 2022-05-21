using System.ComponentModel.DataAnnotations;

namespace BugTrackingSystem.Models;

public class Project
{
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; } = null!;

    [Required]
    public string Description { get; set; } = null!;

    public Bug[] Bugs { get; set; } = null!;
}
