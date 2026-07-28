import { useEffect, useState } from "react";
import { api } from "../services/api";
import AppLayout from "../layouts/AppLayout";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function Produtos() {
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPizza, setEditingPizza] = useState(null);
    const [formData, setFormData] = useState({ nome: "", preco: "" });

    const loadPizzas = async () => {
        try {
            const res = await api.get("/pizzas");
            setPizzas(res.data);
        } catch (err) {
            console.error("Erro ao carregar pizzas:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPizzas();
    }, []);

    const handleSubmit = async () => {
        if (!formData.nome || !formData.preco) return;

        try {
            if (editingPizza) {
                await api.put(`/pizzas/${editingPizza.id}`, {
                    nome: formData.nome,
                    preco: parseFloat(formData.preco)
                });
            } else {
                await api.post("/pizzas", {
                    nome: formData.nome,
                    preco: parseFloat(formData.preco)
                });
            }
            setShowModal(false);
            setEditingPizza(null);
            setFormData({ nome: "", preco: "" });
            loadPizzas();
        } catch (err) {
            alert("Erro ao salvar pizza");
        }
    };

    const handleEdit = (pizza) => {
        setEditingPizza(pizza);
        setFormData({ nome: pizza.nome, preco: pizza.preco.toString() });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!confirm("Tem certeza que deseja excluir?")) return;
        try {
            await api.delete(`/pizzas/${id}`);
            loadPizzas();
        } catch (err) {
            alert("Erro ao excluir pizza");
        }
    };

    return (
        <AppLayout>
            <div style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h1 className="text-2xl font-bold">Produtos</h1>
                    <button
                        onClick={() => { setEditingPizza(null); setFormData({ nome: "", preco: "" }); setShowModal(true); }}
                        className="btn-primary"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "10px 16px",
                            background: "#ef4444",
                            color: "white",
                            border: "none",
                            borderRadius: 8,
                            cursor: "pointer",
                            fontSize: 14,
                            fontWeight: 600
                        }}
                    >
                        <Plus size={18} />
                        Nova Pizza
                    </button>
                </div>

                {loading ? (
                    <p style={{ color: "#666" }}>Carregando...</p>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                        {pizzas.map((pizza) => (
                            <div key={pizza.id} className="card" style={{ padding: 16 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <div>
                                        <div style={{ fontSize: 32, marginBottom: 8 }}>🍕</div>
                                        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{pizza.nome}</h3>
                                        <p style={{ fontSize: 24, fontWeight: "bold", color: "#4ade80" }}>
                                            R$ {pizza.preco.toFixed(2)}
                                        </p>
                                    </div>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <button
                                            onClick={() => handleEdit(pizza)}
                                            style={{
                                                padding: 8,
                                                background: "#27272a",
                                                border: "none",
                                                borderRadius: 6,
                                                cursor: "pointer",
                                                color: "#a1a1aa"
                                            }}
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(pizza.id)}
                                            style={{
                                                padding: 8,
                                                background: "#27272a",
                                                border: "none",
                                                borderRadius: 6,
                                                cursor: "pointer",
                                                color: "#ef4444"
                                            }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* MODAL */}
            {showModal && (
                <div style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000
                }}>
                    <div style={{
                        background: "#18181b",
                        padding: 24,
                        borderRadius: 12,
                        width: "100%",
                        maxWidth: 400,
                        border: "1px solid #27272a"
                    }}>
                        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
                            {editingPizza ? "Editar Pizza" : "Nova Pizza"}
                        </h2>
                        <input
                            placeholder="Nome da pizza"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            style={{
                                width: "100%",
                                padding: "12px",
                                marginBottom: 12,
                                background: "#27272a",
                                border: "1px solid #3f3f46",
                                borderRadius: 8,
                                color: "white",
                                fontSize: 14
                            }}
                        />
                        <input
                            placeholder="Preço"
                            type="number"
                            step="0.01"
                            value={formData.preco}
                            onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                            style={{
                                width: "100%",
                                padding: "12px",
                                marginBottom: 16,
                                background: "#27272a",
                                border: "1px solid #3f3f46",
                                borderRadius: 8,
                                color: "white",
                                fontSize: 14
                            }}
                        />
                        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    padding: "10px 20px",
                                    background: "#27272a",
                                    color: "#a1a1aa",
                                    border: "none",
                                    borderRadius: 8,
                                    cursor: "pointer"
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSubmit}
                                style={{
                                    padding: "10px 20px",
                                    background: "#ef4444",
                                    color: "white",
                                    border: "none",
                                    borderRadius: 8,
                                    cursor: "pointer",
                                    fontWeight: 600
                                }}
                            >
                                {editingPizza ? "Salvar" : "Adicionar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
