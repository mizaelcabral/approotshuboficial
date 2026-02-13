import React, { useState } from 'react';

const AppointmentsPage = () => {
    const appointments = [
        { id: '1', patient: 'João Silva', date: '2024-02-05', time: '14:30', type: 'consultation', status: 'pending' },
        { id: '2', patient: 'Maria Santos', date: '2024-02-05', time: '15:15', type: 'follow-up', status: 'confirmed' },
        { id: '3', patient: 'Pedro Costa', date: '2024-02-06', time: '10:00', type: 'consultation', status: 'confirmed' },
        { id: '4', patient: 'Luciana Lima', date: '2024-02-06', time: '11:30', type: 'emergency', status: 'cancelled' },
    ];

    return (
        <div className="space-y-8 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calendar Placeholder / Summary */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-6 rounded-2xl shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg">Hoje</h3>
                            <span className="text-xs font-bold text-primary uppercase">Fev 05, 2024</span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                                <span className="text-xs font-bold text-text-subtle">Consultas</span>
                                <span className="font-black">08</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                                <span className="text-xs font-bold text-text-subtle">Confirmadas</span>
                                <span className="font-black text-green-500">05</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                                <span className="text-xs font-bold text-text-subtle">Pendentes</span>
                                <span className="font-black text-amber-500">02</span>
                            </div>
                        </div>
                        <button className="w-full mt-6 py-4 bg-primary text-background-dark font-black rounded-xl uppercase text-xs shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
                            Agendar nova consulta
                        </button>
                    </div>

                    <div className="bg-[#112116] p-6 rounded-2xl shadow-sm border border-primary/20">
                        <h4 className="text-primary font-black text-xs uppercase tracking-widest mb-4">Próximo disponível</h4>
                        <p className="text-white font-bold text-lg mb-2">Quinta-feira, 08 de Fev</p>
                        <p className="text-gray-400 text-sm mb-4">Período da Manhã (09:00 - 12:00)</p>
                        <button className="text-primary text-xs font-black uppercase hover:underline">Gerenciar Horários</button>
                    </div>
                </div>

                {/* Appointments List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-white dark:bg-white/[0.02]">
                            <h3 className="font-bold text-lg">Agenda de Consultas</h3>
                            <div className="flex gap-2">
                                <button className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg text-text-subtle hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-sm">filter_list</span>
                                </button>
                                <button className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg text-text-subtle hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-sm">print</span>
                                </button>
                            </div>
                        </div>
                        <div className="p-2">
                            {appointments.map((apt) => (
                                <div key={apt.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-all border-b border-gray-50 dark:border-white/5 last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col items-center justify-center size-14 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                                            <span className="text-[10px] font-black uppercase text-text-subtle">Fev</span>
                                            <span className="text-lg font-black leading-none">{apt.date.split('-')[2]}</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{apt.patient}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="material-symbols-outlined text-[14px] text-primary">schedule</span>
                                                <span className="text-xs font-bold text-text-subtle">{apt.time}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                <span className="text-xs font-bold text-text-subtle uppercase">
                                                    {apt.type === 'consultation' ? 'Consulta' : apt.type === 'follow-up' ? 'Retorno' : 'Emergência'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 sm:mt-0 flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${apt.status === 'confirmed' ? 'bg-green-500/10 text-green-600' :
                                                apt.status === 'pending' ? 'bg-amber-500/10 text-amber-600' :
                                                    'bg-red-500/10 text-red-600'
                                            }`}>
                                            {apt.status === 'confirmed' ? 'Confirmada' : apt.status === 'pending' ? 'Pendente' : 'Cancelada'}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <button className="px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-xs font-bold hover:border-primary transition-all">
                                                Detalhes
                                            </button>
                                            <button className="size-8 flex items-center justify-center bg-gray-100 dark:bg-white/5 rounded-lg text-text-subtle hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined text-sm">more_vert</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentsPage;
