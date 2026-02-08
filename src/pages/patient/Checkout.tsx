import React from 'react';

interface CheckoutPageProps {
    total: number;
    onComplete: () => void;
    onBack: () => void;
}

const CheckoutPage = ({ total, onComplete, onBack }: CheckoutPageProps) => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
            <header className="flex items-center gap-2 text-sm text-gray-500">
                <button onClick={onBack} className="hover:text-primary transition-colors">Carrinho</button>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-primary font-semibold">Checkout</span>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-black">Endereço de Entrega</h3>
                            <button className="text-primary text-xs font-bold uppercase hover:underline">Alterar</button>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-primary/20 flex gap-4">
                            <span className="material-symbols-outlined text-primary">location_on</span>
                            <div>
                                <p className="font-bold text-sm">Rua das Amendoeiras, 452</p>
                                <p className="text-xs text-gray-500">Jardim Botânico • Rio de Janeiro, RJ</p>
                                <p className="text-xs text-gray-500">CEP: 22461-122</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <h3 className="text-xl font-black mb-6">Forma de Pagamento</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <button className="p-4 border-2 border-primary bg-primary/5 rounded-xl flex flex-col items-center gap-2">
                                <span className="material-symbols-outlined text-primary">credit_card</span>
                                <span className="text-[10px] font-bold">Cartão</span>
                            </button>
                            <button className="p-4 border border-gray-100 dark:border-white/10 rounded-xl flex flex-col items-center gap-2 group hover:border-primary/50 transition-colors">
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">qr_code_2</span>
                                <span className="text-[10px] font-bold">Pix</span>
                            </button>
                            <button className="p-4 border border-gray-100 dark:border-white/10 rounded-xl flex flex-col items-center gap-2 group hover:border-primary/50 transition-colors">
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">description</span>
                                <span className="text-[10px] font-bold">Boleto</span>
                            </button>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Número do Cartão</label>
                                <input className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 outline-none font-bold text-sm focus:ring-1 focus:ring-primary/30" placeholder="0000 0000 0000 0000" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Validade</label>
                                    <input className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 outline-none font-bold text-sm focus:ring-1 focus:ring-primary/30" placeholder="MM/AA" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">CVV</label>
                                    <input className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 outline-none font-bold text-sm focus:ring-1 focus:ring-primary/30" placeholder="123" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5">
                    <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 sticky top-24 shadow-lg shadow-gray-200/50">
                        <h3 className="text-lg font-black mb-6">Confirmar Pedido</h3>
                        <div className="space-y-3 pb-6 border-b border-gray-100 dark:border-white/10 mb-6">
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Itens</span>
                                <span className="font-bold text-gray-900 dark:text-white">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Entrega Expressa</span>
                                <span className="font-bold text-green-500 uppercase">Grátis</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-baseline mb-8">
                            <span className="text-xl font-black">Total</span>
                            <span className="text-4xl font-black text-primary">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                        <button
                            onClick={onComplete}
                            className="w-full bg-primary text-[#0e1b12] font-black py-5 rounded-xl shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] transition-all active:scale-100 font-display"
                        >
                            Pagar Agora
                            <span className="material-symbols-outlined">lock</span>
                        </button>
                        <p className="text-[10px] text-gray-400 text-center mt-4 uppercase font-bold tracking-wider">Transação Segura • Rootcare Pay</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
