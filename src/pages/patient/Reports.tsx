import React, { useState } from 'react';

const PatientReportsPage = () => {
    const [humor, setHumor] = useState('BOM');
    const [painLevel, setPainLevel] = useState(2);

    return (
        <div className="space-y-8 pb-20 md:pb-0">
            <header className="flex flex-wrap justify-between items-start gap-4">
                <div className="space-y-1 py-1">
                    <p className="text-[#4e9767] text-base font-bold">Acompanhe seu tratamento e compartilhe seu progresso.</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white dark:bg-[#1a2e20] p-3 px-5 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-3 shadow-sm">
                        <span className="material-symbols-outlined text-primary">analytics</span>
                        <div>
                            <p className="text-xs text-gray-500">Adesão</p>
                            <p className="font-bold">92%</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Medicamentos Section */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">medication</span>
                                Medicamentos em Uso
                            </h3>
                        </div>
                        <div className="grid gap-4">
                            <div className="bg-white dark:bg-[#1a2e20] p-5 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-4 hover:border-primary/30 transition-colors">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-3xl">opacity</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-base">Óleo CBD Full Spectrum 10%</h4>
                                    <p className="text-sm text-gray-500">3 gotas • 2x ao dia (Manhã/Noite)</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full uppercase">Em uso</span>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-[#1a2e20] p-5 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-4 hover:border-primary/30 transition-colors">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-3xl">medical_services</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-base">Cápsula Noturna THC:CBD</h4>
                                    <p className="text-sm text-gray-500">1 cápsula • 1x ao dia (Antes de dormir)</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full uppercase">Em uso</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Diário de Sintomas Section */}
                    <section className="bg-white dark:bg-[#1a2e20] p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">mood</span>
                            Diário de Sintomas
                        </h3>
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Como está seu humor hoje?</p>
                                <div className="flex justify-between gap-2">
                                    {[
                                        { icon: '😞', label: 'PÉSSIMO' },
                                        { icon: '😐', label: 'NEUTRO' },
                                        { icon: '🙂', label: 'BOM' },
                                        { icon: '😊', label: 'ÓTIMO' }
                                    ].map((item) => (
                                        <button
                                            key={item.label}
                                            onClick={() => setHumor(item.label)}
                                            className={`flex-1 py-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${humor === item.label
                                                ? 'border-primary bg-primary/5'
                                                : 'border-gray-100 dark:border-white/5 hover:border-primary/50'
                                                }`}
                                        >
                                            <span className="text-3xl">{item.icon}</span>
                                            <span className={`text-[10px] font-bold ${humor === item.label ? 'text-primary' : 'text-gray-400'}`}>
                                                {item.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center px-1">
                                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Nível de Dor ou Desconforto</p>
                                    <span className="text-primary font-bold text-sm">Nível {painLevel}</span>
                                </div>
                                <div className="flex gap-1 h-10">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => setPainLevel(level)}
                                            className={`flex-1 rounded transition-colors ${level <= painLevel ? 'bg-primary' : 'bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase px-1">
                                    <span>Sem Dor</span>
                                    <span>Dor Moderada</span>
                                    <span>Dor Intensa</span>
                                </div>
                            </div>
                            <textarea
                                className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-sm focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                                placeholder="Observações adicionais em relação ao tratamento hoje..."
                                rows={3}
                            ></textarea>
                            <button className="w-full bg-primary text-[#0e1b12] font-black py-4 rounded-xl hover:scale-[1.01] active:scale-100 shadow-xl shadow-primary/20 transition-all">
                                Salvar Relato Diário
                            </button>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    {/* Document Upload Section */}
                    <section className="bg-white dark:bg-[#1a2e20] p-6 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm space-y-4">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">upload_file</span>
                            Compartilhar com Médico
                        </h3>
                        <div className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center gap-3 hover:border-primary/50 transition-colors cursor-pointer group">
                            <span className="material-symbols-outlined text-4xl text-gray-300 group-hover:text-primary transition-colors">cloud_upload</span>
                            <div className="space-y-1">
                                <p className="text-sm font-bold">Arraste seus documentos aqui</p>
                                <p className="text-xs text-gray-500">Exames, laudos ou receitas (PDF, JPG)</p>
                            </div>
                            <button className="mt-2 text-primary text-xs font-bold px-4 py-2 border border-primary/20 rounded-lg hover:bg-primary/5">Selecionar Arquivo</button>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Arquivos Recentes</p>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                <span className="material-symbols-outlined text-amber-500">description</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold truncate">Exame_Sangue_Jan23.pdf</p>
                                    <p className="text-[10px] text-gray-500">Enviado em 15/08</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Adjustment Section */}
                    <section className="bg-white dark:bg-[#1a2e20] p-6 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-600 dark:text-amber-500">
                                <span className="material-symbols-outlined">tune</span>
                            </div>
                            <h3 className="text-lg font-bold">Ajuste de Dose</h3>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">Sentindo que a dose não está ideal? Fale com nossa equipe técnica.</p>
                        <div className="flex flex-col gap-2">
                            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-all active:scale-[0.98]">
                                <span className="material-symbols-outlined text-sm">medication_liquid</span>
                                Solicitar Ajuste ao Médico
                            </button>
                            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-[#25D366]/20">
                                <span className="material-symbols-outlined text-sm">support_agent</span>
                                Falar com Farmacêutico
                            </button>
                        </div>
                    </section>

                    {/* Concierge Note */}
                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 relative overflow-hidden">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-primary" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD80dArObbYpuXgVgJ8NNJ7sYtznk2tjUDomJsAvfvtiM4vNnQMVbEkd0bYqCrSGFsH_JTgANLQO7YIw0Nfh_1MsGQtU8iZtBt5fNeOs5uvVGr3TK8QEGwzl9dUeK4RW_0_A287HMttjG1ZNMh7ts4qohYVfZTD0qjTdnVa9QWGSXQJDPnFC3uFlI3K1eO3b4T-gqUZ3FNvutAjaDM5W90uNEa-grRuYGvoguFLn07zYHQh9c_tS8ADOvNbNT2ky4AFaSgoMbrmnTg')" }}></div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div>
                                <p className="font-bold text-sm">Dra. Letícia</p>
                                <p className="text-[10px] text-[#4e9767] font-black uppercase tracking-wider">Sua Concierge</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed italic relative z-10">
                            "Estou acompanhando seus relatos. Se os sintomas de dor persistirem acima do nível 5, por favor, me avise imediatamente."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientReportsPage;
