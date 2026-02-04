import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InstitutionPage, Patient } from '../../types';

interface InstitutionDashboardProps {
    onPageChange: (page: InstitutionPage) => void;
    onLogout: () => void;
}

// --- Shared Design Components ---
const SidebarItem = ({ icon, label, active = false, onClick, hasSubmenu = false, isExpanded = false }: { icon: string, label: string, active?: boolean, onClick: () => void, hasSubmenu?: boolean, isExpanded?: boolean }) => (
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

const SidebarInfoCard = ({ icon, label, title, subtitle, variant = 'default', actionLabel }: { icon: string, label: string, title: string, subtitle: string, variant?: 'default' | 'warning', actionLabel?: string }) => (
    <div className={`p-4 rounded-2xl border ${variant === 'warning' ? 'bg-amber-50/50 border-amber-100 dark:bg-amber-500/5 dark:border-amber-500/20' : 'bg-gray-50/50 border-gray-100 dark:bg-white/5 dark:border-white/10'}`}>
        <div className="flex items-center gap-2 mb-3">
            <span className={`material-symbols-outlined text-sm font-bold ${variant === 'warning' ? 'text-amber-600' : 'text-primary'}`}>{icon}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-text-subtle">{label}</span>
        </div>
        <p className="text-sm font-black dark:text-white mb-1">{title}</p>
        <p className="text-[11px] font-bold text-text-subtle mb-3">{subtitle}</p>
        {actionLabel && (
            <button className={`w-full py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${variant === 'warning' ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 hover:border-primary hover:text-primary'}`}>
                {actionLabel}
            </button>
        )}
    </div>
);

const InstitutionDashboard: React.FC<InstitutionDashboardProps> = ({ onPageChange, onLogout }) => {
    const [activePage, setActivePage] = useState<InstitutionPage>('inst_dashboard');
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handlePageChange = (page: InstitutionPage) => {
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

    // Mock data
    const patients: Patient[] = [
        { id: '1', name: 'João Silva', email: 'joao@email.com', phone: '(11) 98765-4321', institutionId: '1', institutionName: 'Clínica Bem Estar', doctorName: 'Dr. Carlos', status: 'active', treatmentProgress: 65, financialStatus: 'regular', registrationDate: '2024-01-15' },
        { id: '2', name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 98765-4322', institutionId: '1', institutionName: 'Clínica Bem Estar', doctorName: 'Dra. Ana', status: 'active', treatmentProgress: 80, financialStatus: 'regular', registrationDate: '2024-01-20' },
        { id: '3', name: 'Pedro Costa', email: 'pedro@email.com', phone: '(11) 98765-4323', institutionId: '1', institutionName: 'Clínica Bem Estar', status: 'pending', treatmentProgress: 0, financialStatus: 'pending', registrationDate: '2024-02-01' },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display transition-colors duration-200">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-72 flex-shrink-0 border-r border-gray-200 dark:border-white/10 bg-white dark:bg-dark-surface flex-col p-6 overflow-y-auto scrollbar-hide">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-3 px-2">
                        <div className="bg-primary/20 p-2 rounded-lg">
                            <span className="material-symbols-outlined text-primary text-2xl font-bold">domain</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold uppercase tracking-wider">Rootcare</h1>
                            <p className="text-text-muted text-xs font-medium uppercase tracking-widest">Instituição</p>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-1">
                        <SidebarItem icon="grid_view" label="Dashboard" active={activePage === 'inst_dashboard'} onClick={() => handlePageChange('inst_dashboard')} />
                        <SidebarItem icon="group" label="Pacientes" active={activePage === 'inst_patients'} onClick={() => handlePageChange('inst_patients')} />
                        <SidebarItem icon="medical_services" label="Corpo Clínico" active={activePage === 'inst_doctors'} onClick={() => handlePageChange('inst_doctors')} />
                        <SidebarItem icon="analytics" label="Métricas" active={activePage === 'inst_reports'} onClick={() => handlePageChange('inst_reports')} />
                        <SidebarItem icon="business" label="Perfil da Clínica" active={activePage === 'inst_profile'} onClick={() => handlePageChange('inst_profile')} />
                    </nav>

                    <div className="flex flex-col gap-4 pt-4">
                        <button onClick={() => setShowRegisterModal(true)} className="w-full flex items-center justify-center gap-2 p-4 bg-primary text-background-dark rounded-xl font-black text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined">person_add</span>
                            Novo Paciente
                        </button>
                        <SidebarInfoCard icon="trending_up" label="Desempenho" title="Receita Mensal" subtitle="R$ 42.500 (+12%)" actionLabel="Ver Detalhes" />
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/10 flex items-center gap-3 cursor-pointer group" onClick={() => handlePageChange('inst_profile')}>
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-black text-xs border-2 border-transparent group-hover:border-primary transition-all">CB</div>
                    <div className="flex flex-col">
                        <p className="text-sm font-bold group-hover:text-primary transition-colors">Clínica Bem Estar</p>
                        <p className="text-xs text-gray-500">Unidade: São Paulo</p>
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
                        <h2 className="text-xl font-bold uppercase tracking-wide truncate">
                            {activePage === 'inst_dashboard' ? 'Painel da Instituição' :
                                activePage === 'inst_patients' ? 'Gestão de Pacientes' :
                                    activePage === 'inst_doctors' ? 'Corpo Clínico' :
                                        activePage === 'inst_reports' ? 'Relatórios Institucionais' : 'Perfil da Instituição'}
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-[10px] font-bold text-primary uppercase leading-none">Rede Rootcare</span>
                                <span className="text-xs font-bold text-green-600 leading-none mt-1">Conectada</span>
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

                {/* Scrolled Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 lg:pb-8">
                    <div className="max-w-6xl mx-auto space-y-8">
                        <AnimatePresence mode="wait">
                            <motion.div key={activePage} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                                {activePage === 'inst_dashboard' && (
                                    <div className="space-y-8">
                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {[
                                                { label: 'Total Pacientes', value: patients.length, icon: 'group', color: 'purple' },
                                                { label: 'Em Tratamento', value: patients.filter(p => p.status === 'active').length, icon: 'local_hospital', color: 'primary' },
                                                { label: 'Receita Est.', value: 'R$ 42k', icon: 'payments', color: 'blue' },
                                                { label: 'NPS Clínica', value: '4.9', icon: 'star', color: 'amber' },
                                            ].map((stat, i) => (
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

                                        {/* Premium Table Content */}
                                        <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
                                            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-white dark:bg-white/[0.02]">
                                                <div>
                                                    <h3 className="font-bold text-lg">Últimos Pacientes</h3>
                                                    <p className="text-xs text-text-subtle font-bold uppercase tracking-widest mt-1">Atualizado em tempo real</p>
                                                </div>
                                                <button onClick={() => handlePageChange('inst_patients')} className="text-xs font-black uppercase text-primary hover:underline">Gerenciar Lista</button>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left">
                                                    <thead>
                                                        <tr className="bg-gray-50/50 dark:bg-white/[0.02] text-[10px] font-black uppercase tracking-widest text-text-subtle border-b border-gray-100 dark:border-white/10">
                                                            <th className="px-6 py-4">Paciente</th>
                                                            <th className="px-6 py-4">Médico Resp.</th>
                                                            <th className="px-6 py-4">Tratamento</th>
                                                            <th className="px-6 py-4 text-right">Ações</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50 dark:divide-white/[0.03]">
                                                        {patients.map((patient) => (
                                                            <tr key={patient.id} className="group hover:bg-gray-50 dark:hover:bg-white/[0.01] transition-colors">
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-black text-xs">
                                                                            {patient.name[0]}
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-sm font-bold">{patient.name}</p>
                                                                            <p className="text-[10px] text-text-subtle font-bold uppercase">{patient.phone}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <p className="text-sm font-bold dark:text-gray-300">{patient.doctorName}</p>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="h-1.5 w-24 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                                                            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${patient.treatmentProgress}%` }}></div>
                                                                        </div>
                                                                        <span className="text-[11px] font-black text-primary">{patient.treatmentProgress}%</span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 text-right">
                                                                    <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                                                                        <span className="material-symbols-outlined text-sm font-black">arrow_forward</span>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activePage !== 'inst_dashboard' && (
                                    <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-20 rounded-2xl text-center">
                                        <span className="material-symbols-outlined text-6xl text-primary/20 mb-4 italic">architecture</span>
                                        <h3 className="text-xl font-black">Em Atualização Visual</h3>
                                        <p className="text-text-subtle mt-2">Esta tela está sendo adaptada para o novo padrão de design premium.</p>
                                        <button onClick={() => handlePageChange('inst_dashboard')} className="mt-6 px-6 py-3 bg-primary text-background-dark rounded-xl font-black text-sm uppercase">Ir para Resumo</button>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            {/* Mobile Bottom Navigation (Matching Patient) */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-surface border-t border-gray-100 dark:border-white/10 px-6 py-3 z-50 flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                {[
                    { page: 'inst_dashboard', icon: 'grid_view', label: 'Home' },
                    { page: 'inst_patients', icon: 'group', label: 'Pacientes' },
                    { page: 'inst_doctors', icon: 'medical_services', label: 'Médicos' },
                    { page: 'inst_reports', icon: 'analytics', label: 'Métricas' }
                ].map((item) => (
                    <button key={item.page} onClick={() => handlePageChange(item.page as InstitutionPage)} className={`flex flex-col items-center gap-1 ${activePage === item.page ? 'text-primary' : 'text-gray-400'}`}>
                        <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                        <span className="text-[10px] font-bold">{item.label}</span>
                    </button>
                ))}
                <button onClick={onLogout} className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-500">
                    <span className="material-symbols-outlined text-2xl">logout</span>
                    <span className="text-[10px] font-bold">Sair</span>
                </button>
            </nav>

            {/* Register Modal (Standardized) */}
            {showRegisterModal && (
                <div className="fixed inset-0 bg-background-dark/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-[#112116] rounded-3xl p-8 max-w-xl w-full border border-gray-200 dark:border-white/10 shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-black">Cadastro de Paciente</h3>
                                <p className="text-sm text-text-subtle font-bold">Preencha os dados básicos para iniciar o prontuário.</p>
                            </div>
                            <button onClick={() => setShowRegisterModal(false)} className="size-10 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all">
                                <span className="material-symbols-outlined font-black">close</span>
                            </button>
                        </div>
                        <form className="space-y-4">
                            <input className="w-full px-5 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary font-bold text-sm" placeholder="Nome Completo" />
                            <input className="w-full px-5 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary font-bold text-sm" placeholder="E-mail" />
                            <div className="flex gap-4">
                                <button type="button" onClick={() => setShowRegisterModal(false)} className="flex-1 py-4 bg-gray-100 dark:bg-white/5 rounded-2xl font-black text-sm transition-all hover:bg-gray-200">Cancelar</button>
                                <button type="submit" className="flex-1 py-4 bg-primary text-background-dark rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:brightness-110">Cadastrar</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #30e86e33; border-radius: 10px; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default InstitutionDashboard;
