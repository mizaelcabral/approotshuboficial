import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, UserRole, Page } from '../../types';

interface SidebarItemProps {
    icon: string;
    label: string;
    active?: boolean;
    onClick: () => void;
    hasSubmenu?: boolean;
    isExpanded?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active = false, onClick, hasSubmenu = false, isExpanded = false }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${active ? 'bg-primary text-background-dark shadow-lg shadow-primary/20' : 'text-text-subtle hover:bg-primary/10 hover:text-primary'}`}
    >
        <div className="flex items-center gap-3">
            <span className={`material-symbols-outlined transition-colors ${active ? 'text-background-dark font-bold' : 'text-gray-400 group-hover:text-primary'}`}>{icon}</span>
            <span className={`text-sm font-bold tracking-tight ${active ? 'text-background-dark' : 'text-text-main dark:text-gray-300'}`}>{label}</span>
        </div>
        {hasSubmenu && (
            <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} ${active ? 'text-background-dark' : 'text-gray-400'}`}>expand_more</span>
        )}
    </button>
);

interface SidebarInfoCardProps {
    icon: string;
    label: string;
    title: string;
    subtitle: string;
    variant?: 'default' | 'warning';
    actionLabel?: string;
    onClickAction?: () => void;
}

const SidebarInfoCard: React.FC<SidebarInfoCardProps> = ({ icon, label, title, subtitle, variant = 'default', actionLabel, onClickAction }) => (
    <div className={`p-4 rounded-2xl border ${variant === 'warning' ? 'bg-amber-50/50 border-amber-100 dark:bg-amber-500/5 dark:border-amber-500/20' : 'bg-gray-50/50 border-gray-100 dark:bg-white/5 dark:border-white/10'}`}>
        <div className="flex items-center gap-2 mb-3">
            <span className={`material-symbols-outlined text-sm font-bold ${variant === 'warning' ? 'text-amber-600' : 'text-primary'}`}>{icon}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-text-subtle">{label}</span>
        </div>
        <p className="text-sm font-black dark:text-white mb-1 leading-tight">{title}</p>
        <p className="text-[11px] font-bold text-text-subtle mb-3 leading-tight">{subtitle}</p>
        {actionLabel && (
            <button
                onClick={onClickAction}
                className={`w-full py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${variant === 'warning' ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 hover:border-primary hover:text-primary'}`}
            >
                {actionLabel}
            </button>
        )}
    </div>
);

interface SidebarItemData {
    id: string;
    icon: string;
    label: string;
    hasSubmenu?: boolean;
    isExpanded?: boolean;
    onClickSub?: () => void;
    submenu?: { id: string; label: string; count?: number }[];
    activeIds?: string[]; // IDs that should trigger the "active" state
}

