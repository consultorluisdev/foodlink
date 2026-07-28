import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "../styles/dashboard.css";
import AppLayout from "../layouts/AppLayout";

export default function Dashboard() {
    const [tab, setTab] = useState("overview");
    const [time, setTime] = useState("");
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [data, setData] = useState({
        pedidosHoje: 0,
        faturamento: 0,
        clientes: 0
    });

    const [pizzas, setPizzas] = useState([]);
    const [pedidos, setPedidos] = useState([]);

    // LOGOUT
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // Carregar dados da API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pizzasRes, pedidosRes] = await Promise.all([
                    api.get("/pizzas"),
                    api.get("/pedidos").catch(() => ({ data: [] }))
                ]);
                setPizzas(pizzasRes.data);
                setPedidos(pedidosRes.data);
                setData({
                    pedidosHoje: pedidosRes.data.length,
                    faturamento: pedidosRes.data.reduce((sum, p) => sum + p.valor, 0),
                    clientes: 0
                });
            } catch (err) {
                console.log("Erro ao carregar dados:", err);
            }
        };
        fetchData();
    }, []);

    // relogio em tempo real
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AppLayout>
            <main id="main">
                {/* TOP BAR */}
                <header id="topbar">
                    <h1 className="text-xl font-bold">
                        {sidebarOpen ? "🍕 Pizza ERP" : "🍕"}
                    </h1>

                    <div className="tb-srch">
                        <input placeholder="Buscar produto..." />
                    </div>

                    <div className="tb-right">
                        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#aaa" }}>
                            <span className="dot-g"></span>Online
                        </span>
                        <span>{time}</span>
                        <button onClick={handleLogout} className="btn-logout">
                            Sair
                        </button>
                    </div>
                </header>

                {/* CONTENT */}
                <div id="content">
                    {/* TABS */}
                    <div className="dash-tabbar">
                        <button
                            className={`dash-tab ${tab === "overview" ? "active" : ""}`}
                            onClick={() => setTab("overview")}
                        >
                            Visão Geral
                        </button>
                        <button
                            className={`dash-tab ${tab === "tracking" ? "active" : ""}`}
                            onClick={() => setTab("tracking")}
                        >
                            Rastreamento
                        </button>
                        <button
                            className={`dash-tab ${tab === "orders" ? "active" : ""}`}
                            onClick={() => setTab("orders")}
                        >
                            Pedidos
                        </button>
                    </div>

                    {/* OVERVIEW */}
                    {tab === "overview" && (
                        <div style={{ padding: 20 }}>
                            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

                            {/* CARDS */}
                            <div className="sg">
                                <div className="sc">
                                    <div className="sl">Vendas Hoje</div>
                                    <div className="sv text-green-400">R$ {data.faturamento.toFixed(2)}</div>
                                </div>
                                <div className="sc">
                                    <div className="sl">Pedidos</div>
                                    <div className="sv text-blue-400">{data.pedidosHoje}</div>
                                </div>
                                <div className="sc">
                                    <div className="sl">Pizzas Cadastradas</div>
                                    <div className="sv text-purple-400">{pizzas.length}</div>
                                </div>
                            </div>

                            {/* ÚLTIMOS PEDIDOS */}
                            <div className="card" style={{ marginTop: 20 }}>
                                <h2 className="text-lg font-bold mb-3">Últimos Pedidos</h2>
                                {pedidos.length === 0 ? (
                                    <p style={{ color: "#666" }}>Nenhum pedido ainda</p>
                                ) : (
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                        {pedidos.slice(0, 5).map((pedido, i) => (
                                            <div key={i} className="pedido-item">
                                                <span>#{String(pedido.id).padStart(3, "0")}</span>
                                                <span>R$ {pedido.valor.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* PIZZAS POPULARES */}
                            <div className="card" style={{ marginTop: 20 }}>
                                <h2 className="text-lg font-bold mb-3">Cardápio</h2>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
                                    {pizzas.map((pizza) => (
                                        <div key={pizza.id} className="pizza-card">
                                            <div className="pizza-emoji">🍕</div>
                                            <div className="pizza-name">{pizza.nome}</div>
                                            <div className="pizza-price">R$ {pizza.preco.toFixed(2)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TRACKING */}
                    {tab === "tracking" && (
                        <div style={{ padding: 20 }}>
                            <h1 className="text-2xl font-bold mb-6">Rastreamento de Pedidos</h1>

                            <div className="card">
                                <p>🏍️ Lucas - Rua XV (~8 minutos)</p>
                                <p>🏍️ Rafael - Rua XV (~10 minutos)</p>
                            </div>
                        </div>
                    )}

                    {/* ORDERS */}
                    {tab === "orders" && (
                        <div style={{ padding: 20 }}>
                            <h1 className="text-2xl font-bold mb-6">Todos os Pedidos</h1>

                            <div className="card">
                                {pedidos.length === 0 ? (
                                    <p style={{ color: "#666" }}>Nenhum pedido registrado</p>
                                ) : (
                                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                        <thead>
                                            <tr style={{ borderBottom: "1px solid #333" }}>
                                                <th style={{ textAlign: "left", padding: "8px 0" }}>#</th>
                                                <th style={{ textAlign: "left", padding: "8px 0" }}>Cliente</th>
                                                <th style={{ textAlign: "left", padding: "8px 0" }}>Valor</th>
                                                <th style={{ textAlign: "left", padding: "8px 0" }}>Data</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pedidos.map((pedido) => (
                                                <tr key={pedido.id} style={{ borderBottom: "1px solid #222" }}>
                                                    <td style={{ padding: "8px 0" }}>#{String(pedido.id).padStart(3, "0")}</td>
                                                    <td style={{ padding: "8px 0" }}>Cliente {pedido.clienteId}</td>
                                                    <td style={{ padding: "8px 0" }}>R$ {pedido.valor.toFixed(2)}</td>
                                                    <td style={{ padding: "8px 0" }}>
                                                        {new Date(pedido.data).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </AppLayout>
    );
}
