namespace api.Entities;

public class Pedido
{
    public int Id { get; set; }
    public int ClienteId { get; set; }
    public string Status { get; set; } = "Pendente";
    public decimal ValorTotal { get; set; }
    public string? Observacao { get; set; } = "Pendente";
    public bool Fiado { get; set; } = false;
    public DateTime CreatedAt { get; set; }

    public virtual Cliente? Cliente { get; set; }
    public virtual ICollection<ItemPedido> Itens { get; set; } = new List<ItemPedido>();
}
