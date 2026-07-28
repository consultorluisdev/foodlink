namespace PizzaErp.Api.Models;
public class Pizza : BaseEntity
{
  public string Nome { get; set; } = "";
  public decimal Preco { get; set; }
}