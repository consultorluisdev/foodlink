import {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
 LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Tag, 
  Users, 
  CashRegister,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Store   
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/hooks/useAuth';

interface NavItem {
    ico: React.ReactNode;
    label: string;
    path: string;
}

const navItems: NavItem[] = [
    {icon: <LayoutDashboard size={20} />, label: 'dashboard', path: '/' },
    {icon: <Store size={20} />, label: 'PDV', path: '/pos' },
    {icon: <ShoppingBag size={20} />, label: 'Pedidos', path: 'orders' },
    {icon: <Package size={20} />, label: 'Produtos', path: '/products' },
    {icon: <Tag size={20} />, label: 'Categorias', path: '/categories' },
    {icon: <Users size={20} />, label: 'Clientes', path: '/clients' },
    {icon: <CashRegister size={20} />, label: 'Caixa', path: '/cashier' },
    {icon: <Settings size={20} />, label: 'Configurações', path: '/settings' },
];

export function Siderbar() {
    const [collapsed, setCollapsed] = useState(false)
    const location = useLocation();
    const { logout } = useAuth();

    return(
        <aside className={cn(
            'border-r border-border bg-background transition-all duration-300', collapsed ? 'w-16' : 'w-64'
        )}>
            <div className='flex h-16 items-center justify-between border-b border-border px-4'>
                {!collapsed && (
                    <span className='text-xl font-bold text-primary'>FoodLink</span>
                )}
                <Button 
                variant="ghost"
                size="icon
                onClick={() => setCollapsed(!collapsed)}"
                >
                    {collapsed ? <Menu size={20} /> : <X size={20} />}
                </Button>
            </div>

            <ScrollArea
            className="h-[calc(100vh-4rem)]">
                <nav className='space-y-1 p-2'>
                    {navItems.map((item) => (
                        <Link
                        key={item.path}
                        to={item.path}
                        className={(cn
                            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-accent hover:text-accent hover:text-accent-foreground',
                            location.pathname === item.path && 'bg-accent text-accent-foreground',
                            collapsed && 'justify-center px-2'
                        )}
                        >
                        {item.icon}
                        {!collapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                    <div className='border-t border-border my-4 pt-2'>
                        <Link
                        to="/profile"
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-accent hover:text-accent-foreground',
                            collapsed && 'justify-center px-2'
                        )}>
                            <User size={20} />
                            {!collapsed && <span>Perfil</span>}
                        </Link>
                        <button
                        onClick={logout}
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 transition-all hover:bg-red-50 dark:hover:bg-red-950',
                            collapsed && 'justify-center px-2'
                        )}
                        >
                            <LogOut size={20} />
                            {!collapsed && <span>Sair</span>}
                        </button>
                    </div>
                </nav>
            </ScrollArea>
        </aside>
    );
}