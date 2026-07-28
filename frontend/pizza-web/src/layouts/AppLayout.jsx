import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, ClipboardList, Pizza, LogOut } from 'lucide-react';

const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/pdv", label: "PDV", icon: ShoppingCart },
    { path: "/pedidos", label: "Pedidos", icon: ClipboardList },
    { path: "/produtos", label: "Produtos", icon: Pizza },
];

export default function AppLayout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* SIDEBAR */}
            <aside style={{
                width: 240,
                background: "#0f0f0f",
                padding: "20px 0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRight: "1px solid #27272a"
            }}>
                <div>
                    {/* LOGO */}
                    <div style={{
                        padding: "0 20px 20px",
                        borderBottom: "1px solid #27272a"
                    }}>
                        <h2 style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            gap: 8
                        }}>
                            🍕 <span style={{ color: "#ef4444" }}>Pizza</span>ERP
                        </h2>
                    </div>

                    {/* MENU */}
                    <nav style={{ marginTop: 20, padding: "0 10px" }}>
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 12,
                                        width: "100%",
                                        padding: "12px 16px",
                                        marginBottom: 4,
                                        background: isActive ? "#27272a" : "transparent",
                                        color: isActive ? "#ef4444" : "#a1a1aa",
                                        border: "none",
                                        borderRadius: 8,
                                        cursor: "pointer",
                                        fontSize: 14,
                                        fontWeight: isActive ? 600 : 400,
                                        transition: "all 0.2s",
                                        textAlign: "left"
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) e.target.style.background = "#18181b";
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) e.target.style.background = "transparent";
                                    }}
                                >
                                    <Icon size={18} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* LOGOUT */}
                <div style={{ padding: "0 10px" }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            width: "100%",
                            padding: "12px 16px",
                            background: "transparent",
                            color: "#ef4444",
                            border: "1px solid #27272a",
                            borderRadius: 8,
                            cursor: "pointer",
                            fontSize: 14,
                            transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = "#ef4444";
                            e.target.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = "transparent";
                            e.target.style.color = "#ef4444";
                        }}
                    >
                        <LogOut size={18} />
                        Sair
                    </button>
                </div>
            </aside>

            {/* CONTEUDO */}
            <main style={{ flex: 1, overflow: "auto" }}>
                {children}
            </main>
        </div>
    );
}
