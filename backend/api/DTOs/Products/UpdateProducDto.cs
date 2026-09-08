using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Products;

public class UpdateProductDto
{
  [Required(ErrorMessage = "Nome é obrigátorio")]
  [MaxLength(200, ErrorMessage = "Nome deve ter no maximo 200 caracteres")]
  public string Name { get; set; } = string.Empty;

  [MaxLength(1000, ErrorMessage = "Descrição deve ter no maximo 1000 caracteres")]
  public string? Description { get; set; }

  [Range(0, double.MaxValue, ErrorMessage = "Preço deve ser maior ou igual a 0")]
  public decimal Price { get; set; }

  [Range(0, double.MaxValue, ErrorMessage = "Preço de custo deve ser maior ou igual a 0")]
  public decimal CostPrice { get; set; }

  [Range(0, int.MaxValue, ErrorMessage = "Estoque deve ser maior ou igual a 0")]
  public int Stock { get; set; }

  [MaxLength(500)]
  public string? ImageUrl { get; set; }

  public bool IsActive { get; set; }

  public int CategoryId { get; set; }
}
