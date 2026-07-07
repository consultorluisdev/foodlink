using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzaErp.Api.Models;

namespace PizzaErp.Api.Data;

public class AppDbContext : DbContext
{
  public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
  public DbSet<Cliente> Clientes => Set<Cliente>();
  public DbSet<Pizza> Pizzas => Set<Pizza>();
  public DbSet<Pedido> Pedidos => Set<Pedido>();
  public DbSet<Pagamento> Pagamentos => Set<Pagamento>();
}
