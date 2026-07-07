class Pizza {
  final int id;
  final String nome;
  final double preco;

  Pizza({
    required this.id,
    required this.nome,
    required this.preco,
  });

  factory Pizza.fromJson(Map<String, dynamic> json){
    return Pizza(
      id: json['id'], 
      nome: json['nome'], 
      preco: (json['preco'] as num).toDouble(),
    );
  }
}