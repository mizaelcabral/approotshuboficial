import React from 'react';
import { Institution } from '../../types';

interface AdminDashboardPageProps {
    stats: { label: string; value: string; icon: string; color: string }[];
    institutions: Institution[];
    onViewInstitutions: () => void;
}

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ stats, institutions, onViewInstitutions }) => {
    return (
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
                    <button onClick={onViewInstitutions} className="text-sm font-bold text-primary hover:underline">Ver Todas</button>
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
    );
};

export default AdminDashboardPage;
