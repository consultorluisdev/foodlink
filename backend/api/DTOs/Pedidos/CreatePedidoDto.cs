namespace api.DTOs.Pedidos;

public class CreatePedidoDto
{
    public int ClienteId { get; set; }
    public string? Observacao { get; set; }
    public bool Fiado { get; set; } = false;
    public List<CreateItemPedidoDto> Itens { get; set; } = new();
}