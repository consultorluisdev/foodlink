using.System.ComponentModel.DataAnnotations;
using.System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities;

[Table("Categories")]
public class Category
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int Id { get; set; }

  [Required]
  [MaxLength(100)]
  public string Name { get; set; } = string.Empty;

  [MaxLength(500)]
  public string? Description { get; set; }

  public bool IsActive { get; set; }

  public DateTime CreatedAt { get; set; }

  // navigation Property
  public virtual ICollection<Product> Product { get; set;} = new List<Product>();

}
