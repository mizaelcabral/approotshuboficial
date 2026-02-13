import React, { useState } from 'react';
import { useDoctors } from '../../hooks/useDoctors';

interface DoctorsPageProps {
    institutionId: string;
}

const DoctorsPage: React.FC<DoctorsPageProps> = ({ institutionId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { doctors: dbDoctors, loading } = useDoctors(institutionId);

    const mockDoctors = [
        { id: '1', name: 'Dr. Carlos Silva', specialty: 'Neurologia', patients: 24, rating: 4.9, status: 'active', email: 'carlos.silva@email.com' },
    ];

    const doctors = dbDoctors.length > 0 ? dbDoctors : mockDoctors;

    const filteredDoctors = doctors.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-8 text-center font-bold">Carregando corpo clínico...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">search</span>
                    <input
                        type="text"
                        placeholder="Buscar médico..."
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doc) => (
                    <div key={doc.id} className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:border-primary/30 transition-all group">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="size-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                                <span className="material-symbols-outlined text-3xl text-primary font-bold">medical_services</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg leading-tight">{doc.name}</h3>
                                <p className="text-xs font-bold text-primary uppercase tracking-widest mt-1">{(doc as any).specialty || (doc as any).specialization}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                                <p className="text-[10px] font-black uppercase text-text-subtle mb-1">Pacientes</p>
                                <p className="text-lg font-black">{doc.patients}</p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                                <p className="text-[10px] font-black uppercase text-text-subtle mb-1">Avaliação</p>
                                <div className="flex items-center gap-1">
                                    <p className="text-lg font-black">{doc.rating}</p>
                                    <span className="material-symbols-outlined text-xs text-amber-500 fill-current">star</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-2">
                                <div className="size-2 rounded-full bg-green-500"></div>
                                <span className="text-[10px] font-black uppercase text-green-600">Disponível</span>
                            </div>
                            <button className="text-xs font-black uppercase text-primary hover:underline transition-all">Ver Detalhes</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsPage;
