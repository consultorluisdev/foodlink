namespace api.DTOs.Pedidos;

public class CreateItemPedidoDto
{
    public int ProdutoId { get; set; }
    public int Quantidade { get; set; } = 1;
}