import React from 'react';

interface ProfilePageProps {
    isDarkMode: boolean;
}

const ProfilePage = ({ isDarkMode }: ProfilePageProps) => {
    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-3xl bg-cover border-4 border-white dark:border-white/10 shadow-xl overflow-hidden" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrtKeZhqdggv1wsvLq0DOybOiQ2V61oHjkC7mifSoS1wgPTqxFGcLwD0hU12IWe8h048zjzVk4KBcVXZJfD3HhIQGQE13UGkr9vgHsTHkhzkvedoTfIFr8bGoY3FLcrrND7LIzLXWN0lLbDZNZeDTLuJuyaanCdBCLujd9z48xs3Cq-5YH6vdvImklSwX-P6rcOomkyhB58u-JDr6WudVZOQDNWeOqVQaZ8SjwJ6U5UichLoW_SBmtVg_aWfw2mlD6irLV2JHlYMI')" }}>
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                <span className="material-symbols-outlined text-white">photo_camera</span>
                            </div>
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-primary text-white size-8 rounded-full border-4 border-white dark:border-dark-surface flex items-center justify-center shadow-lg">
                            <span className="material-symbols-outlined text-sm">verified</span>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">João Silva</h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Membro desde Outubro, 2023 • ID: #4429</p>
                    </div>
                </div>
                <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 px-4 py-3 rounded-2xl flex items-center gap-3">
                    <div className="bg-primary size-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined whitespace-nowrap">military_tech</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary">Programa Social</p>
                        <p className="text-sm font-black">ISENÇÃO 100% APROVADA</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Dados Pessoais */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg text-primary">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                            <h3 className="font-bold">Dados Pessoais</h3>
                        </div>
                        <button className="text-xs font-bold text-primary hover:underline">Alterar</button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">CPF</p>
                            <p className="font-medium">123.456.789-00</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">E-mail</p>
                            <p className="font-medium">joao.silva@email.com</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Telefone</p>
                            <p className="font-medium">(11) 98765-4321</p>
                        </div>
                    </div>
                </div>

                {/* Documentos */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg text-primary">
                                <span className="material-symbols-outlined">folder_shared</span>
                            </div>
                            <h3 className="font-bold">Documentos</h3>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-gray-400">description</span>
                                <span className="text-sm font-medium">Prescrição Médica</span>
                            </div>
                            <span className="material-symbols-outlined text-sm text-primary">verified</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-gray-400">badge</span>
                                <span className="text-sm font-medium">Identidade (RG/CNH)</span>
                            </div>
                            <span className="material-symbols-outlined text-sm text-primary">verified</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-gray-400">home</span>
                                <span className="text-sm font-medium">Comprovante Residência</span>
                            </div>
                            <span className="text-[10px] font-bold text-amber-500">PENDENTE</span>
                        </div>
                    </div>
                </div>

                {/* Anvisa */}
                <div className="bg-primary/5 dark:bg-[#1a2e20] p-6 rounded-2xl border border-primary/20 shadow-sm flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <span className="material-symbols-outlined">verified_user</span>
                            </div>
                            <h3 className="font-bold">Autorização Anvisa</h3>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="p-4 bg-white dark:bg-dark-surface/50 rounded-xl border border-primary/20 mb-4">
                            <p className="text-[10px] font-black text-primary uppercase mb-1">Status Oficial</p>
                            <p className="text-base font-black">ATIVA E VÁLIDA</p>
                            <p className="text-xs text-gray-500 font-medium">Vencimento: 12/2024</p>
                        </div>
                        <button className="w-full py-3 bg-primary text-white font-bold rounded-xl text-sm shadow-lg shadow-primary/20 hover:brightness-105 transition-all">Ver PDF Oficial</button>
                    </div>
                </div>

                {/* Endereços */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm col-span-1 lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg text-primary">
                                <span className="material-symbols-outlined">local_shipping</span>
                            </div>
                            <h3 className="font-bold">Endereços Salvos</h3>
                        </div>
                        <button className="text-xs font-bold text-primary hover:underline">+ Adicionar novo</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border-2 border-primary/20 relative">
                            <div className="absolute top-3 right-3">
                                <span className="bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Principal</span>
                            </div>
                            <h4 className="font-bold text-sm mb-1">Residencial</h4>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">Rua das Flores, 123 - Ap 42<br />Jardim Paulista, São Paulo - SP<br />CEP: 01415-000</p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all cursor-pointer">
                            <h4 className="font-bold text-sm mb-1">Trabalho</h4>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">Av. Brigadeiro Faria Lima, 4567<br />Itaim Bibi, São Paulo - SP<br />CEP: 04538-133</p>
                        </div>
                    </div>
                </div>

                {/* Suporte */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm relative overflow-hidden group">
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80')" }} />
                    {/* Gradient Overlay - Bottom to Top */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/70 dark:from-dark-surface dark:via-dark-surface/95 dark:to-dark-surface/70" />
                    <div className="absolute -right-8 -top-8 size-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
                    <div className="flex flex-col h-full relative z-10">
                        <div className="size-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6">
                            <span className="material-symbols-outlined text-2xl">support_agent</span>
                        </div>
                        <h3 className="text-lg font-black mb-2">Suporte ao Paciente</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-auto">Atendimento especializado 24/7 para tirar suas dúvidas sobre o tratamento.</p>
                        <button className="w-full mt-6 py-3 bg-primary text-[#0e1b12] font-black rounded-xl text-sm shadow-lg shadow-primary/20 hover:brightness-105 transition-all">Iniciar Chat Agora</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
