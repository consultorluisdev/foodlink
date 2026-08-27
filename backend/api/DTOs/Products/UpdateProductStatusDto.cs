using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Products;

public class UpdateProductStatusDto
{
  [Required]
  public bool IsActive { get; set; }
}
