import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { LayoutDashboard, Package, Tag, ShoppingBag, Users, ArrowLeft, Sparkles } from 'lucide-react';
import { useContext } from 'react';
import { motion } from 'framer-motion';
import AuthContext from '../../context/AuthContext';

const links = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/products', icon: Package, label: 'Products' },
    { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
    { to: '/admin/coupons', icon: Tag, label: 'Coupons' },
    { to: '/admin/users', icon: Users, label: 'Users' },
];

const AdminLayout = () => {
    const { user } = useContext(AuthContext);
    if (!user?.isAdmin) return <Navigate to="/" />;

    return (
        <div className="flex min-h-screen bg-[#0a0a0a]">
            <aside className="w-64 bg-[#111] border-r border-white/5 flex flex-col">
                <div className="px-5 py-5 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-[#39ff14]" />
                        <span className="font-heading font-bold text-white text-lg">Admin Panel</span>
                    </div>
                </div>
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {links.map(link => (
                        <NavLink key={link.to} to={link.to} end={link.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                    ? 'bg-[#39ff14]/10 text-[#39ff14] border border-[#39ff14]/20 shadow-[0_0_15px_rgba(57,255,20,0.05)]'
                                    : 'text-white/40 hover:text-white hover:bg-white/5'}`
                            }>
                            <link.icon className="h-4 w-4" /> {link.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="p-3 border-t border-white/5">
                    <NavLink to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/30 hover:text-white hover:bg-white/5 transition-all">
                        <ArrowLeft className="h-4 w-4" /> Back to Store
                    </NavLink>
                </div>
            </aside>
            <main className="flex-1 overflow-auto"><div className="p-6 sm:p-8"><Outlet /></div></main>
        </div>
    );
};

export default AdminLayout;
