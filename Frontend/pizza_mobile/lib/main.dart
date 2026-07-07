import 'package:flutter/material.dart';
import 'pages/pdv_page.dart';

void main(){
  runApp(const PizzaErpApp());
}

class PizzaErpApp extends StatelessWidget {
  const PizzaErpApp({super.key});

  @override
  Widget build(BuildContext content){
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: PdvPage(),
    );
  }
}