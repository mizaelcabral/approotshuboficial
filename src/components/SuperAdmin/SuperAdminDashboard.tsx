import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SuperAdminPage, Institution } from '../../types';

interface SuperAdminDashboardProps {
    onPageChange: (page: SuperAdminPage) => void;
    onLogout: () => void;
}

// --- Shared Design Components ---
const SidebarItem = ({ icon, label, active = false, onClick }: { icon: string, label: string, active?: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${active ? 'bg-primary text-background-dark shadow-lg shadow-primary/20' : 'text-text-subtle hover:bg-primary/10 hover:text-primary'}`}
    >
        <div className="flex items-center gap-3">
            <span className={`material-symbols-outlined transition-colors ${active ? 'text-background-dark font-bold' : 'text-gray-400 group-hover:text-primary'}`}>{icon}</span>
            <span className={`text-sm font-bold tracking-tight ${active ? 'text-background-dark' : 'text-text-main dark:text-gray-300'}`}>{label}</span>
        </div>
    </button>
);

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ onPageChange, onLogout }) => {
    const [activePage, setActivePage] = useState<SuperAdminPage>('sa_dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handlePageChange = (page: SuperAdminPage) => {
        setActivePage(page);
        onPageChange(page);
        setIsMobileMenuOpen(false);
    };

    // Dark Mode Sync
    const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    // Mock data for institutions
    const institutions: Institution[] = [
        { id: '1', name: 'Clínica Bem Estar', location: 'São Paulo, SP', city: 'São Paulo', state: 'SP', patients: 842, revenue: 42500, status: 'active', icon: 'local_hospital' },
        { id: '2', name: 'Instituto Vida Verde', location: 'Curitiba, PR', city: 'Curitiba', state: 'PR', patients: 312, revenue: 18220, status: 'active', icon: 'health_and_safety' },
        { id: '3', name: 'Assoc. Flor da Cura', location: 'Salvador, BA', city: 'Salvador', state: 'BA', patients: 1024, revenue: 58120, status: 'active', icon: 'home_health' },
        { id: '4', name: 'Centro MedCannabis', location: 'Rio de Janeiro, RJ', city: 'Rio de Janeiro', state: 'RJ', patients: 154, revenue: 4400, status: 'pending', icon: 'medical_services' },
    ];

    const stats = [
        { label: 'Instituições', value: '12', icon: 'domain', color: 'blue' },
        { label: 'Pacientes Ativos', value: '2.4k', icon: 'group', color: 'primary' },
        { label: 'Faturamento Mensal', value: 'R$ 124k', icon: 'payments', color: 'purple' },
        { label: 'Uptime Sistema', value: '99.9%', icon: 'bolt', color: 'amber' },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display transition-colors duration-200">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-72 flex-shrink-0 border-r border-gray-200 dark:border-white/10 bg-white dark:bg-dark-surface flex-col p-6 overflow-y-auto scrollbar-hide">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-3 px-2">
                        <div className="bg-red-500/20 p-2 rounded-lg">
                            <span className="material-symbols-outlined text-red-500 text-2xl font-bold">shield_person</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold uppercase tracking-wider">Rootcare</h1>
                            <p className="text-text-muted text-xs font-medium uppercase tracking-widest leading-none">Super Admin</p>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-1">
                        <SidebarItem icon="analytics" label="Dashboard" active={activePage === 'sa_dashboard'} onClick={() => handlePageChange('sa_dashboard')} />
                        <SidebarItem icon="domain" label="Instituições" active={activePage === 'sa_institutions'} onClick={() => handlePageChange('sa_institutions')} />
                        <SidebarItem icon="group" label="Pacientes" active={activePage === 'sa_patients'} onClick={() => handlePageChange('sa_patients')} />
                        <SidebarItem icon="badge" label="Representantes" active={activePage === 'sa_representatives'} onClick={() => handlePageChange('sa_representatives')} />
                        <SidebarItem icon="payments" label="Financeiro" active={activePage === 'sa_financial'} onClick={() => handlePageChange('sa_financial')} />
                        <SidebarItem icon="storefront" label="Farmácia" active={activePage === 'sa_pharmacy'} onClick={() => handlePageChange('sa_pharmacy')} />
                        <SidebarItem icon="settings" label="Configurações" active={activePage === 'sa_settings'} onClick={() => handlePageChange('sa_settings')} />
                    </nav>

                    <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-xs text-red-500 font-bold">priority_high</span>
                            <span className="text-[10px] font-black uppercase text-red-500 tracking-widest">Alerta crítico</span>
                        </div>
                        <p className="text-xs font-bold leading-relaxed text-red-700/80 dark:text-red-400/80">O servidor de backup não realizou a sincronização nas últimas 2h.</p>
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-xs">SA</div>
                    <div className="flex flex-col">
                        <p className="text-sm font-bold">Administrador Root</p>
                        <p className="text-xs text-gray-500">Controle Mestre</p>
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
                        <h2 className="text-xl font-bold uppercase tracking-wide truncate">Painel de Controle Nacional</h2>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-[10px] font-bold text-red-500 uppercase leading-none">Status: Blindado</span>
                                <span className="text-xs font-bold text-green-600 leading-none mt-1">Conexão Criptografada</span>
                            </div>
                            <button className="size-10 rounded-xl bg-background-light dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined text-xl">notifications</span>
                            </button>
                            <button onClick={onLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                                <span className="material-symbols-outlined text-2xl">logout</span>
                            </button>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 lg:pb-8">
                    <div className="max-w-6xl mx-auto space-y-8">
                        <AnimatePresence mode="wait">
                            <motion.div key={activePage} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                                {activePage === 'sa_dashboard' && (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {stats.map((stat, i) => (
                                                <div key={i} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-6 rounded-2xl shadow-sm">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`p-3 rounded-xl ${stat.color === 'primary' ? 'bg-primary/10 text-primary' : `bg-${stat.color}-500/10 text-${stat.color}-500`}`}>
                                                            <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-text-subtle uppercase tracking-wider">{stat.label}</p>
                                                            <p className="text-2xl font-black">{stat.value}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
                                            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
                                                <h3 className="text-lg font-bold">Instituições em Destaque</h3>
                                                <button onClick={() => handlePageChange('sa_institutions')} className="text-sm font-bold text-primary hover:underline">Ver Todas</button>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left">
                                                    <thead className="bg-[#f8f9fa] dark:bg-white/5 text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-gray-100 dark:border-white/10">
                                                        <tr>
                                                            <th className="px-6 py-4">Nome</th>
                                                            <th className="px-6 py-4">Pacientes</th>
                                                            <th className="px-6 py-4">Status</th>
                                                            <th className="px-6 py-4 text-right">Renda Estimada</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                                                        {institutions.map((inst) => (
                                                            <tr key={inst.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center">
                                                                            <span className="material-symbols-outlined text-sm">{inst.icon}</span>
                                                                        </div>
                                                                        <div className="text-sm font-bold">{inst.name}</div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 text-sm font-medium">{inst.patients}</td>
                                                                <td className="px-6 py-4">
                                                                    <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${inst.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                                                        {inst.status === 'active' ? 'Ativo' : 'Pendente'}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4 text-right text-sm font-black">R$ {inst.revenue.toLocaleString()}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activePage !== 'sa_dashboard' && (
                                    <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-20 rounded-2xl text-center">
                                        <span className="material-symbols-outlined text-6xl text-primary/20 mb-4 italic">shield</span>
                                        <h3 className="text-xl font-black">Módulo de Segurança Máxima</h3>
                                        <p className="text-text-subtle mt-2">Este acesso é restritivo e os logs de atividade estão sendo monitorados.</p>
                                        <button onClick={() => setActivePage('sa_dashboard')} className="mt-6 px-6 py-3 bg-primary text-background-dark rounded-xl font-black text-sm uppercase">Voltar ao Painel</button>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-surface border-t border-gray-100 dark:border-white/10 px-6 py-3 z-50 flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                {[
                    { page: 'sa_dashboard', icon: 'grid_view', label: 'Monitor' },
                    { page: 'sa_institutions', icon: 'domain', label: 'Clínicas' },
                    { page: 'sa_patients', icon: 'group', label: 'Pacientes' },
                    { page: 'sa_financial', icon: 'payments', label: 'Financeiro' }
                ].map((item) => (
                    <button key={item.page} onClick={() => handlePageChange(item.page as SuperAdminPage)} className={`flex flex-col items-center gap-1 ${activePage === item.page ? 'text-primary' : 'text-gray-400'}`}>
                        <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                        <span className="text-[10px] font-bold">{item.label}</span>
                    </button>
                ))}
                <button onClick={onLogout} className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-500">
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

export default SuperAdminDashboard;
