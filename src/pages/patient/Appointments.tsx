import React from 'react';

interface AppointmentLogCardProps {
    date: string;
    month: string;
    time: string;
    doctor: string;
    description: string;
    status?: string;
    type: string;
}

const AppointmentLogCard = ({ date, month, time, doctor, description, status, type }: AppointmentLogCardProps) => (
    <div className={`p-6 rounded-2xl border ${status === 'next' ? 'bg-primary/5 dark:bg-primary/10 border-primary/20 relative overflow-hidden' : 'bg-white dark:bg-dark-surface border-gray-100 dark:border-white/10 opacity-90'}`}>
        {status === 'next' && <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-white text-[10px] font-bold uppercase rounded-bl-xl shadow-sm">Próxima</div>}
        <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className={`flex-shrink-0 text-center md:border-r ${status === 'next' ? 'border-primary/20' : 'border-gray-100 dark:border-white/10'} md:pr-6 ${status !== 'next' && 'opacity-60'}`}>
                <p className="text-xs font-bold uppercase text-primary">{month}</p>
                <p className="text-3xl font-black">{date}</p>
                <p className="text-sm font-medium">{time}</p>
            </div>
            <div className="flex-1">
                <span className="px-2 py-0.5 text-[10px] font-bold rounded uppercase bg-primary/20 text-primary">{type}</span>
                <h4 className="text-lg font-bold">{doctor}</h4>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-md">{status === 'next' ? 'Entrar na Sala' : 'Ver Retorno'}</button>
        </div>
    </div>
);

const AppointmentsPage = () => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-8">
                <section className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">event_available</span>
                        Agendar Consulta
                    </h3>
                    <div className="bg-white dark:bg-[#1a2e20] p-6 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="font-bold">Outubro 2023</h4>
                            <div className="flex gap-2">
                                <button className="p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                                <button className="p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 text-center text-xs font-bold text-gray-400 mb-4">
                            <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
                        </div>
                        <div className="grid grid-cols-7 text-center gap-y-2">
                            <span className="p-2 text-gray-300">1</span><span className="p-2">2</span><span className="p-2">3</span><span className="p-2">4</span><span className="p-2">5</span><span className="p-2">6</span><span className="p-2">7</span>
                            <span className="p-2">8</span><span className="p-2">9</span><span className="p-2">10</span><span className="p-2">11</span><span className="p-2">12</span><span className="p-2">13</span><span className="p-2">14</span>
                            <span className="p-2">15</span><span className="p-2">16</span><span className="p-2">17</span><span className="p-2">18</span><span className="p-2">19</span><span className="p-2">20</span><span className="p-2">21</span>
                            <span className="p-2">22</span><span className="p-2">23</span><span className="p-2 bg-primary/20 text-primary font-bold rounded-full">24</span><span className="p-2">25</span><span className="p-2">26</span><span className="p-2">27</span><span className="p-2">28</span>
                            <span className="p-2">29</span><span className="p-2">30</span><span className="p-2">31</span>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h3 className="text-lg font-bold px-1">Médicos da sua Instituição</h3>
                    <div className="space-y-3">
                        <div className="bg-white dark:bg-[#1a2e20] p-4 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-4 hover:border-primary/40 transition-colors group cursor-pointer">
                            <div className="w-12 h-12 rounded-lg bg-cover bg-center bg-gray-100" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD80dArObbYpuXgVgJ8NNJ7sYtznk2tjUDomJsAvfvtiM4vNnQMVbEkd0bYqCrSGFH_JTgANLQO7YIw0Nfh_1MsGQtU8iZtBt5fNeOs5uvVGr3TK8QEGwzl9dUeK4RW_0_A287HMttjG1ZNMh7ts4qohYVfZTD0qjTdnVa9QWGSXQJDPnFC3uFlI3K1eO3b4T-gqUZ3FNvutAjaDM5W90uNEa-grRuYGvoguFLn07zYHQh9c_tS8ADOvNbNT2ky4AFaSgoMbrmnTg')" }}></div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm">Dra. Letícia Oliveira</h4>
                                <p className="text-xs text-[#4e9767]">Clínica Geral • Canabinologia</p>
                            </div>
                            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">chevron_right</span>
                        </div>
                        <div className="bg-white dark:bg-[#1a2e20] p-4 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-4 hover:border-primary/40 transition-colors group cursor-pointer">
                            <div className="w-12 h-12 rounded-lg bg-cover bg-center bg-gray-100" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCu5uFFzFQ9gu487H4VYjlgrjb23oktCIg8IB1ovGXJiOUVHW35oWP_54imRyhHVxofd97r1vNKTYcxssuU4FI9n8xXPPa_6E4meW_Lw9whqR_QAmRxYiHRESmLE_t1JJr5W3G8aXolc5i3Ya6yFp2QqPIozZ4zc1O3FEjZj1P9L2sinY_CbTNwu38fid4Zxo4MA8KRlDUXLYlaT85fXS76m6hNWG0FiKr1dSQVhoU2kfqt7qoE7MYOB99EO_P__i6FiBUgvEYzWCYAtBO73nYcDIDpjHLyKuE0')" }}></div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm">Dr. Roberto Santos</h4>
                                <p className="text-xs text-[#4e9767]">Neurologista</p>
                            </div>
                            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">chevron_right</span>
                        </div>
                        <div className="bg-white dark:bg-[#1a2e20] p-4 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-4 hover:border-primary/40 transition-colors group cursor-pointer">
                            <div className="w-12 h-12 rounded-lg bg-cover bg-center bg-gray-100" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDH7N1-GMwM8HYy8LjJ-CqcUbryNZ66_gLO43HVtrqUk_wOiRVxrUDsD5G6Ny_tH8PQVoftEEUvF5bJPn7TeAOSqaZ0DoQPXT6ciAiYwbTbu-Xo4DYmewq9SWg9e6Kelol2rD4cEyaPo-ICRTK35cnJ1Z1iuHZbZLe-dRMR_cyDlaBOAGq8xOioPFqqL86eD19xdMNAApN3lE256vqosLYhNbo22dwEkxI29REU_P__i6FiBUgvEYzWCYAtBO73nYcDIDpjHLyKuE0')" }}></div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm">Dra. Ana Paula</h4>
                                <p className="text-xs text-[#4e9767]">Psiquiatra</p>
                            </div>
                            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">chevron_right</span>
                        </div>
                    </div>
                </section>
            </div>

            <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">history</span>
                        Meu Histórico de Consultas
                    </h3>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-500">Filtrar</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Next Appointment Card */}
                    <div className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/20 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-white text-[10px] font-bold uppercase rounded-bl-xl">Próxima</div>
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="flex-shrink-0 text-center md:border-r border-primary/20 md:pr-6">
                                <p className="text-xs font-bold text-primary uppercase">Setembro</p>
                                <p className="text-3xl font-black">24</p>
                                <p className="text-sm font-medium">Terça, 14:30</p>
                            </div>
                            <div className="flex-1 space-y-1">
                                <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-bold rounded uppercase">Consulta Inicial</span>
                                <h4 className="text-lg font-bold">Dra. Letícia Oliveira</h4>
                                <p className="text-sm text-gray-500">Unidade Jardins - São Paulo / Online</p>
                            </div>
                            <div className="flex flex-col gap-2 min-w-[140px]">
                                <button className="bg-primary text-white px-4 py-2.5 rounded-lg font-bold text-sm shadow-md hover:opacity-90 transition-opacity">Entrar na Sala</button>
                                <button className="text-gray-500 text-xs font-bold hover:underline">Reagendar</button>
                            </div>
                        </div>
                    </div>

                    {/* Past Appointment 1 */}
                    <div className="bg-white dark:bg-[#1a2e20] p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="flex-shrink-0 text-center md:border-r border-gray-100 dark:border-white/10 md:pr-6">
                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Agosto</p>
                                <p className="text-3xl font-black">12</p>
                                <p className="text-sm font-medium">Segunda, 10:00</p>
                            </div>
                            <div className="flex-1 space-y-1">
                                <span className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-gray-500 text-[10px] font-bold rounded uppercase">Retorno</span>
                                <h4 className="text-lg font-bold">Dr. Roberto Santos</h4>
                                <p className="text-sm text-gray-500">Consulta via Telemedicina</p>
                            </div>
                            <div className="min-w-[140px]">
                                <button className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white px-4 py-2.5 rounded-lg font-bold text-sm border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                    <span className="material-symbols-outlined text-sm">receipt_long</span>
                                    Ver Receita
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Past Appointment 2 */}
                    <div className="bg-white dark:bg-[#1a2e20] p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="flex-shrink-0 text-center md:border-r border-gray-100 dark:border-white/10 md:pr-6">
                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Julho</p>
                                <p className="text-3xl font-black">15</p>
                                <p className="text-sm font-medium">Segunda, 16:15</p>
                            </div>
                            <div className="flex-1 space-y-1">
                                <span className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-gray-500 text-[10px] font-bold rounded uppercase">Consulta</span>
                                <h4 className="text-lg font-bold">Dra. Letícia Oliveira</h4>
                                <p className="text-sm text-gray-500">Acompanhamento de Dosagem</p>
                            </div>
                            <div className="min-w-[140px]">
                                <button className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white px-4 py-2.5 rounded-lg font-bold text-sm border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                    <span className="material-symbols-outlined text-sm">visibility</span>
                                    Ver Retorno
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Past Appointment 3 */}
                    <div className="bg-white dark:bg-[#1a2e20] p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="flex-shrink-0 text-center md:border-r border-gray-100 dark:border-white/10 md:pr-6">
                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Junho</p>
                                <p className="text-3xl font-black">28</p>
                                <p className="text-sm font-medium">Sexta, 09:30</p>
                            </div>
                            <div className="flex-1 space-y-1">
                                <span className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-gray-500 text-[10px] font-bold rounded uppercase">Acompanhamento</span>
                                <h4 className="text-lg font-bold">Dr. Roberto Santos</h4>
                                <p className="text-sm text-gray-500">Avaliação de Exames Laboratoriais</p>
                            </div>
                            <div className="min-w-[140px]">
                                <button className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white px-4 py-2.5 rounded-lg font-bold text-sm border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                    <span className="material-symbols-outlined text-sm">description</span>
                                    Ver Laudo
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Past Appointment 4 */}
                    <div className="bg-white dark:bg-[#1a2e20] p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="flex-shrink-0 text-center md:border-r border-gray-100 dark:border-white/10 md:pr-6">
                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Maio</p>
                                <p className="text-3xl font-black">10</p>
                                <p className="text-sm font-medium">Sexta, 11:45</p>
                            </div>
                            <div className="flex-1 space-y-1">
                                <span className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-gray-500 text-[10px] font-bold rounded uppercase">Triagem</span>
                                <h4 className="text-lg font-bold">Dra. Letícia Oliveira</h4>
                                <p className="text-sm text-gray-500">Sessão de Triagem e Anamnese</p>
                            </div>
                            <div className="min-w-[140px]">
                                <button className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white px-4 py-2.5 rounded-lg font-bold text-sm border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                    <span className="material-symbols-outlined text-sm">history_edu</span>
                                    Ver Prontuário
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-green-600 rounded-2xl p-6 text-white flex items-center justify-between">
                    <div className="space-y-1">
                        <h4 className="font-bold text-lg leading-tight">Precisa de ajuda com o agendamento?</h4>
                        <p className="text-white/80 text-sm">Nossa concierge está disponível para auxiliar você.</p>
                    </div>
                    <button className="bg-white text-green-600 px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg whitespace-nowrap ml-4">Falar com Suporte</button>
                </div>
            </div>
        </div>
    </div>
);

export default AppointmentsPage;
