namespace api.Entities;

public class ItemPedido
{
    public int Id { get; set; }
    public int PedidoId { get; set; }
    public int ProdutoId { get; set; }
    public int Quantidade { get; set; }
    public decimal PrecoUnitario { get; set; }

    public virtual Pedido? Pedido { get; set; }
    public virtual Product? Produto { get; set; }
}
