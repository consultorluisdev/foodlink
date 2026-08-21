using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace api.Entities;

[Table("Products")]
public class Product
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int Id { get; set; }

  [Required]
  [MaxLength(200)]
  public string? Description { get; set; }

  [Column(TypeName = "decimal(18,2)")]
  public decimal Price { get; set; }

  [Column(TypeName = "decimal(18,2)")]
  public decimal CostPrice { get; set; }

  public int stock { get; set; }

  [Required]
  public int CategoryId { get; set; }

  [MaxLength(500)]
  public string: ImageUrl { get; set; }

  public bool IsActive { get; set; } = true;

  public DateTime CreatedAt { get; set; }

  public DateTime UpdatedAt { get; set; }

  // navigation Property
  [ForeignKey(nameof(CategoryId))]
  public virtual Category? Category { get; set; }

}
