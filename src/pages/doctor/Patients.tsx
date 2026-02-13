import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePatients } from '../../hooks/usePatients';

interface PatientsPageProps {
    doctorId: string;
}

const PatientsPage: React.FC<PatientsPageProps> = ({ doctorId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { patients: dbPatients, loading } = usePatients('doctor', doctorId);

    const mockPatients = [
        { id: '1', name: 'João Silva', email: 'joao.silva@email.com', phone: '(11) 98765-4321', doctor: 'Dr. Carlos Silva', status: 'active', registrationDate: '15/01/2024', medicalRecord: 'REC-001', treatment: 'CBD Oil 10%' },
        { id: '2', name: 'Maria Santos', email: 'maria.santos@email.com', phone: '(11) 98765-4322', doctor: 'Dra. Ana Oliveira', status: 'active', registrationDate: '20/01/2024', medicalRecord: 'REC-002', treatment: 'Gummies Relax' },
    ];

    // Combine for now, or just use DB
    const patients = dbPatients.length > 0 ? dbPatients : mockPatients;

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-8 text-center font-bold">Carregando pacientes...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">search</span>
                    <input
                        type="text"
                        placeholder="Buscar paciente..."
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/10">
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-text-subtle">Paciente</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-text-subtle">Tratamento</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-text-subtle">Última Consulta</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-text-subtle">Status</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-text-subtle text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="border-b border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs uppercase">
                                                {patient.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm tracking-tight">{patient.name}</p>
                                                <p className="text-[10px] text-text-subtle font-medium">{patient.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">{(patient as any).treatment || 'Consulta Inicial'}</span>
                                            <span className="text-[10px] text-text-subtle font-black uppercase tracking-tighter">{(patient as any).medicalRecord || 'S/N'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-text-main dark:text-gray-300">{(patient as any).lastConsult || patient.registrationDate}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${patient.status === 'active' ? 'bg-green-500/10 text-green-600' :
                                                patient.status === 'pending' ? 'bg-amber-500/10 text-amber-600' :
                                                    'bg-gray-500/10 text-gray-500'
                                            }`}>
                                            {patient.status === 'active' ? 'Ativo' : patient.status === 'pending' ? 'Pendente' : 'Inativo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-primary/10 rounded-lg text-text-subtle hover:text-primary transition-all">
                                            <span className="material-symbols-outlined text-xl">more_vert</span>
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

export default PatientsPage;
