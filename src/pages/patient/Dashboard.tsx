import { MedicationCard } from '../../components/common/Cards';
import { Page } from '../../types';

interface DashboardPageProps {
    setActivePage: (page: Page) => void;
}

const DashboardPage = ({ setActivePage }: DashboardPageProps) => (
    <div className="space-y-8 pb-12">
        {/* Welcome Section */}
        <header className="flex flex-wrap justify-between items-center gap-4 py-2">
            <div className="space-y-1">
                <h2 className="text-xl md:text-3xl font-black tracking-tight dark:text-white leading-tight">Olá, João Silva</h2>
                <p className="text-[#4e9767] text-sm md:text-base font-bold">Seu resumo de hoje, 31 de Janeiro.</p>
            </div>
            <div className="flex items-center gap-6">
                <div className="hidden sm:flex flex-col items-end">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status Financeiro</span>
                    <span className="text-sm font-black text-green-600">Regular</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setActivePage('profile')}
                        className="p-2 border border-gray-100 dark:border-white/10 rounded-xl bg-white dark:bg-dark-surface shadow-sm hover:border-primary/50 transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-primary text-sm">settings</span>
                        <span className="text-xs font-bold px-1">Ajustes</span>
                    </button>
                    <div className="hidden sm:flex bg-primary/10 border border-primary/20 px-4 py-2 rounded-xl items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-xl">military_tech</span>
                        <span className="text-xs font-black text-primary uppercase tracking-tighter">Isenção 100%</span>
                    </div>
                </div>
            </div>
        </header>

        {/* Hub Row 1: Core Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Progress Card */}
            <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-primary text-2xl">insights</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tratamento</span>
                </div>
                <div>
                    <h3 className="text-2xl font-black">65%</h3>
                    <p className="text-xs text-gray-500 font-medium">Progresso da Fase Atual</p>
                </div>
                <div className="w-full bg-gray-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full w-[65%] shadow-[0_0_8px_rgba(78,151,103,0.5)]" />
                </div>
            </div>

            {/* Logistics Hub Snippet */}
            <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-blue-500 text-2xl">local_shipping</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Logística</span>
                </div>
                <div className="min-w-0">
                    <h3 className="text-sm font-bold truncate">Rua das Flores, 123</h3>
                    <p className="text-[10px] text-gray-500 font-medium">Destino Principal • Curitiba</p>
                </div>
                <button onClick={() => setActivePage('addresses')} className="text-[10px] font-black text-primary uppercase hover:underline">Alterar Endereço</button>
            </div>

            {/* Documentation Hub Snippet */}
            <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-amber-500 text-2xl">description</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Documentação</span>
                </div>
                <div>
                    <h3 className="text-sm font-bold">Receita: Válida</h3>
                    <p className="text-[10px] text-amber-600 font-black uppercase tracking-tight">Expira em 45 dias</p>
                </div>
                <button onClick={() => setActivePage('documents')} className="text-[10px] font-black text-primary uppercase hover:underline">Ver Receita Digital</button>
            </div>

            {/* Next Appointment Card */}
            <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 size-20 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <span className="material-symbols-outlined text-primary text-2xl mb-1">calendar_today</span>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Próxima Consulta</p>
                    </div>
                    <div>
                        <h3 className="text-gray-900 dark:text-white text-base font-bold leading-tight">Dra. Letícia</h3>
                        <p className="text-primary text-xs font-black">24 de Set, 14:30</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Medications Column */}
            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-xl font-black tracking-tight">Tratamento Diário</h3>
                    <button onClick={() => setActivePage('pharmacy')} className="text-primary text-xs font-black uppercase hover:underline">Farmácia</button>
                </div>

                <div className="grid gap-4">
                    <MedicationCard
                        icon="opacity"
                        title="Óleo CBD Full Spectrum 10%"
                        dosage="Sublingual • 3 gotas"
                        status="Regular"
                        nextTime="20:00"
                    />
                    <MedicationCard
                        icon="medication"
                        title="Gummies CBD Relax Night"
                        dosage="Mastigável • 1 un"
                        status="Pendente"
                        nextTime="22:30"
                    />
                </div>

                {/* Quick Shortcuts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <button onClick={() => setActivePage('reports')} className="p-4 bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-2 group">
                        <div className="size-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                            <span className="material-symbols-outlined">edit_square</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-primary">Registrar</span>
                    </button>
                    <button onClick={() => setActivePage('documents')} className="p-4 bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-2 group">
                        <div className="size-10 bg-blue-500/5 rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                            <span className="material-symbols-outlined">folder</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-blue-500">Arquivos</span>
                    </button>
                    <button onClick={() => setActivePage('appointments')} className="p-4 bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-2 group">
                        <div className="size-10 bg-amber-500/5 rounded-xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all">
                            <span className="material-symbols-outlined">event</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-amber-500">Agenda</span>
                    </button>
                    <button onClick={() => setActivePage('pharmacy')} className="p-4 bg-[#112116] rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-2 group">
                        <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">storefront</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Comprar</span>
                    </button>
                </div>

                {/* Treatment Insights \u0026 Metrics */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-black tracking-tight">Insights do Tratamento</h3>
                        <button onClick={() => setActivePage('reports')} className="text-xs font-black text-primary uppercase hover:underline">Ver Todos</button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-green-600 text-lg">bedtime</span>
                                <span className="text-[10px] font-black text-gray-500 uppercase">Sono</span>
                            </div>
                            <p className="text-2xl font-black text-green-600">+32%</p>
                            <p className="text-[10px] text-gray-500 font-medium">Melhora</p>
                        </div>
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-blue-600 text-lg">mood</span>
                                <span className="text-[10px] font-black text-gray-500 uppercase">Humor</span>
                            </div>
                            <p className="text-2xl font-black text-blue-600">+28%</p>
                            <p className="text-[10px] text-gray-500 font-medium">Melhora</p>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-900/20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-purple-600 text-lg">self_improvement</span>
                                <span className="text-[10px] font-black text-gray-500 uppercase">Ansiedade</span>
                            </div>
                            <p className="text-2xl font-black text-purple-600">-45%</p>
                            <p className="text-[10px] text-gray-500 font-medium">Redução</p>
                        </div>
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-amber-600 text-lg">favorite</span>
                                <span className="text-[10px] font-black text-gray-500 uppercase">Dor</span>
                            </div>
                            <p className="text-2xl font-black text-amber-600">-38%</p>
                            <p className="text-[10px] text-gray-500 font-medium">Redução</p>
                        </div>
                    </div>
                </div>

                {/* Upcoming Deliveries \u0026 Activity Timeline */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Upcoming Deliveries */}
                    <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="size-10 bg-blue-50 dark:bg-blue-900/10 rounded-xl flex items-center justify-center text-blue-500">
                                    <span className="material-symbols-outlined">local_shipping</span>
                                </div>
                                <h3 className="text-lg font-black tracking-tight">Próximas Entregas</h3>
                            </div>
                            <button onClick={() => setActivePage('orders')} className="text-xs font-black text-primary uppercase hover:underline">Ver Pedidos</button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                                <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                                    <span className="material-symbols-outlined">package_2</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-sm truncate">Óleo CBD Full Spectrum 10%</p>
                                    <p className="text-xs text-gray-500 font-medium">Pedido #4521 • Chega em 2 dias</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 text-[10px] font-black rounded-full uppercase">Em Trânsito</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                                <div className="size-12 bg-amber-50 dark:bg-amber-900/10 rounded-xl flex items-center justify-center text-amber-500 flex-shrink-0">
                                    <span className="material-symbols-outlined">inventory_2</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-sm truncate">Gummies CBD Relax Night</p>
                                    <p className="text-xs text-gray-500 font-medium">Pedido #4498 • Chega em 5 dias</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 text-[10px] font-black rounded-full uppercase">Processando</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity Timeline */}
                    <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="size-10 bg-purple-50 dark:bg-purple-900/10 rounded-xl flex items-center justify-center text-purple-500">
                                    <span className="material-symbols-outlined">history</span>
                                </div>
                                <h3 className="text-lg font-black tracking-tight">Atividade Recente</h3>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                                        <span className="material-symbols-outlined text-sm">check</span>
                                    </div>
                                    <div className="w-0.5 h-full bg-gray-200 dark:bg-white/10 mt-2"></div>
                                </div>
                                <div className="flex-1 pb-4">
                                    <p className="font-bold text-sm">Relato Registrado</p>
                                    <p className="text-xs text-gray-500 font-medium">Ontem às 20:30 • Melhora no sono</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="size-8 bg-blue-50 dark:bg-blue-900/10 rounded-full flex items-center justify-center text-blue-500 flex-shrink-0">
                                        <span className="material-symbols-outlined text-sm">medication</span>
                                    </div>
                                    <div className="w-0.5 h-full bg-gray-200 dark:bg-white/10 mt-2"></div>
                                </div>
                                <div className="flex-1 pb-4">
                                    <p className="font-bold text-sm">Medicação Tomada</p>
                                    <p className="text-xs text-gray-500 font-medium">Hoje às 08:00 • Óleo CBD 3 gotas</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="size-8 bg-amber-50 dark:bg-amber-900/10 rounded-full flex items-center justify-center text-amber-500 flex-shrink-0">
                                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-sm">Consulta Agendada</p>
                                    <p className="text-xs text-gray-500 font-medium">Há 2 dias • Dra. Letícia Oliveira</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Concierge, Tips \u0026 Reports Hub Column */}
            <div className="space-y-8">
                {/* Reports Summary Card (from User Image) */}
                <div className="bg-primary p-7 rounded-2xl shadow-xl shadow-primary/20 flex flex-col justify-between items-start relative overflow-hidden group">
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80')" }} />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/95 to-primary/80" />
                    <div className="absolute right-0 top-0 size-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-125 transition-all duration-700" />
                    <div className="relative z-10 w-full space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="size-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">edit_square</span>
                            </div>
                            <h4 className="text-white font-black text-lg">Relatos do Tratamento</h4>
                        </div>
                        <p className="text-white/90 text-sm font-medium leading-relaxed">
                            Último relato: <span className="font-black">Ontem, 20:30</span><br />
                            Status: <span className="font-black italic">Melhora no Sono</span>
                        </p>
                        <button
                            onClick={() => setActivePage('reports')}
                            className="w-full bg-white text-primary font-black py-4 rounded-xl text-sm shadow-lg hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2"
                        >
                            Registrar Agora
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>

                {/* Concierge Card */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm space-y-5 group cursor-pointer hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="size-14 rounded-2xl bg-primary/10 p-0.5 border border-primary/20 overflow-hidden">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD80dArObbYpuXgVgJ8NNJ7sYtznk2tjUDomJsAvfvtiM4vNnQMVbEkd0bYqCrSGFsH_JTgANLQO7YIw0Nfh_1MsGQtU8iZtBt5fNeOs5uvVGr3TK8QEGwzl9dUeK4RW_0_A287HMttjG1ZNMh7ts4qohYVfZTD0qjTdnVa9QWGSXQJDPnFC3uFlI3K1eO3b4T-gqUZ3FNvutAjaDM5W90uNEa-grRuYGvoguFLn07zYHQh9c_tS8ADOvNbNT2ky4AFaSgoMbrmnTg" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div>
                            <p className="font-black leading-tight">Dra. Letícia</p>
                            <p className="text-primary text-[10px] font-black uppercase tracking-widest">Sua Concierge</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                        "Olá João! Verifiquei que seu estoque de óleo está quase no fim. Deseja renovar seu pedido?"
                    </p>
                    <button className="text-xs font-black text-primary uppercase hover:underline">Falar no Concierge</button>
                </div>

                <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm group cursor-pointer hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="size-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 dark:bg-amber-500/10">
                            <span className="material-symbols-outlined text-xl">lightbulb</span>
                        </div>
                        <h4 className="font-bold text-sm">Dica de Bem-estar</h4>
                    </div>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                        A constância é fundamental. Tente administrar o CBD no mesmo horário todos os dias.
                    </p>
                </div>

                {/* Prescription Renewal Reminder Card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 p-6 rounded-2xl border border-green-100 dark:border-green-900/20 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-8 -bottom-8 size-32 bg-green-200/30 dark:bg-primary/10 rounded-full blur-2xl group-hover:scale-125 transition-all duration-500" />
                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-2xl">event_upcoming</span>
                            </div>
                            <div>
                                <h4 className="font-black text-sm">Próxima Renovação</h4>
                                <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Receita Médica</p>
                            </div>
                        </div>
                        <div className="p-4 bg-white/60 dark:bg-white/5 rounded-xl border border-green-200/50 dark:border-green-800/30">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">Vencimento</span>
                                <span className="text-xs font-black text-primary">45 dias</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-primary to-emerald-500 h-full rounded-full w-[65%] shadow-lg shadow-primary/30"></div>
                            </div>
                        </div>
                        <button
                            onClick={() => setActivePage('appointments')}
                            className="w-full bg-primary hover:bg-primary-dark text-[#0e1b12] font-bold py-3 rounded-xl text-xs shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group/btn"
                        >
                            <span>Agendar Renovação</span>
                            <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <footer className="py-10 border-t border-gray-100 dark:border-white/5 text-center px-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-loose">
                © 2024 Rootcare Integrated Health Systems.<br />
                Inteligência Médica \u0026 Cuidado Humanizado.
            </p>
        </footer>
    </div>
);

export default DashboardPage;
