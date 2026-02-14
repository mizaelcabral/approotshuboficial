import { User } from '../../types';

const ProfilePage = ({ user }: { user: User }) => {
    return (
        <div className="max-w-4xl space-y-8 pb-12">
            {/* Institution Header */}
            <div className="bg-white dark:bg-dark-surface p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm flex flex-col md:flex-row items-center gap-8">
                <div className="relative group">
                    <div className="size-32 rounded-3xl bg-primary/10 border-2 border-primary/20 overflow-hidden flex items-center justify-center">
                        <span className="material-symbols-outlined text-6xl text-primary font-bold">domain</span>
                    </div>
                    <button className="absolute -right-2 -bottom-2 size-10 bg-primary text-background-dark rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all font-black">
                        <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                </div>

                <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                        <h2 className="text-3xl font-black">Clínica Bem Estar</h2>
                        <span className="w-fit mx-auto md:mx-0 px-3 py-1 bg-green-500/10 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-green-500/20">Instituição Verificada</span>
                    </div>
                    <p className="text-text-subtle font-medium mb-6">Unidade Matriz • São Paulo, SP • CNPJ 00.000.000/0001-00</p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                            <span className="material-symbols-outlined text-sm text-primary">mail</span>
                            <span className="text-xs font-bold text-text-subtle">contato@bemestar.com</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                            <span className="material-symbols-outlined text-sm text-primary">phone</span>
                            <span className="text-xs font-bold text-text-subtle">(11) 3333-4444</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Clinic Settings */}
                <div className="space-y-6">
                    <h3 className="text-lg font-black px-2 uppercase tracking-wide">Gestão da Unidade</h3>
                    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
                        {/* Public Link Section */}
                        <div className="p-5 bg-primary/5 border-b border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="material-symbols-outlined text-primary">link</span>
                                <p className="text-sm font-bold">Link de Cadastro Público</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex-1 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-[10px] font-mono text-text-subtle truncate flex items-center">
                                    {window.location.origin}/{user.slug || user.name.toLowerCase().replace(/\s+/g, '-')}
                                </div>
                                <button
                                    onClick={() => {
                                        const slug = user.slug || user.name.toLowerCase().replace(/\s+/g, '-');
                                        const url = `${window.location.origin}/${slug}`;
                                        navigator.clipboard.writeText(url);
                                        alert('Link copiado!');
                                    }}
                                    className="px-3 py-2 bg-primary text-background-dark rounded-lg text-[10px] font-black uppercase tracking-wider hover:brightness-110"
                                >
                                    Copiar
                                </button>
                            </div>
                            <p className="mt-3 text-[10px] text-text-subtle leading-relaxed">
                                Compartilhe este link com seus pacientes para que eles se cadastrem diretamente vinculados à sua clínica.
                            </p>
                        </div>
                        <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-left group">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-500">
                                    <span className="material-symbols-outlined">badge</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Dados Cadastrais</p>
                                    <p className="text-[11px] text-text-subtle">CNPJ, Endereço e Razão Social</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-all">chevron_right</span>
                        </button>
                        <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-left group border-t border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-purple-50 dark:bg-purple-900/10 flex items-center justify-center text-purple-500">
                                    <span className="material-symbols-outlined">group</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Colaboradores</p>
                                    <p className="text-[11px] text-text-subtle">Gerenciar acessos da equipe</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-all">chevron_right</span>
                        </button>
                        <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-left group border-t border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">settings</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Preferências</p>
                                    <p className="text-[11px] text-text-subtle">Notificações e regras de repasse</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-all">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* Integration & Security */}
                <div className="space-y-6">
                    <h3 className="text-lg font-black px-2 uppercase tracking-wide">Segurança e API</h3>
                    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
                        <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-left group">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-amber-50 dark:bg-amber-900/10 flex items-center justify-center text-amber-500">
                                    <span className="material-symbols-outlined">key</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Chaves de API</p>
                                    <p className="text-[11px] text-text-subtle">Integração com sistemas externos</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-all">chevron_right</span>
                        </button>
                        <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-left group border-t border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-red-50 dark:bg-red-900/10 flex items-center justify-center text-red-500">
                                    <span className="material-symbols-outlined">shield_lock</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Segurança da Conta</p>
                                    <p className="text-[11px] text-text-subtle">Autenticação em dois fatores</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-all">chevron_right</span>
                        </button>
                        <div className="p-5 bg-gray-50 dark:bg-white/[0.02] border-t border-gray-100 dark:border-white/5">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-black uppercase tracking-widest text-text-subtle">Limite de Armazenamento</span>
                                <span className="text-xs font-black text-primary">12% utilizado</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: '12%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
