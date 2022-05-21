namespace BugTrackingSystem.Models;

public class BugComment
{
    public int Id { get; set; }
    public Bug Bug { get; set; } = null!;
    public string Text { get; set; } = null!;
    public Customer Commenter { get; set; } = null!;
}
