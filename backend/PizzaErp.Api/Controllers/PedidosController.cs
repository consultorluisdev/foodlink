using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzaErp.Api.Data;
using PizzaErp.Api.Models;

[ApiController]
[Route("api/pedidos")]
public class PedidosController : ControllerBase
{
    private readonly AppDbContext _db;
    public PedidosController(AppDbContext db) => _db = db;

    [HttpGet]
    public IActionResult Get()
    {
        var pedidos = _db.Pedidos
            .OrderByDescending(p => p.Data)
            .ToList();
        return Ok(pedidos);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var pedido = _db.Pedidos.Find(id);
        if (pedido == null) return NotFound();
        return Ok(pedido);
    }

    [HttpPost]
    public IActionResult Post(Pedido pedido)
    {
        if (pedido.Fiado)
        {
            var cliente = _db.Clientes.Find(pedido.ClienteId);
            if (cliente == null) return NotFound(new { error = "Cliente não encontrado" });

            if (cliente.SaldoDevedor + pedido.Valor > cliente.LimiteCredito)
                return BadRequest(new { error = "Limite de crédito excedido" });

            cliente.SaldoDevedor += pedido.Valor;
        }

        pedido.Data = DateTime.Now;
        _db.Pedidos.Add(pedido);
        _db.SaveChanges();
        return Ok(pedido);
    }
}