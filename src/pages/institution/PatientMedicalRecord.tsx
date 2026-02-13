import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PatientMedicalRecordProps {
    patientId: string;
    onBack: () => void;
}

const PatientMedicalRecord: React.FC<PatientMedicalRecordProps> = ({ patientId, onBack }) => {
    // Mock for now, should use supabase join with reports and docs
    const history = [
        { date: '10/02/2024', type: 'Relatório Semanal', status: 'Revisado', content: 'Paciente apresenta melhora no sono e redução de espasmos.' },
        { date: '01/02/2024', type: 'Consulta Inicial', status: 'Concluído', content: 'Diagnóstico de dor crônica. Prescrição de CBD Full Spectrum.' },
    ];

    const documents = [
        { name: 'Receituário_Digital.pdf', type: 'Prescription', date: '01/02/2024' },
        { name: 'Exame_Sangue_Jan.pdf', type: 'Exam', date: '15/01/2024' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <div>
                    <h2 className="text-2xl font-black tracking-tight">Prontuário Digital</h2>
                    <p className="text-xs text-text-subtle font-black uppercase tracking-widest mt-1">ID: {patientId}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Timeline */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8">
                        <h3 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">history</span>
                            Linha do Tempo Clínica
                        </h3>

                        <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-gray-100 dark:before:bg-white/10">
                            {history.map((item, i) => (
                                <div key={i} className="relative pl-12">
                                    <div className="absolute left-0 top-1 size-8 rounded-full bg-primary/10 border-4 border-background-dark flex items-center justify-center z-10">
                                        <div className="size-2 rounded-full bg-primary" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-black uppercase tracking-widest text-primary">{item.type}</p>
                                            <p className="text-[10px] font-black uppercase text-text-subtle">{item.date}</p>
                                        </div>
                                        <p className="text-sm font-bold text-text-main dark:text-gray-200">{item.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Documents & Details */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8">
                        <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">folder_open</span>
                            Documentação ANVISA
                        </h3>

                        <div className="space-y-4">
                            {documents.map((doc, i) => (
                                <div key={i} className="p-4 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-2xl flex items-center justify-between group hover:border-primary/30 transition-all cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary text-xl">description</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold leading-tight">{doc.name}</p>
                                            <p className="text-[10px] font-black uppercase text-text-subtle mt-1">{doc.date}</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-text-subtle dark:text-white/10 group-hover:text-primary transition-all">download</span>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-6 py-4 border border-dashed border-gray-100 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text-subtle hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-lg">upload_file</span>
                            Anexar Novo Documento
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientMedicalRecord;
