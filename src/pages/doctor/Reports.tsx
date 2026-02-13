import React, { useState } from 'react';

const ReportsPage = ({ filter = 'all' }: { filter?: 'all' | 'pending' | 'history' }) => {
    const [activeFilter, setActiveFilter] = useState<'pending' | 'history'>(filter === 'all' ? 'pending' : filter as any);

    const reports = [
        { id: '1', patient: 'João Silva', date: '04/02/2024', mood: 4, sleep: 5, pain: 2, status: 'pending', notes: 'Melhora significativa no sono após ajuste de dose.' },
        { id: '2', patient: 'Maria Santos', date: '03/02/2024', mood: 3, sleep: 3, pain: 5, status: 'pending', notes: 'Paciente relata irritabilidade leve à tarde.' },
        { id: '3', patient: 'Pedro Costa', date: '01/02/2024', mood: 5, sleep: 4, pain: 1, status: 'reviewed', notes: 'Tratamento estável, manter posologia.' },
        { id: '4', patient: 'Ana Oliveira', date: '28/01/2024', mood: 2, sleep: 2, pain: 7, status: 'reviewed', notes: 'Considerar aumento da dosagem de CBD.' },
    ];

    const filteredReports = reports.filter(r =>
        activeFilter === 'pending' ? r.status === 'pending' : r.status === 'reviewed'
    );

    return (
        <div className="space-y-6">
            {/* Filter Tabs */}
            <div className="flex bg-white dark:bg-white/5 p-1.5 rounded-2xl border border-gray-100 dark:border-white/10 w-fit">
                <button
                    onClick={() => setActiveFilter('pending')}
                    className={`px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${activeFilter === 'pending' ? 'bg-primary text-background-dark shadow-lg shadow-primary/20' : 'text-text-subtle hover:text-primary'}`}
                >
                    Pendentes ({reports.filter(r => r.status === 'pending').length})
                </button>
                <button
                    onClick={() => setActiveFilter('history')}
                    className={`px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${activeFilter === 'history' ? 'bg-primary text-background-dark shadow-lg shadow-primary/20' : 'text-text-subtle hover:text-primary'}`}
                >
                    Histórico
                </button>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                {filteredReports.map((report) => (
                    <div key={report.id} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:border-primary/30 transition-all flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="size-11 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-black text-xs">
                                        {report.patient.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{report.patient}</p>
                                        <p className="text-[11px] text-text-subtle font-bold uppercase tracking-widest">{report.date}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${report.status === 'pending' ? 'bg-amber-500/10 text-amber-500' : 'bg-green-500/10 text-green-500'}`}>
                                    {report.status === 'pending' ? 'Para Revisão' : 'Revisado'}
                                </span>
                            </div>

                            <div className="grid grid-cols-4 gap-4 mb-6">
                                <div className="text-center p-2 bg-gray-50 dark:bg-white/[0.03] rounded-xl">
                                    <span className="material-symbols-outlined text-sm text-amber-500 mb-1">mood</span>
                                    <p className="text-xs font-black">{report.mood}/5</p>
                                    <p className="text-[10px] text-text-subtle uppercase">Humor</p>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-white/[0.03] rounded-xl">
                                    <span className="material-symbols-outlined text-sm text-blue-500 mb-1">bedtime</span>
                                    <p className="text-xs font-black">{report.sleep}/5</p>
                                    <p className="text-[10px] text-text-subtle uppercase">Sono</p>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-white/[0.03] rounded-xl">
                                    <span className="material-symbols-outlined text-sm text-red-500 mb-1">favorite</span>
                                    <p className="text-xs font-black">{report.pain}/10</p>
                                    <p className="text-[10px] text-text-subtle uppercase">Dor</p>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-white/[0.03] rounded-xl">
                                    <span className="material-symbols-outlined text-sm text-primary mb-1">medication</span>
                                    <p className="text-[10px] text-primary font-black uppercase">Eficiente</p>
                                    <p className="text-[10px] text-text-subtle uppercase">Efeito</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-white/[0.02] p-4 rounded-xl border border-gray-100 dark:border-white/5 mb-6">
                                <p className="text-xs text-text-subtle font-bold uppercase tracking-wider mb-2">Observações:</p>
                                <p className="text-sm font-medium leading-relaxed italic">"{report.notes}"</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {report.status === 'pending' ? (
                                <>
                                    <button className="flex-1 py-3 bg-primary text-background-dark font-black rounded-xl text-xs uppercase hover:brightness-110 transition-all shadow-lg shadow-primary/10">
                                        Revisar e Comentar
                                    </button>
                                    <button className="flex-1 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-text-main dark:text-white font-black rounded-xl text-xs uppercase hover:border-blue-500 transition-all">
                                        Ver Histórico
                                    </button>
                                </>
                            ) : (
                                <button className="w-full py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-text-main dark:text-white font-black rounded-xl text-xs uppercase hover:border-primary transition-all">
                                    Visualizar Revisão
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportsPage;
