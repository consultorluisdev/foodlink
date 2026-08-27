namespace api.DTOs.Categories;

public class CategoryResponseDto
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empyt;
  public string? Description { get; set; }
  public bool IsActive { get; set; }
  public DateTime CreatedAt { get; set; }
  public DateTime UpdatedAt { get; set; }
  public int ProductCount { get; set; }
}
