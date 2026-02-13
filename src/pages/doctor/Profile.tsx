import React from 'react';

const ProfilePage = () => {
    return (
        <div className="max-w-4xl space-y-8">
            {/* Profile Header */}
            <div className="bg-white dark:bg-dark-surface p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm flex flex-col md:flex-row items-center gap-8">
                <div className="relative group">
                    <div className="size-32 rounded-3xl bg-primary/10 border-2 border-primary/20 overflow-hidden">
                        <img src="/images/doctor-green.png" className="w-full h-full object-cover" alt="Profile" />
                    </div>
                    <button className="absolute -right-2 -bottom-2 size-10 bg-primary text-background-dark rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                        <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                </div>

                <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                        <h2 className="text-3xl font-black">Dr. Carlos Silva</h2>
                        <span className="w-fit mx-auto md:mx-0 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg border border-primary/20">Médico Especialista</span>
                    </div>
                    <p className="text-text-subtle font-medium mb-6">CRM-PR 123456 • Neurologia • Medicina Canábica</p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                            <span className="material-symbols-outlined text-sm text-primary">mail</span>
                            <span className="text-xs font-bold text-text-subtle">medico@rootcare.com</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                            <span className="material-symbols-outlined text-sm text-primary">phone</span>
                            <span className="text-xs font-bold text-text-subtle">(41) 99999-9999</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
                {/* Account Settings */}
                <div className="space-y-6">
                    <h3 className="text-lg font-black px-2 uppercase tracking-wide">Configurações de Conta</h3>
                    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
                        <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-left group">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-500">
                                    <span className="material-symbols-outlined">person</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Informações Pessoais</p>
                                    <p className="text-[11px] text-text-subtle">Nome, CRM, Bio e Avatar</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-all">chevron_right</span>
                        </button>
                        <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-left group border-t border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-amber-50 dark:bg-amber-900/10 flex items-center justify-center text-amber-500">
                                    <span className="material-symbols-outlined">shield_lock</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Segurança</p>
                                    <p className="text-[11px] text-text-subtle">Trocar senha e 2 fatores</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-all">chevron_right</span>
                        </button>
                        <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-left group border-t border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">notifications</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Notificações</p>
                                    <p className="text-[11px] text-text-subtle">Alertas de pacientes e consultas</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-all">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* Professional Settings */}
                <div className="space-y-6">
                    <h3 className="text-lg font-black px-2 uppercase tracking-wide">Prática Médica</h3>
                    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
                        <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-left group">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-purple-50 dark:bg-purple-900/10 flex items-center justify-center text-purple-500">
                                    <span className="material-symbols-outlined">schedule</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Minha Agenda</p>
                                    <p className="text-[11px] text-text-subtle">Horários de atendimento e pausas</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-all">chevron_right</span>
                        </button>
                        <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-left group border-t border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center text-emerald-500">
                                    <span className="material-symbols-outlined">clinical_notes</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Modelos de Prescrição</p>
                                    <p className="text-[11px] text-text-subtle">Gerenciar textos padronizados</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-all">chevron_right</span>
                        </button>
                        <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-left group border-t border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-orange-50 dark:bg-orange-900/10 flex items-center justify-center text-orange-500">
                                    <span className="material-symbols-outlined">payments</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Financeiro</p>
                                    <p className="text-[11px] text-text-subtle">Retiradas e faturamento</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-all">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
