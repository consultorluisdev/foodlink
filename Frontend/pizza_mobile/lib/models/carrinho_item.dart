import 'pizza.dart';

class CarrinhoItem {
  final Pizza pizza;
  int quantidade;

  CarrinhoItem({
    required this.pizza,
    this.quantidade = 1,
  });

  double get subtotal => pizza.preco * quantidade;
}