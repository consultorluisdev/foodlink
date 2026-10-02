using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Pedidos;

public class CreateItemPedidoDto
{
    [Range(1, int.MaxValue)]
    public int ProdutoId { get; set; }

    [Range(1, int.MaxValue)]
    public int Quantidade { get; set; }
}
