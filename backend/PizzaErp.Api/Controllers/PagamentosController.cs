using Microsoft.AspNetCore.Mvc;
using PizzaErp.Api.Data;
using PizzaErp.Api.Models;

[ApiController]
[Route("api/[controller]")]
public class PagamentosController : ControllerBase
{
  private readonly AppDbContext _db;
  public PagamentosController(AppDbContext db) => _db = db;

  [HttpGet]
  public IActionResult Pagar(Pagamento pagamento)
  {
    var cliente = _db.Clientes.Find(pagamento.ClienteId);
    if(cliente == null) return NotFound();

    cliente.SaldoDevedor -= pagamento.Valor;
    if(cliente.SaldoDevedor < 0) cliente.SaldoDevedor = 0;

    _db.Pagamentos.Add(pagamento);
    _db.SaveChanges();

    return Ok(pagamento);
  }
}