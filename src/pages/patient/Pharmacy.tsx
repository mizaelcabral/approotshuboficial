import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CartItem } from '../../types';

import { ProductCard } from '../../components/common/Cards';

interface PharmacyPageProps {
    onProductSelect: (product: any) => void;
    onAddToCart: (product: any) => void;
    onCartClick: () => void;
    cart: CartItem[];
    cartSubtotal: number;
}

const PharmacyPage = ({ onProductSelect, onAddToCart, onCartClick, cart, cartSubtotal }: PharmacyPageProps) => {
    const [activeCategory, setActiveCategory] = useState('Todos');
    const categories = ['Óleos Full Spectrum', 'Isolados', 'Cápsulas', 'Tópicos & Cremes', 'Flores In Natura'];

    const products = [
        { name: 'Cannabiol Full Spectrum 3000mg', category: 'Óleos Full Spectrum', price: 'R$ 389,00', oldPrice: 'R$ 499,00', image: 'https://content.app-sources.com/s/9912119225007784/uploads/Images/rootcare_3000_1-9614660.png', badge: 'MAIS VENDIDO' },
        { name: 'Cápsulas Softgel CBD 25mg', category: 'Cápsulas', price: 'R$ 215,00', oldPrice: 'R$ 280,00', image: 'https://content.app-sources.com/s/9912119225007784/uploads/Images/rootcare_3000_1-9614660.png' },
        { name: 'Flower Premium CBD Lemon 5g', category: 'Flores In Natura', price: 'R$ 520,00', oldPrice: 'R$ 650,00', image: 'https://content.app-sources.com/s/9912119225007784/uploads/Images/rootcare_3000_1-9614660.png', badge: 'ESTOQUE BAIXO' },
        { name: 'Bálsamo Aliviador CBD', category: 'Tópicos & Cremes', price: 'R$ 145,00', oldPrice: 'R$ 180,00', image: 'https://content.app-sources.com/s/9912119225007784/uploads/Images/rootcare_3000_1-9614660.png' },
        { name: 'Pó Cristal CBD Isolado 99%', category: 'Isolados', price: 'R$ 290,00', oldPrice: 'R$ 350,00', image: 'https://content.app-sources.com/s/9912119225007784/uploads/Images/rootcare_3000_1-9614660.png' },
        { name: 'Óleo THC:CBD Balanceado', category: 'Óleos Full Spectrum', price: 'R$ 345,00', oldPrice: 'R$ 420,00', image: 'https://content.app-sources.com/s/9912119225007784/uploads/Images/rootcare_3000_1-9614660.png' },
    ];

    return (
        <div className="space-y-8 pb-20 md:pb-0">
            <header className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-[#1a2e20] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10">
                <div className="flex-1 relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                    <input className="w-full pl-12 pr-4 py-3 rounded-xl border-none bg-gray-100 dark:bg-white/5 text-sm focus:ring-2 focus:ring-primary/50 transition-all outline-none font-display" placeholder="Buscar óleos, cápsulas, flores..." type="text" />
                </div>
                <div className="flex items-center justify-between md:justify-end gap-4 px-1 md:px-0">
                    <button className="flex items-center gap-2 px-4 py-3 md:py-2 bg-gray-100 dark:bg-white/5 rounded-xl text-sm font-semibold hover:bg-gray-200 dark:hover:bg-white/10 transition-colors flex-1 md:flex-none justify-center">
                        <span className="material-symbols-outlined text-sm">filter_list</span>
                        Filtros
                    </button>
                    <button onClick={onCartClick} className="relative bg-primary text-white p-3 rounded-xl shadow-lg shadow-primary/20 flex flex-shrink-0">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-white text-primary text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-primary">
                                {cart.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        )}
                    </button>
                </div>
            </header>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <div className="py-2">
                        <p className="text-[#4e9767] text-sm font-bold">Produtos homologados e selecionados para o seu tratamento.</p>
                    </div>
                    <div className="hidden sm:flex gap-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">Preço Humanizado</span>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 text-xs font-bold rounded-full border border-blue-100 dark:border-blue-900/30">Entrega Grátis</span>
                    </div>
                </div>
                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <button
                        onClick={() => setActiveCategory('Todos')}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeCategory === 'Todos' ? 'bg-primary text-white' : 'bg-white dark:bg-white/5 text-gray-500 border border-gray-100 dark:border-white/10'}`}
                    >
                        Todos
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-primary text-white' : 'bg-white dark:bg-white/5 text-gray-500 border border-gray-100 dark:border-white/10'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.filter(p => activeCategory === 'Todos' || p.category === activeCategory).map((product, i) => (
                    <ProductCard key={i} {...product} onProductClick={() => onProductSelect(product)} onAddToCart={() => onAddToCart(product)} />
                ))}
            </div>

            {/* Floating Cart Button */}
            {cart.length > 0 && (
                <div className="fixed bottom-8 right-8 z-50">
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={onCartClick}
                        className="flex items-center gap-3 bg-[#0e1b12] dark:bg-primary text-white dark:text-[#0e1b12] px-6 py-4 rounded-full shadow-2xl"
                    >
                        <div className="relative">
                            <span className="material-symbols-outlined text-2xl">shopping_cart</span>
                            <span className="absolute -top-2 -right-2 bg-primary dark:bg-white text-white dark:text-[#0e1b12] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                                {cart.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        </div>
                        <div className="text-left leading-none uppercase">
                            <p className="text-[10px] font-bold opacity-70 tracking-tighter">Carrinho</p>
                            <p className="text-sm font-black">R$ {cartSubtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        </div>
                    </motion.button>
                </div>
            )}
        </div>
    );
};

export default PharmacyPage;
