using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Categories;

public class UpdateCategoryDto
{
  [Required(ErrorMessage = "Nome é obrigatório")]
  [MaxLength(100, ErrorMessage = "Nome deve ter no maximo 100 caracteres")]
  public string Name {`get; set; } = string.Empty;

  [MaxLength(500, ErrorMessage = "Descrição deve ter no maximo 500 caracteres")]

  public string? Description { get; set; }

  public bool IsActive { get; set; }

}
