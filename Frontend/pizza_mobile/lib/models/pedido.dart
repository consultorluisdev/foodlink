class Pedido {
  final int clienteId;
  final double valor;
  final bool fiado;

  Pedido({
    required this.clienteId,
    required this.valor,
    required this.fiado,
  });
  Map<String, dynamic> toJson() => {
        "clienteId": clienteId,
        "valor": valor,
        "fiado": fiado,
      };
}
