import React from 'react';
import { CartItem } from '../../types';

interface CartPageProps {
    items: CartItem[];
    onUpdateQuantity: (name: string, delta: number) => void;
    onCheckout: () => void;
    onBack: () => void;
}

const CartPage = ({ items, onUpdateQuantity, onCheckout, onBack }: CartPageProps) => {
    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-300">
                <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-4xl text-gray-300">shopping_cart_off</span>
                </div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Seu carrinho está vazio</h2>
                <p className="text-gray-500 mb-8">Parece que você ainda não adicionou nenhum tratamento.</p>
                <button
                    onClick={onBack}
                    className="bg-primary text-[#0e1b12] font-black px-8 py-4 rounded-xl shadow-lg shadow-primary/20"
                >
                    Voltar para Loja
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            <header className="flex items-center gap-2 text-sm text-gray-500">
                <button onClick={onBack} className="hover:text-primary transition-colors">Farmácia</button>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-primary font-semibold">Meu Carrinho</span>
            </header>

            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Meu Carrinho</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-4">
                    {items.map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-dark-surface p-4 rounded-2xl border border-gray-100 dark:border-white/10 flex items-center gap-6">
                            <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-xl p-2 flex items-center justify-center">
                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.category}</span>
                                <h3 className="text-lg font-black text-gray-900 dark:text-white truncate">{item.name}</h3>
                                <div className="text-primary font-black mt-1">R$ {item.priceString}</div>
                            </div>
                            <div className="flex items-center bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 p-1">
                                <button
                                    onClick={() => onUpdateQuantity(item.name, -1)}
                                    className="p-2 text-gray-400 hover:text-primary"
                                >
                                    <span className="material-symbols-outlined text-sm font-bold">remove</span>
                                </button>
                                <span className="px-3 font-bold w-8 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => onUpdateQuantity(item.name, 1)}
                                    className="p-2 text-gray-400 hover:text-primary"
                                >
                                    <span className="material-symbols-outlined text-sm font-bold">add</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-xl shadow-gray-200/50">
                        <h3 className="text-lg font-black mb-6">Resumo do Pedido</h3>
                        <div className="space-y-4 text-sm font-bold text-gray-500">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="text-gray-900 dark:text-white text-base">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Frete</span>
                                <span className="text-green-500 uppercase">Grátis</span>
                            </div>
                            <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex justify-between items-baseline">
                                <span className="text-gray-900 dark:text-white text-lg">Total</span>
                                <span className="text-3xl font-black text-primary">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                        <button
                            onClick={onCheckout}
                            className="w-full bg-primary text-[#0e1b12] font-black py-4 rounded-xl mt-8 shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:bg-primary/90 transition-all font-display"
                        >
                            Finalizar Compra
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
