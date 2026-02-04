import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DoctorPage, Appointment, TreatmentReport } from '../../types';

interface DoctorDashboardProps {
    onPageChange: (page: DoctorPage) => void;
    onLogout: () => void;
}

// --- Shared Design Components (Duplicated for consistency as per user's "consolidated" preference) ---
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

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ onPageChange, onLogout }) => {
    const [activePage, setActivePage] = useState<DoctorPage>('doc_dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isReportsExpanded, setIsReportsExpanded] = useState(false);

    const handlePageChange = (page: DoctorPage) => {
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
    const appointments: Appointment[] = [
        { id: '1', patientId: '1', patientName: 'João Silva', doctorId: '1', doctorName: 'Dr. Carlos', date: '2024-02-05', time: '14:30', status: 'pending', type: 'consultation' },
        { id: '2', patientId: '2', patientName: 'Maria Santos', doctorId: '1', doctorName: 'Dr. Carlos', date: '2024-02-05', time: '15:00', status: 'confirmed', type: 'follow-up' },
        { id: '3', patientId: '3', patientName: 'Pedro Costa', doctorId: '1', doctorName: 'Dr. Carlos', date: '2024-02-06', time: '10:00', status: 'confirmed', type: 'consultation' },
    ];

    const pendingReports = 3;
    const todayAppointments = appointments.filter(a => a.date === '2024-02-05').length;

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display transition-colors duration-200">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-72 flex-shrink-0 border-r border-gray-200 dark:border-white/10 bg-white dark:bg-dark-surface flex-col p-6 overflow-y-auto scrollbar-hide">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-3 px-2">
                        <div className="bg-primary/20 p-2 rounded-lg">
                            <span className="material-symbols-outlined text-primary text-2xl font-bold">medical_services</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold uppercase tracking-wider">Rootcare</h1>
                            <p className="text-text-muted text-xs font-medium uppercase tracking-widest">Painel Médico</p>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-1">
                        <SidebarItem icon="grid_view" label="Dashboard" active={activePage === 'doc_dashboard'} onClick={() => handlePageChange('doc_dashboard')} />
                        <SidebarItem icon="group" label="Meus Pacientes" active={activePage === 'doc_patients'} onClick={() => handlePageChange('doc_patients')} />
                        <SidebarItem icon="event_available" label="Minha Agenda" active={activePage === 'doc_appointments'} onClick={() => handlePageChange('doc_appointments')} />

                        <div className="flex flex-col gap-1 mt-2">
                            <SidebarItem
                                icon="description"
                                label="Relatórios"
                                active={activePage === 'doc_reports'}
                                onClick={() => setIsReportsExpanded(!isReportsExpanded)}
                                hasSubmenu={true}
                                isExpanded={isReportsExpanded}
                            />
                            <AnimatePresence>
                                {isReportsExpanded && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pl-4 flex flex-col gap-1 overflow-hidden">
                                        <button onClick={() => handlePageChange('doc_reports')} className="text-left py-2 px-4 text-xs font-bold text-text-subtle hover:text-primary transition-colors">Pendentes ({pendingReports})</button>
                                        <button onClick={() => handlePageChange('doc_reports')} className="text-left py-2 px-4 text-xs font-bold text-text-subtle hover:text-primary transition-colors">Histórico</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <SidebarItem icon="person" label="Meu Perfil" active={activePage === 'doc_profile'} onClick={() => handlePageChange('doc_profile')} />
                    </nav>

                    <div className="flex flex-col gap-4 pt-4">
                        <SidebarInfoCard icon="schedule" label="Próxima Consulta" title="João Silva" subtitle="Hoje às 14:30" variant="default" actionLabel="Ver Detalhes" />
                        <SidebarInfoCard icon="warning" label="Atenção" title="3 Relatórios" subtitle="Aguardando sua revisão" variant="warning" actionLabel="Revisar Agora" />
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/10 flex items-center gap-3 cursor-pointer group" onClick={() => handlePageChange('doc_profile')}>
                    <div className="w-10 h-10 rounded-full bg-primary/20 overflow-hidden border-2 border-transparent group-hover:border-primary transition-all shadow-sm">
                        <img src="/images/doctor-green.png" alt="Dr. Carlos Silva" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-bold group-hover:text-primary transition-colors">Dr. Carlos Silva</p>
                        <p className="text-xs text-gray-500">CRM: 123456-SP</p>
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
                            {activePage === 'doc_dashboard' ? 'Painel Médico' :
                                activePage === 'doc_patients' ? 'Gestão de Pacientes' :
                                    activePage === 'doc_appointments' ? 'Agenda de Consultas' :
                                        activePage === 'doc_reports' ? 'Relatórios de Tratamento' : 'Perfil do Médico'}
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-[10px] font-bold text-primary uppercase leading-none">Status do Sistema</span>
                                <span className="text-xs font-bold text-green-600 leading-none mt-1">Operacional</span>
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
                                {activePage === 'doc_dashboard' && (
                                    <div className="space-y-8">
                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {[
                                                { label: 'Total de Pacientes', value: '48', icon: 'group', color: 'blue' },
                                                { label: 'Consultas Hoje', value: todayAppointments, icon: 'calendar_today', color: 'green' },
                                                { label: 'Relatórios Pendentes', value: pendingReports, icon: 'description', color: 'amber' },
                                                { label: 'Avaliação Média', value: '4.8', icon: 'star', color: 'purple' },
                                            ].map((stat, i) => (
                                                <div key={i} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-6 rounded-2xl shadow-sm">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`p-3 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-500`}>
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

                                        {/* Main Cards Row */}
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                            <div className="lg:col-span-2 space-y-6">
                                                <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
                                                    <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-white dark:bg-white/[0.02]">
                                                        <h3 className="font-bold text-lg">Próximas Consultas</h3>
                                                        <button onClick={() => handlePageChange('doc_appointments')} className="text-xs font-black uppercase text-primary hover:underline">Ver Agenda Completa</button>
                                                    </div>
                                                    <div className="p-2">
                                                        {appointments.map((apt) => (
                                                            <div key={apt.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-all cursor-pointer">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="size-11 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-black text-xs">
                                                                        {apt.patientName.split(' ').map(n => n[0]).join('')}
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-bold">{apt.patientName}</p>
                                                                        <div className="flex items-center gap-2 mt-0.5">
                                                                            <span className="text-[11px] font-bold text-text-subtle">{apt.time}</span>
                                                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                                            <span className="text-[11px] font-bold text-text-subtle uppercase">{apt.type === 'consultation' ? 'Consulta' : 'Retorno'}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${apt.status === 'confirmed' ? 'bg-green-500/10 text-green-600' : 'bg-amber-500/10 text-amber-600'
                                                                    }`}>
                                                                    {apt.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm">
                                                    <h3 className="font-bold text-lg mb-6">Atalhos Rápidos</h3>
                                                    <div className="space-y-3">
                                                        <button className="w-full flex items-center gap-3 p-4 bg-primary text-background-dark rounded-xl font-black text-sm hover:brightness-110 transition-all">
                                                            <span className="material-symbols-outlined">edit_square</span>
                                                            Nova Prescrição
                                                        </button>
                                                        <button onClick={() => handlePageChange('doc_reports')} className="w-full flex items-center gap-3 p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl font-bold text-sm hover:border-primary transition-all">
                                                            <span className="material-symbols-outlined text-primary">description</span>
                                                            Revisar Relatórios
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* Other pages could be handled here similarly */}
                                {activePage !== 'doc_dashboard' && (
                                    <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-20 rounded-2xl text-center">
                                        <span className="material-symbols-outlined text-6xl text-primary/20 mb-4 italic">construction</span>
                                        <h3 className="text-xl font-black">Em Desenvolvimento</h3>
                                        <p className="text-text-subtle mt-2">Esta funcionalidade está sendo atualizada para o novo padrão visual.</p>
                                        <button onClick={() => handlePageChange('doc_dashboard')} className="mt-6 px-6 py-3 bg-primary text-background-dark rounded-xl font-black text-sm uppercase">Voltar ao Início</button>
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
                    { page: 'doc_dashboard', icon: 'grid_view', label: 'Início' },
                    { page: 'doc_patients', icon: 'group', label: 'Pacientes' },
                    { page: 'doc_appointments', icon: 'event', label: 'Agenda' },
                    { page: 'doc_reports', icon: 'description', label: 'Relatos' }
                ].map((item) => (
                    <button key={item.page} onClick={() => handlePageChange(item.page as DoctorPage)} className={`flex flex-col items-center gap-1 ${activePage === item.page ? 'text-primary' : 'text-gray-400'}`}>
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

export default DoctorDashboard;
