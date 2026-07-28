import { useEffect, useState } from "react";
import { api } from "../services/api";
import AppLayout from "../layouts/AppLayout";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";

export default function Pdv() {
    const [pizzas, setPizzas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [pedido, setPedido] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState("");
    const [fiado, setFiado] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [pizzasRes, clientesRes] = await Promise.all([
                    api.get("/pizzas"),
                    api.get("/clientes").catch(() => ({ data: [] }))
                ]);
                setPizzas(pizzasRes.data);
                setClientes(clientesRes.data);
            } catch (err) {
                console.error("Erro ao carregar dados:", err);
            }
        };
        loadData();
    }, []);

    const addPizza = (pizza) => {
        const existing = pedido.find((p) => p.id === pizza.id);
        if (existing) {
            setPedido(pedido.map((p) =>
                p.id === pizza.id ? { ...p, qtd: p.qtd + 1 } : p
            ));
        } else {
            setPedido([...pedido, { ...pizza, qtd: 1 }]);
        }
    };

    const removePizza = (id) => {
        const existing = pedido.find((p) => p.id === id);
        if (existing && existing.qtd > 1) {
            setPedido(pedido.map((p) =>
                p.id === id ? { ...p, qtd: p.qtd - 1 } : p
            ));
        } else {
            setPedido(pedido.filter((p) => p.id !== id));
        }
    };

    const total = pedido.reduce((sum, p) => sum + p.preco * p.qtd, 0);

    const finalizarPedido = async () => {
        if (pedido.length === 0) return;
        if (fiado && !clienteSelecionado) {
            alert("Selecione um cliente para fiado");
            return;
        }

        try {
            for (const item of pedido) {
                await api.post("/pedidos", {
                    clienteId: parseInt(clienteSelecionado) || 1,
                    pizzaId: item.id,
                    valor: item.preco * item.qtd,
                    fiado: fiado
                });
            }
            alert("Pedido finalizado!");
            setPedido([]);
            setClienteSelecionado("");
            setFiado(false);
        } catch (err) {
            alert("Erro ao finalizar pedido");
        }
    };

    return (
        <AppLayout>
            <div style={{ display: "flex", height: "100%" }}>
                {/* COLUNA PIZZAS */}
                <div style={{ flex: 2, padding: 20, overflow: "auto" }}>
                    <h1 className="text-2xl font-bold mb-6">Cardápio</h1>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
                        {pizzas.map((pizza) => (
                            <button
                                key={pizza.id}
                                onClick={() => addPizza(pizza)}
                                style={{
                                    background: "#18181b",
                                    border: "1px solid #27272a",
                                    borderRadius: 12,
                                    padding: 16,
                                    cursor: "pointer",
                                    textAlign: "left",
                                    transition: "all 0.2s"
                                }}
                                onMouseEnter={(e) => e.target.style.borderColor = "#ef4444"}
                                onMouseLeave={(e) => e.target.style.borderColor = "#27272a"}
                            >
                                <div style={{ fontSize: 32, marginBottom: 8 }}>🍕</div>
                                <div style={{ fontWeight: 600, marginBottom: 4 }}>{pizza.nome}</div>
                                <div style={{ color: "#4ade80", fontWeight: "bold" }}>R$ {pizza.preco.toFixed(2)}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* COLUNA PEDIDO */}
                <div style={{
                    width: 350,
                    background: "#0f0f0f",
                    borderLeft: "1px solid #27272a",
                    padding: 20,
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <h2 className="text-xl font-bold mb-4" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <ShoppingCart size={20} />
                        Pedido
                    </h2>

                    {/* ITENS */}
                    <div style={{ flex: 1, overflow: "auto" }}>
                        {pedido.length === 0 ? (
                            <p style={{ color: "#666", textAlign: "center", padding: 20 }}>
                                Clique em uma pizza para adicionar
                            </p>
                        ) : (
                            pedido.map((item) => (
                                <div key={item.id} style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "12px 0",
                                    borderBottom: "1px solid #27272a"
                                }}>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>{item.nome}</div>
                                        <div style={{ color: "#a1a1aa", fontSize: 13 }}>
                                            R$ {item.preco.toFixed(2)} x {item.qtd}
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <button onClick={() => removePizza(item.id)} style={btnSmall}>
                                            <Minus size={14} />
                                        </button>
                                        <span style={{ width: 24, textAlign: "center" }}>{item.qtd}</span>
                                        <button onClick={() => addPizza(item)} style={btnSmall}>
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* TOTAL */}
                    <div style={{ borderTop: "2px solid #27272a", paddingTop: 16, marginTop: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                            <span style={{ fontSize: 18, fontWeight: 600 }}>Total</span>
                            <span style={{ fontSize: 24, fontWeight: "bold", color: "#4ade80" }}>
                                R$ {total.toFixed(2)}
                            </span>
                        </div>

                        {/* CLIENTE */}
                        <select
                            value={clienteSelecionado}
                            onChange={(e) => setClienteSelecionado(e.target.value)}
                            style={{
                                width: "100%",
                                padding: 12,
                                background: "#27272a",
                                border: "1px solid #3f3f46",
                                borderRadius: 8,
                                color: "white",
                                marginBottom: 12
                            }}
                        >
                            <option value="">Selecionar cliente</option>
                            {clientes.map((c) => (
                                <option key={c.id} value={c.id}>{c.nome}</option>
                            ))}
                        </select>

                        {/* FIADO */}
                        <label style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 16,
                            cursor: "pointer",
                            color: "#a1a1aa"
                        }}>
                            <input
                                type="checkbox"
                                checked={fiado}
                                onChange={(e) => setFiado(e.target.checked)}
                                style={{ width: 16, height: 16 }}
                            />
                            Fiado
                        </label>

                        {/* FINALIZAR */}
                        <button
                            onClick={finalizarPedido}
                            disabled={pedido.length === 0}
                            style={{
                                width: "100%",
                                padding: 14,
                                background: pedido.length === 0 ? "#27272a" : "#ef4444",
                                color: "white",
                                border: "none",
                                borderRadius: 8,
                                fontSize: 16,
                                fontWeight: 600,
                                cursor: pedido.length === 0 ? "not-allowed" : "pointer"
                            }}
                        >
                            Finalizar Pedido
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

const btnSmall = {
    width: 28,
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#27272a",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    color: "white"
};