interface DashboardLayoutProps {
    user: User;
    activePage: string;
    onPageChange: (page: any) => void;
    onLogout: () => void;
    sidebarItems: SidebarItemData[];
    infoCards?: SidebarInfoCardProps[];
    children: React.ReactNode;
    title: string;
    statusLabel?: string;
    statusDetail?: string;
    onTitleClick?: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    user,
    activePage,
    onPageChange,
    onLogout,
    sidebarItems,
    infoCards = [],
    children,
    title,
    statusLabel = 'Sistema Operacional',
    statusDetail = 'Conexão Segura',
    onTitleClick
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Dark Mode Sync
    const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const isActive = (item: SidebarItemData) => {
        if (item.id === activePage) return true;
        if (item.activeIds?.includes(activePage)) return true;
        if (item.submenu?.some(sub => sub.id === activePage)) return true;
        return false;
    };

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display transition-colors duration-200">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-72 flex-shrink-0 border-r border-gray-200 dark:border-white/10 bg-white dark:bg-dark-surface flex-col p-6 overflow-y-auto scrollbar-hide">
                <div className="flex flex-col gap-8 h-full">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/20 p-2 rounded-lg cursor-pointer" onClick={() => onTitleClick?.()}>
                                <span className="material-symbols-outlined text-primary text-2xl font-bold">
                                    {user.role === 'super_admin' ? 'shield_person' : user.role === 'doctor' ? 'medical_services' : 'eco'}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-lg font-bold uppercase tracking-wider">Rootcare</h1>
                                <p className="text-text-muted text-[10px] font-black uppercase tracking-widest leading-none">
                                    {user.role === 'patient' ? 'Portal do Paciente' : user.role.replace('_', ' ')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-1 overflow-y-auto scrollbar-hide flex-1 pr-2">
                        {sidebarItems.map((item) => (
                            <div key={item.id} className="flex flex-col gap-1">
                                <SidebarItem
                                    icon={item.icon}
                                    label={item.label}
                                    active={isActive(item)}
                                    onClick={() => item.hasSubmenu ? item.onClickSub?.() : onPageChange(item.id)}
                                    hasSubmenu={item.hasSubmenu}
                                    isExpanded={item.isExpanded}
                                />
                                <AnimatePresence>
                                    {item.hasSubmenu && item.isExpanded && item.submenu && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pl-4 flex flex-col gap-1 overflow-hidden">
                                            {item.submenu.map(sub => (
                                                <button
                                                    key={sub.id}
                                                    onClick={() => onPageChange(sub.id)}
                                                    className={`text-left py-2 px-4 text-xs font-bold transition-colors ${activePage === sub.id ? 'text-primary' : 'text-text-subtle hover:text-primary'}`}
                                                >
                                                    {sub.label} {sub.count !== undefined && `(${sub.count})`}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}

                        {infoCards.length > 0 && (
                            <div className="flex flex-col gap-4 pt-4 mt-2">
                                {infoCards.map((card, idx) => (
                                    <SidebarInfoCard key={idx} {...card} />
                                ))}
                            </div>
                        )}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/10 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-xs overflow-hidden border-2 border-transparent">
                            {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate leading-tight">{user.name}</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">{user.role}</p>
                        </div>
                        <button onClick={onLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                            <span className="material-symbols-outlined text-sm">logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden bg-[#fdfdfd] dark:bg-background-dark custom-scrollbar">
                {/* Header */}
                <header className="bg-white dark:bg-dark-surface border-b border-gray-100 dark:border-white/10 px-8 py-4 sticky top-0 z-10 transition-colors">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-3 lg:hidden">
                            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-gray-400 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                            <h1 className="text-sm font-bold uppercase tracking-wider">Rootcare</h1>
                        </div>
                        <h2 className="text-xl font-bold uppercase tracking-wide truncate">{title}</h2>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-[10px] font-bold text-primary uppercase leading-none">{statusLabel}</span>
                                <span className="text-xs font-bold text-green-600 leading-none mt-1">{statusDetail}</span>
                            </div>
                            <button className="size-10 rounded-xl bg-background-light dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined text-xl">notifications</span>
                            </button>
                            <button onClick={onLogout} className="lg:hidden text-gray-400 hover:text-red-500 transition-colors">
                                <span className="material-symbols-outlined text-2xl">logout</span>
                            </button>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-32 lg:pb-8">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>

            {/* Mobile Bottom Navigation (Simplified) */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-surface border-t border-gray-100 dark:border-white/10 px-6 py-3 z-40 flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                {sidebarItems.slice(0, 4).map((item) => (
                    <button key={item.id} onClick={() => onPageChange(item.id)} className={`flex flex-col items-center gap-1 ${isActive(item) ? 'text-primary' : 'text-gray-400'}`}>
                        <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                        <span className="text-[10px] font-bold">{item.label}</span>
                    </button>
                ))}
                <button onClick={onLogout} className="flex flex-col items-center gap-1 text-gray-400">
                    <span className="material-symbols-outlined text-2xl">logout</span>
                    <span className="text-[10px] font-bold">Sair</span>
                </button>
            </nav>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #30e86e33; border-radius: 10px; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default DashboardLayout;
