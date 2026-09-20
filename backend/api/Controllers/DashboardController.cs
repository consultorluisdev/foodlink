using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public DashboardController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var hoje = DateTime.UtcNow.Date;

        var pedidosHoje = await _context.Pedidos
            .CountAsync(p => p.CreatedAt >= hoje);

        var faturamento = await _context.Pedidos
            .Where(p => p.CreatedAt >= hoje && p.Status != "Cancelado")
            .SumAsync(p => p.ValorTotal);

        var clientes = await _context.Clientes.CountAsync();

        return Ok(new
        {
            pedidosHoje,
            faturamento,
            clientes
        });
    }
}