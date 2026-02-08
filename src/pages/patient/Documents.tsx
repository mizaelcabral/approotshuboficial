import React from 'react';

interface DocumentsPageProps {
    activeSubPage?: 'documents' | 'anvisa';
}

const DocumentsPage = ({ activeSubPage = 'documents' }: DocumentsPageProps) => {
    return (
        <div className="space-y-8 pb-20 md:pb-0">
            <header className="flex flex-wrap justify-between items-start gap-4">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black tracking-tight dark:text-white">
                        {activeSubPage === 'anvisa' ? 'Autorização ANVISA' : 'Meus Arquivos Médicos'}
                    </h2>
                    <p className="text-[#4e9767] text-base">
                        {activeSubPage === 'anvisa' ? 'Gerencie suas autorizações especiais para importação.' : 'Gerencie todos os seus documentos, laudos e receitas em um só lugar.'}
                    </p>
                </div>
                {activeSubPage === 'documents' && (
                    <button className="bg-primary hover:bg-primary-dark text-[#0e1b12] font-black py-3 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined">upload_file</span>
                        <span>Adicionar Documento</span>
                    </button>
                )}
            </header>

            {activeSubPage === 'anvisa' ? (
                <div className="bg-white dark:bg-[#1a2e20] p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm text-center space-y-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                        <span className="material-symbols-outlined text-4xl">verified_user</span>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold">Autorização ANVISA Ativa</h3>
                        <p className="text-gray-500 text-sm max-w-md mx-auto">Sua autorização para importação de produtos derivados de Cannabis está válida e vinculada ao seu CPF.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto pt-4">
                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-left">
                            <p className="text-[10px] font-black text-gray-400 uppercase">Validade</p>
                            <p className="font-bold">15/12/2024</p>
                        </div>
                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-left">
                            <p className="text-[10px] font-black text-gray-400 uppercase">Status</p>
                            <p className="text-green-500 font-bold">AUTORIZADO</p>
                        </div>
                    </div>
                    <button className="bg-primary text-[#0e1b12] font-black px-8 py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                        Baixar PDF Oficial
                    </button>
                </div>
            ) : (
                <>
                    {/* Statistics Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-[#1a2e20] p-5 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="size-10 bg-blue-50 dark:bg-blue-900/10 rounded-lg flex items-center justify-center text-blue-500">
                                    <span className="material-symbols-outlined text-xl">folder</span>
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-blue-500">12</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Total</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-[#1a2e20] p-5 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="size-10 bg-green-50 dark:bg-green-900/10 rounded-lg flex items-center justify-center text-green-500">
                                    <span className="material-symbols-outlined text-xl">description</span>
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-green-500">5</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Laudos</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-[#1a2e20] p-5 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-xl">medication</span>
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-primary">4</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Receitas</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-[#1a2e20] p-5 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="size-10 bg-amber-50 dark:bg-amber-900/10 rounded-lg flex items-center justify-center text-amber-500">
                                    <span className="material-symbols-outlined text-xl">assignment</span>
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-amber-500">3</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Termos</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Documents Grid */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-black">Documentos Recentes</h3>
                            <button className="text-xs font-black text-primary uppercase hover:underline">Ver Todos</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { title: 'Laudo Médico Atualizado', date: '15 Out, 2023', icon: 'description', color: 'text-blue-500', size: '1.2 MB' },
                                { title: 'Receituário Digital B', date: '02 Set, 2023', icon: 'medication', color: 'text-primary', size: '1.2 MB' },
                                { title: 'Termo de Consentimento', date: '20 Jan, 2023', icon: 'assignment', color: 'text-amber-500', size: '1.2 MB' },
                                { title: 'Exame de Sangue Completo', date: '28 Ago, 2023', icon: 'biotech', color: 'text-purple-500', size: '2.4 MB' },
                                { title: 'Prescrição Médica Inicial', date: '10 Jul, 2023', icon: 'prescription', color: 'text-green-500', size: '980 KB' },
                                { title: 'Autorização de Tratamento', date: '05 Jun, 2023', icon: 'verified', color: 'text-indigo-500', size: '1.5 MB' },
                            ].map((doc, i) => (
                                <div key={i} className="bg-white dark:bg-[#1a2e20] p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:border-primary/30 transition-all cursor-pointer group">
                                    <div className={`p-3 rounded-xl bg-gray-50 dark:bg-white/5 w-fit mb-4 ${doc.color}`}>
                                        <span className="material-symbols-outlined">{doc.icon}</span>
                                    </div>
                                    <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">{doc.title}</h4>
                                    <p className="text-xs text-gray-500">Emitido em {doc.date}</p>
                                    <div className="mt-6 flex justify-between items-center">
                                        <span className="text-[10px] font-black text-gray-400 uppercase">PDF • {doc.size}</span>
                                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">download</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity Timeline */}
                    <div className="bg-white dark:bg-[#1a2e20] p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <h3 className="text-lg font-black mb-6">Atividade Recente</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="size-8 bg-blue-50 dark:bg-blue-900/10 rounded-full flex items-center justify-center text-blue-500 flex-shrink-0">
                                        <span className="material-symbols-outlined text-sm">upload</span>
                                    </div>
                                    <div className="w-0.5 h-full bg-gray-200 dark:bg-white/10 mt-2"></div>
                                </div>
                                <div className="flex-1 pb-4">
                                    <p className="font-bold text-sm">Laudo Médico Enviado</p>
                                    <p className="text-xs text-gray-500 font-medium">Há 2 dias • Dr. Carlos Mendes</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                                        <span className="material-symbols-outlined text-sm">check_circle</span>
                                    </div>
                                    <div className="w-0.5 h-full bg-gray-200 dark:bg-white/10 mt-2"></div>
                                </div>
                                <div className="flex-1 pb-4">
                                    <p className="font-bold text-sm">Receita Aprovada</p>
                                    <p className="text-xs text-gray-500 font-medium">Há 5 dias • Sistema Rootcare</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="size-8 bg-amber-50 dark:bg-amber-900/10 rounded-full flex items-center justify-center text-amber-500 flex-shrink-0">
                                        <span className="material-symbols-outlined text-sm">download</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-sm">Termo Baixado</p>
                                    <p className="text-xs text-gray-500 font-medium">Há 1 semana • Você</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default DocumentsPage;
