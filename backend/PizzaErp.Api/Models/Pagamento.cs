namespace PizzaErp.Api.Models;
public class Pagamento
{
  public int Id { get; set;}
  public int ClienteId {get; set;}
  public decimal Valor { get; set; }
  public DateTime Data { get; set; } = DateTime.Now;
}