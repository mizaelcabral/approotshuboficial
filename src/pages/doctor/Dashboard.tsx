import React from 'react';
import { Appointment } from '../../types';

interface DoctorDashboardPageProps {
    stats: { label: string; value: string | number; icon: string; color: string }[];
    appointments: Appointment[];
    onViewAppointments: () => void;
    onReviewReports: () => void;
}

const DoctorDashboardPage: React.FC<DoctorDashboardPageProps> = ({ stats, appointments, onViewAppointments, onReviewReports }) => {
    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
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
                            <button onClick={onViewAppointments} className="text-xs font-black uppercase text-primary hover:underline">Ver Agenda Completa</button>
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
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${apt.status === 'confirmed' ? 'bg-green-500/10 text-green-600' : 'bg-amber-500/10 text-amber-600'}`}>
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
                            <button onClick={onReviewReports} className="w-full flex items-center gap-3 p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl font-bold text-sm hover:border-primary transition-all">
                                <span className="material-symbols-outlined text-primary">description</span>
                                Revisar Relatórios
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorDashboardPage;
