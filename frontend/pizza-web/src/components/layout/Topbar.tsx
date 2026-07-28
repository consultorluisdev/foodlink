import { useState } from 'react';
import { Bell, Search, User, Moon, Sun, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,   
} from '@/components/ui/dropdown-menu';
import { Badge } from 'lucide-react';
import {useTheme } from '@/hooks/useTheme';
import { useAuth} from '@/hooks/useAuth';

export function TopBar() {
    const [searc, setSearch] = useState('');
    const { theme, toogleTheme } = useTheme();
    const { user } = useAuth();


    return(
        <header className='border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div className='flex h-16 items-center gap-4 px-4'>
                <div className='flex flex-1 items-center gap-4'>
                    <div className='relative flex-1 max-w-md'>
                        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                        <Input 
                        placeholder="Buscar..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                        />
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <Button variant="ghost" size="icon" onClick{toggleTheme}>
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </Button>

                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell size={20} />
                            <Badge className='absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs'>
                                3
                            </Badge>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuTrigger>
                        <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className='max-h-80 overflow-auto'>
                            <div className='px-4 py-3 hover:bg-accent rounded-lg cursor-pointer'>
                                <p className='text-sm font-medium'>Novo pedido #1234</p>
                                <p className='text-sm text-muted-foreground'>Há 2 minutos</p>
                            </div>
                            <div className='px-4 py-3 hover:bg-accent rounded-lg cursor-pointer'>
                                <p className='text-sm font-medium'>Estoque baixo: Pizza</p>
                                <p className='text-xs text-muted-foreground'>Há 15 minutos</p>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    </DropdownMenu>

                    <div className='flex items-center gap-2 border-l border-border pl-2'>
                        <Building2 size={16} className='text-muted-foreground' />
                        <span className='text-sm font-medium'>Foodlink</span>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <User size={20} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent aling="end">
                            <DropdownMenuLabel>{user?.name || 'Usuario'}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Perfil</DropdownMenuItem>
                            <DropdownMenuItem>Configurações</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">Sair</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}