import { useEffect, useState } from "react";
import { api } from "../services/api";
import AppLayout from "../layouts/AppLayout";

const statusColors = {
    "pendente": "#f59e0b",
    "preparando": "#3b82f6",
    "saiu": "#8b5cf6",
    "entregue": "#22c55e"
};

export default function Pedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPedidos = async () => {
            try {
                const res = await api.get("/pedidos");
                setPedidos(res.data);
            } catch (err) {
                console.error("Erro ao carregar pedidos:", err);
            } finally {
                setLoading(false);
            }
        };
        loadPedidos();
    }, []);

    return (
        <AppLayout>
            <div style={{ padding: 20 }}>
                <h1 className="text-2xl font-bold mb-6">Pedidos</h1>

                {loading ? (
                    <p style={{ color: "#666" }}>Carregando...</p>
                ) : pedidos.length === 0 ? (
                    <div className="card" style={{ padding: 40, textAlign: "center" }}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
                        <p style={{ color: "#666", fontSize: 16 }}>Nenhum pedido registrado</p>
                    </div>
                ) : (
                    <div className="card">
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ borderBottom: "2px solid #27272a" }}>
                                    <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 12 }}>PEDIDO</th>
                                    <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 12 }}>CLIENTE</th>
                                    <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 12 }}>PIZZA</th>
                                    <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 12 }}>VALOR</th>
                                    <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 12 }}>DATA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidos.map((pedido) => (
                                    <tr key={pedido.id} style={{ borderBottom: "1px solid #27272a" }}>
                                        <td style={{ padding: "12px 8px", fontWeight: 600 }}>
                                            #{String(pedido.id).padStart(3, "0")}
                                        </td>
                                        <td style={{ padding: "12px 8px" }}>
                                            Cliente #{pedido.clienteId}
                                        </td>
                                        <td style={{ padding: "12px 8px" }}>
                                            Pizza #{pedido.pizzaId}
                                        </td>
                                        <td style={{ padding: "12px 8px", color: "#4ade80", fontWeight: 600 }}>
                                            R$ {pedido.valor.toFixed(2)}
                                        </td>
                                        <td style={{ padding: "12px 8px", color: "#a1a1aa" }}>
                                            {new Date(pedido.data).toLocaleDateString("pt-BR")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
