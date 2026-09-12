using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Entities;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ClientesController(AppDbContext context)
    {
        _context = context;
    }
    // Get: api/clientes(com busca por nome opicional)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes([FromQuery]string? busca)
    {
        var query = _context.Clientes.AsQueryable();

        if(!string.IsNullOrWhiteSpace(busca))
            query = query.Where(c => c.Nome.ToLower().Contains(busca.ToLower()));

        return Ok(await query.OrderBy(c => c.Nome).ToListAsync());
    }
    // Get: api/clientes/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Cliente>> GetCliente(int id)
    {
        var cliente = await _context.Clientes.FindAsync(id);

        if(cliente == null)
            return NotFound(new { message = "Cliente não encontrado" });

            return Ok(cliente);
    }
    // post: api/cliente
    [HttpPost]
    public async Task<ActionResult<Cliente>> CreateCliente([FromBody] Cliente cliente)
    {
        if(string.IsNullOrWhiteSpace(cliente.Nome))
            return BadRequest(new { message = "Nome é obrigatório" });

        cliente.CreatedAt = DateTime.UtcNow;
        cliente.UpdatedAt = DateTime.UtcNow;

        _context.Clientes.Add(cliente);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCliente), new {id = cliente.Id }, cliente);
    }
    // put: api/clientes{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatedAtCliente(int id, [FromBody] Cliente cliente)
    {
        if(id != cliente.Id)
            return BadRequest(new { message = "Id da URL não confere com o do corpo" });
        
        var existente = await _context.Clientes.FindAsync(id);
        if(existente == null)
            return NotFound(new { message = "Cliente não encontrado" });

        existente.Nome = cliente.Nome;
        existente.Email = cliente.Email;
        existente.Telefone = cliente.Telefone;
        existente.Ativo = cliente.Ativo;
        existente.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new { message = "cliente atualizado com sucesso" });
    }
    // delete: api/cliente/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCliente(int id)
    {
        var cliente = await _context.Clientes.FindAsync(id);
        if(cliente == null)
            return NotFound(new { message = "Cliente não encontrado "});
        
        _context.Clientes.Remove(cliente);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
