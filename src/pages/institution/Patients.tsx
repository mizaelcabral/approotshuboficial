import React, { useState } from 'react';
import { usePatients } from '../../hooks/usePatients';

interface PatientsPageProps {
    institutionId: string;
    onViewRecord: (id: string) => void;
}

const PatientsPage: React.FC<PatientsPageProps> = ({ institutionId, onViewRecord }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { patients: dbPatients, loading } = usePatients('institution', institutionId);

    const mockPatients = [
        { id: '1', name: 'João Silva', email: 'joao@email.com', phone: '(11) 98765-4321', doctor: 'Dr. Carlos Silva', status: 'active', registrationDate: '15/01/2024' },
    ];

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
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-text-subtle">Médico Responsável</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-text-subtle">Contato</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-text-subtle">Data Cadastro</th>
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
                                                <p className="font-bold text-sm">{patient.name}</p>
                                                <p className="text-[10px] text-text-subtle">{patient.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm font-bold">
                                            <span className="material-symbols-outlined text-sm text-primary">medical_services</span>
                                            {(patient as any).doctor || 'Não atribuído'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-text-subtle">{patient.phone}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-text-subtle">{patient.registrationDate}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => onViewRecord(patient.id)}
                                            className="p-2 hover:bg-primary/10 rounded-lg text-text-subtle hover:text-primary transition-all"
                                        >
                                            <span className="material-symbols-outlined text-xl">visibility</span>
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
