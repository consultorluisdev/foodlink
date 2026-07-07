using Microsoft.AspNetCore.Mvc;
using PizzaErp.Api.Data;
using PizzaErp.Api.Models;

[ApiController]
[Route("api/pedidos")]
public class PedidosController : ControllerBase
{
  private readonly AppDbContext _db;
  public PedidosController(AppDbContext db) => _db = db;

  [HttpPost]
  public IActionResult Post(Pedido pedido)
  {
    var cliente = _db.Clientes.Find(pedido.ClienteId);
    if (cliente == null) return NotFound();

    if (pedido.Fiado)
    {
      if (cliente.SaldoDevedor + pedido.Valor > cliente.LimiteCredito)
        return BadRequest("Limite de crédito excedido");

      cliente.SaldoDevedor += pedido.Valor;
    }
    _db.Pedidos.Add(pedido);
    _db.SaveChanges();

    return Ok(pedido);
  }
}