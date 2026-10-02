using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Pedidos;
public class CreatePedidoDto
{
    [Range(1, int.MaxValue)]
    public int ClienteId { get; set; }
    public string? Observacao { get; set; }
    public bool Fiado { get; set; } = false;

    [MinLength(1)]
    public List<CreateItemPedidoDto> Itens { get; set; } = new();


}
