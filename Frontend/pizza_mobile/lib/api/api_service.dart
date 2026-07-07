import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/pedido.dart';
import '../models/pizza.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:5108/api';

  static Future<List<Pizza>> getPizzas() async {
    final res = await http.get(Uri.parse("$baseUrl/pizzas"));
    final List list = jsonDecode(res.body);
    return list.map((e) => Pizza.fromJson(e)).toList();
  }

  static Future<void> criarPedido(Pedido pedido) async {
    await http.post(
      Uri.parse("$baseUrl/pedidos"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode(pedido.toJson()),
    );
  }
}
