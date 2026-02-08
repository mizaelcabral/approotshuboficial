import React, { useState } from 'react';

const AddressesPage = () => {
    const [preferences, setPreferences] = useState({
        doorman: true,
        callOnArrival: false,
        discrete: true
    });

    return (
        <div className="space-y-10">
            {/* Endereços Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-black tracking-tight">Meus Endereços</h3>
                        <p className="text-gray-500 text-sm">Gerencie seus endereços de entrega e faturamento.</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-[#0e1b12] font-bold rounded-xl hover:scale-[1.02] transition-all shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-xl">add</span>
                        Novo Endereço
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative p-6 bg-white dark:bg-[#1a2e20] rounded-2xl border-2 border-primary shadow-sm">
                        <span className="absolute top-0 right-0 bg-primary text-[#0e1b12] text-[10px] font-black px-3 py-1 rounded-bl-lg uppercase">Padrão</span>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <span className="material-symbols-outlined">home</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-primary text-sm uppercase tracking-wider">Casa</h4>
                                <p className="font-bold text-lg mt-1 dark:text-white">Rua das Flores, 123 - Apto 42</p>
                                <p className="text-gray-500 text-sm">Jardim Botânico, Curitiba - PR</p>
                                <p className="text-gray-500 text-sm">CEP: 80210-000</p>
                            </div>
                        </div>
                        <div className="flex gap-4 pt-2">
                            <button className="text-primary text-sm font-bold hover:underline">Editar</button>
                            <button className="text-gray-400 text-sm font-bold hover:underline">Remover</button>
                        </div>
                    </div>
                    <div className="p-6 bg-white dark:bg-[#1a2e20] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:border-primary/30 transition-colors group cursor-pointer">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-lg text-gray-400 group-hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">work</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-400 text-sm uppercase tracking-wider group-hover:text-primary transition-colors">Trabalho</h4>
                                <p className="font-bold text-lg mt-1 dark:text-white">Av. Sete de Setembro, 4500</p>
                                <p className="text-gray-500 text-sm">Batel, Curitiba - PR</p>
                                <p className="text-gray-500 text-sm">CEP: 80240-000</p>
                            </div>
                        </div>
                        <div className="flex gap-4 pt-2">
                            <button className="text-primary text-sm font-bold hover:underline">Editar</button>
                            <button className="text-gray-400 text-sm font-bold hover:underline">Remover</button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Dicas de Transporte */}
                <section className="space-y-6">
                    <div>
                        <h3 className="text-2xl font-black tracking-tight">Dicas de Transporte</h3>
                        <p className="text-gray-500 text-sm">Orientações para viagens seguras com seu medicamento.</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-[#1a2e20] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <span className="material-symbols-outlined">thermostat</span>
                            </div>
                            <div>
                                <p className="font-bold text-sm dark:text-white">Controle de Temperatura</p>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">Mantenha óleos e extratos em locais frescos, longe da luz solar direta e de fontes de calor excessivo para preservar os fitocanabinoides.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <span className="material-symbols-outlined">package_2</span>
                            </div>
                            <div>
                                <p className="font-bold text-sm dark:text-white">Embalagem Original</p>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">Sempre transporte o medicamento em seu frasco original, acompanhado do rótulo de prescrição e sua ID Digital Rootcare.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <span className="material-symbols-outlined">flight_takeoff</span>
                            </div>
                            <div>
                                <p className="font-bold text-sm dark:text-white">Viagens Aéreas</p>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">Em voos nacionais, leve sempre a receita médica original física ou digital. Verifique as regras para voos internacionais.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Suporte com Envios */}
                <section className="space-y-6 flex flex-col">
                    <div>
                        <h3 className="text-2xl font-black tracking-tight">Suporte com Envios</h3>
                        <p className="text-gray-500 text-sm">Problemas com sua entrega? Estamos aqui para ajudar.</p>
                    </div>
                    <div className="flex-1 p-6 bg-white dark:bg-[#1a2e20] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-amber-100 dark:bg-amber-500/10 rounded-lg text-amber-600 dark:text-amber-500">
                                    <span className="material-symbols-outlined">pending_actions</span>
                                </div>
                                <div>
                                    <p className="font-bold text-sm dark:text-white">Atrasos na Entrega</p>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">Se o seu pedido excedeu o prazo previsto em mais de 48h, acione nosso time de logística imediatamente.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-red-100 dark:bg-red-500/10 rounded-lg text-red-600 dark:text-red-500">
                                    <span className="material-symbols-outlined">report</span>
                                </div>
                                <div>
                                    <p className="font-bold text-sm dark:text-white">Avaria ou Erro</p>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">Ao notar lacres rompidos ou itens incorretos, tire uma foto e entre em contato antes de consumir o produto.</p>
                                </div>
                            </div>
                        </div>
                        <button className="mt-8 flex items-center justify-center gap-2 w-full py-4 bg-primary text-[#0e1b12] font-black rounded-xl hover:opacity-90 transition-all shadow-xl shadow-primary/20">
                            <span className="material-symbols-outlined">support_agent</span>
                            Falar com Suporte
                        </button>
                    </div>
                </section>
            </div>

            {/* Preferências de Entrega */}
            <section className="space-y-6">
                <div>
                    <h3 className="text-2xl font-black tracking-tight">Preferências de Entrega</h3>
                    <p className="text-gray-500 text-sm">Personalize como você deseja receber seus produtos.</p>
                </div>
                <div className="bg-white dark:bg-[#1a2e20] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm divide-y divide-gray-100 dark:divide-white/5">
                    <div className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-xl flex items-center justify-center text-gray-500">
                                <span className="material-symbols-outlined">apartment</span>
                            </div>
                            <div>
                                <p className="font-bold dark:text-white">Deixar na portaria</p>
                                <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Autorizar recebimento por terceiros</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setPreferences(p => ({ ...p, doorman: !p.doorman }))}
                            className={`w-12 h-6 rounded-full transition-all relative ${preferences.doorman ? 'bg-primary' : 'bg-gray-200 dark:bg-white/10'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${preferences.doorman ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-xl flex items-center justify-center text-gray-500">
                                <span className="material-symbols-outlined">phone_in_talk</span>
                            </div>
                            <div>
                                <p className="font-bold dark:text-white">Ligar ao chegar</p>
                                <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider">O entregador deve contatar por voz</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setPreferences(p => ({ ...p, callOnArrival: !p.callOnArrival }))}
                            className={`w-12 h-6 rounded-full transition-all relative ${preferences.callOnArrival ? 'bg-primary' : 'bg-gray-200 dark:bg-white/10'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${preferences.callOnArrival ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-xl flex items-center justify-center text-gray-500">
                                <span className="material-symbols-outlined">eco</span>
                            </div>
                            <div>
                                <p className="font-bold dark:text-white">Embalagem Discreta</p>
                                <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Remover logos externas da Rootcare</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setPreferences(p => ({ ...p, discrete: !p.discrete }))}
                            className={`w-12 h-6 rounded-full transition-all relative ${preferences.discrete ? 'bg-primary' : 'bg-gray-200 dark:bg-white/10'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${preferences.discrete ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AddressesPage;
