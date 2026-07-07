using Microsoft.AspNetCore.Mvc;
using PizzaErp.Api.Data;
using PizzaErp.Api.Models;

[ApiController]
[Route("api/clientes")]
public class ClientesController : ControllerBase
{
  private readonly AppDbContext _db;
  public ClientesController(AppDbContext db) => _db = db;

  [HttpGet]
  public IActionResult Get() => Ok(_db.Clientes.ToList());

  [HttpPost]
  public IActionResult Post(Cliente cliente)
  {
    _db.Clientes.Add(cliente);
    _db.SaveChanges();
    return CreatedAtAction(nameof(Get), new { id = cliente.Id }, cliente);
  }
}