using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Entities;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PedidosController : ControllerBase
{
  private readonly AppDbContext _context;

  public PedidosController(AppDbContext context)
  {
    _context = context;
  }
  // Get: api/pedidos
  [HttpGet]
  public async Task<ActionResult<IEnumerable<Pedido>>> GetPedidos(
    [FromQuery] string? status = null,
    [FromQuery] int? clienteId = null,
    [FromQuery] DateTime? dataInicio = null,
    [FromQuery] DateTime? dataFim = null)
  {
    var query = _context.Pedidos
    .Include(p => p.Cliente)
    .Include(p => p.Itens)
        .ThenInclude(i => i.Produto)
    .AsQueryable();

    if (!string.IsNullOrWhiteSpace(status))
      query = query.Where(p => p.Status == status);


    if (clienteId.HasValue)
      query = query.Where(p => p.ClienteId == clienteId.Value);


    if (dataInicio.HasValue)
      query = query.Where(p => p.CreatedAt >= dataInicio.Value);

    if (dataFim.HasValue)
    {
      query = query.Where(p => p.CreatedAt <= dataFim.Value);
    }

    var pedidos = await query
    .OrderByDescending(p => p.CreatedAt)
    .Select(p => new
    {
      p.Id,
      p.ClienteId,
      ClienteNome  = p.Cliente?.Nome,
      p.Status,
      p.ValorTotal,
      p.Observacao,
      p.Fiado,
      p.CreatedAt,
      Itens = p.Itens.Select(i => new
      {
        i.Id,
        i.ProdutoId,
        ProdutoNome = i.Produto?.Nome,
        i.Quantidade,
        i.PrecoUnitario
      }).ToList()
    }).ToListAsync();

    return Ok(pedidos);
  }
// GET: api/pedidos/{id}
  [HttpGet("{id}")]
  public async Task<ActionResult<object>> GetPedido(int id)
  {
    var pedido = await _context.Pedidos
      .Include(p => p.Cliente)
      .Include(p => p.Itens)
        .ThenInclude(i => i.Produto)
      .Where(p => p.Id == id)
      .Select(p => new
      {
        p.Id,
        p.ClienteId,
        ClienteNome = p.Cliente?.Nome,
        ClienteTelefone = p.Cliente?.Telefone,
        p.Status,
        p.ValorTotal,
        p.Observacao,
        p.Fiado,
        p.CreatedAt,
        Itens = p.Itens.Select(i => new
        {
          i.Id,
          i.ProdutoId,
          ProdutoNome = i.Produto?.Nome,
          ProdutoPreco = i.Produto?.Price ?? 0,
          i.Quantidade,
          i.PrecoUnitario,
          Subtotal = i.Quantidade * i.PrecoUnitario
        })
      })
      .FirstOrDefaultAsync();

    if (pedido == null)
      return NotFound(new { message = "Pedido não encontrado" });
    return NotFound();

  }
  // POST: api/pedidos
  [HttpPost]
  public async Task<ActionResult<object>> CreatePedido([FromBody] CreatePedidoDto dto)
  {
    var cliente = await _context.Clientes.FindAsync(dto.ClienteId);
    if(cliente == null)
      return NotFound(new { message = "Cliente não encontrado "});

    if(dto.Itens == null || !dto.Itens.Any())
      return BadRequest(new { message = "O pedido deve conter pelo menos um item"});

      var pedido = new Pedido
      {
        ClienteId = dto.ClienteId,
        Status = "Pendente",
        Observacao = dto.Observacao,
        Fiado = dto.Fiado,
        CreatedAt = DateTime.UtcNow,
        Itens = new List<ItemPedido>()
      };
      decimal valorTotal = 0;

      foreach(var itemDto in dto.Itens)
      {
        var produto = await _context.Products.FindAsync(itemDto.ProdutoId);
        if(produto == null)
          return NotFound(new { message = $"Produto com ID {itemDto.ProdutoId} não encontrado"});

        var itemPedido = new ItemPedido
        {
          ProdutoId = itemDto.ProdutoId,
          Quantidade = itemDto.Quantidade,
          PrecoUnitario = produto.Price
        };
        valorTotal += itemPedido.PrecoUnitario * itemPedido.Quantidade;
        pedido.Itens.Add(itemPedido);
      };

      pedido.ValorTotal = valorTotal;

      _context.Pedidos.Add(pedido);
      await _context.SaveChangesAsync();

      // recarregar com relacionametos
      await _context.Entry(pedido).Reference(p => p.Cliente).LoadAsync();

      foreach(var item in pedido.Itens)
      {
        await _context.Entry(item).Reference(i => i.Produto).LoadAsync();
      }
      return CreatedAtAction(nameof(GetPedido), new { id = pedido.Id }, new
      {
        pedido.Id,
        pedido.ClienteId,
        ClienteNome = pedido.Cliente?.Nome,
        pedido.Status,
        pedido.ValorTotal,
        pedido.Observacao,
        pedido.Fiado,
        pedido.CreatedAt,
        Itens = pedido.Itens.Select(i => new
        {
          i.Id,
          i.ProdutoId,
          ProdutoNome = i.Produto?.Nome,
          i.Quantidade,
          i.PrecoUnitario,
          Subtotal = i.Quantidade * i.PrecoUnitario
        })
      });
  }
  // PATCH: api/pedidos/{id}status


}
