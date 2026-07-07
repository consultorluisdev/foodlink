namespace PizzaErp.Api.Models;
public class Pedido
{
  public int Id {get; set;}
  public int ClienteId { get; set; }
  public int PizzaId { get; set; }
  public DateTime Data { get; set; } = DateTime.Now;

  public decimal Valor { get; set; }
  public bool Fiado {get; set;}
}