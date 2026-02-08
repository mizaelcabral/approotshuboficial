import React from 'react';
import { Patient } from '../../types';

interface InstitutionDashboardPageProps {
    stats: { label: string; value: string | number; icon: string; color: string }[];
    patients: Patient[];
    onManageList: () => void;
}

const InstitutionDashboardPage: React.FC<InstitutionDashboardPageProps> = ({ stats, patients, onManageList }) => {
    return (
        <div className="space-y-8">
            {/* Stats Grid */}
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

            {/* Premium Table Content */}
            <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-white dark:bg-white/[0.02]">
                    <div>
                        <h3 className="font-bold text-lg">Últimos Pacientes</h3>
                        <p className="text-xs text-text-subtle font-bold uppercase tracking-widest mt-1">Atualizado em tempo real</p>
                    </div>
                    <button onClick={onManageList} className="text-xs font-black uppercase text-primary hover:underline">Gerenciar Lista</button>
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
    );
};

export default InstitutionDashboardPage;
