import 'package:flutter/material.dart';
import '../api/api_service.dart';
import '../models/carrinho_item.dart';
import '../models/pedido.dart';
import '../models/pizza.dart';

class PdvPage extends StatefulWidget {
  const PdvPage({super.key});

  @override
  State<PdvPage> createState() => _PdvPageState();
}

class _PdvPageState extends State<PdvPage> {
  List<Pizza> pizzas = [];
  List<CarrinhoItem> carrinho = [];

  @override
  void initState() {
    super.initState();
    carregarPizzas();
  }

  void carregarPizzas() async {
    pizzas = await ApiService.getPizzas();
    setState(() {});
  }

  void adicionarPizza(Pizza pizza) {
    final index = carrinho.indexWhere((i) => i.pizza.id == pizza.id);
    if (index >= 0) {
      carrinho[index].quantidade++;
    } else {
      carrinho.add(CarrinhoItem(pizza: pizza));
    }
    setState(() {});
  }

  void removerPizza(CarrinhoItem item) {
    setState(() => carrinho.remove(item));
  }

  void alterarQtd(CarrinhoItem item, int delta) {
    setState(() {
      item.quantidade += delta;
      if (item.quantidade <= 0) carrinho.remove(item);
    });
  }

  double get total => carrinho.fold(0, (sum, item) => sum + item.subtotal);

  void finalizarPedido(bool fiado) async {
    if (total <= 0) return;

    final pedido = Pedido(
      clienteId: 1, // fixo por enquanto
      valor: total,
      fiado: fiado,
    );

    await ApiService.criarPedido(pedido);
    carrinho.clear();
    setState(() {});

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("Pedido finalizado")),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("PDV - Pizzaria"),
        backgroundColor: Colors.red,
      ),
      body: Row(
        children: [
          // CATÁLOGO
          Expanded(
            flex: 2,
            child: GridView.count(
              padding: const EdgeInsets.all(12),
              crossAxisCount: 2,
              childAspectRatio: 1.6,
              children: pizzas
                  .map((p) => Card(
                        child: InkWell(
                          onTap: () => adicionarPizza(p),
                          child: Padding(
                            padding: const EdgeInsets.all(8),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const Icon(Icons.local_pizza, size: 40, color: Colors.red),
                                const SizedBox(height: 8),
                                Text(p.nome, style: const TextStyle(fontWeight: FontWeight.bold)),
                                Text("R\$ ${p.preco.toStringAsFixed(2)}"),
                              ],
                            ),
                          ),
                        ),
                      ))
                  .toList(),
            ),
          ),

          // CARRINHO
          Expanded(
            flex: 1,
            child: Container(
              padding: const EdgeInsets.all(16),
              color: Colors.grey[200],
              child: Column(
                children: [
                  const Text("Pedido Atual",
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  Expanded(
                    child: ListView(
                      children: carrinho
                          .map((item) => ListTile(
                                title: Text(item.pizza.nome),
                                subtitle: Text("R\$ ${item.subtotal.toStringAsFixed(2)}"),
                                trailing: Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    IconButton(
                                      icon: const Icon(Icons.remove),
                                      onPressed: () => alterarQtd(item, -1),
                                    ),
                                    Text(item.quantidade.toString()),
                                    IconButton(
                                      icon: const Icon(Icons.add),
                                      onPressed: () => alterarQtd(item, 1),
                                    ),
                                    IconButton(
                                      icon: const Icon(Icons.delete),
                                      onPressed: () => removerPizza(item),
                                    ),
                                  ],
                                ),
                              ))
                          .toList(),
                    ),
                  ),
                  const Divider(),
                  Text("Total: R\$ ${total.toStringAsFixed(2)}",
                      style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 12),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.green,
                      minimumSize: const Size.fromHeight(45),
                    ),
                    onPressed: () => finalizarPedido(false),
                    child: const Text("Pagar Agora"),
                  ),
                  const SizedBox(height: 8),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.red,
                      minimumSize: const Size.fromHeight(46),
                    ),
                    onPressed: () => finalizarPedido(true),
                    child: const Text("Fiado"),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
