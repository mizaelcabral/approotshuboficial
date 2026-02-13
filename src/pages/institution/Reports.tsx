import React from 'react';

const ReportsPage = () => {
    const metrics = [
        { label: 'Novos Pacientes', value: '+12', period: 'Este mês', icon: 'person_add', color: 'primary' },
        { label: 'Consultas Realizadas', value: '148', period: 'Este mês', icon: 'medical_services', color: 'blue' },
        { label: 'Receita Total', value: 'R$ 68.400', period: 'Este mês', icon: 'payments', color: 'green' },
        { label: 'Taxa de Conversão', value: '84%', period: 'Este mês', icon: 'trending_up', color: 'purple' },
    ];

    return (
        <div className="space-y-8 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                    <div key={i} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-6 rounded-2xl shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`size-10 rounded-xl bg-${m.color}-500/10 text-${m.color}-600 flex items-center justify-center`}>
                                <span className="material-symbols-outlined text-xl">{m.icon}</span>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-text-subtle">{m.period}</span>
                        </div>
                        <p className="text-2xl font-black mb-1">{m.value}</p>
                        <p className="text-xs font-bold text-text-subtle">{m.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
                    <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-4xl text-primary font-bold">query_stats</span>
                    </div>
                    <h3 className="text-xl font-black mb-2">Análise Gráfica em Breve</h3>
                    <p className="text-sm text-text-subtle max-w-sm">Estamos processando os dados históricos da sua clínica para gerar insights precisos de crescimento e retenção.</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm">
                        <h3 className="font-bold text-lg mb-6">Metas da Clínica</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2">
                                    <span>Novos Pacientes</span>
                                    <span className="text-primary">85%</span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2">
                                    <span>Receita Esperada</span>
                                    <span className="text-blue-500">62%</span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500" style={{ width: '62%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2">
                                    <span>Satisfação (NPS)</span>
                                    <span className="text-amber-500">98%</span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500" style={{ width: '98%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-white dark:bg-white/5 border border-primary/20 text-primary font-black rounded-xl uppercase text-xs hover:bg-primary/5 transition-all">
                        Exportar Relatório Mensal (.PDF)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
