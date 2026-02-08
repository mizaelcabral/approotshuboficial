import React, { useState } from 'react';

interface ProductDetailsPageProps {
    product: any;
    onBack: () => void;
    onAddToCart: (product: any, qty: number) => void;
}

const ProductDetailsPage = ({ product, onBack, onAddToCart }: ProductDetailsPageProps) => {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            <header className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <button onClick={onBack} className="hover:text-primary transition-colors">Voltar para Loja</button>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-primary font-semibold">{product.category}</span>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5 space-y-4">
                    <div className="aspect-square bg-white dark:bg-[#1a2e20] rounded-3xl border border-gray-100 dark:border-white/10 flex items-center justify-center p-12 overflow-hidden shadow-sm">
                        <img alt={product.name} className="w-full h-full object-contain" src={product.image} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <button className="aspect-square bg-white dark:bg-[#1a2e20] rounded-xl border-2 border-primary p-2 overflow-hidden">
                            <img alt="Thumbnail 1" className="w-full h-full object-contain opacity-100" src={product.image} />
                        </button>
                        <button className="aspect-square bg-white dark:bg-[#1a2e20] rounded-xl border border-gray-100 dark:border-white/10 p-2 overflow-hidden hover:border-primary/50 transition-colors">
                            <img alt="Thumbnail 2" className="w-full h-full object-contain opacity-50" src={product.image} />
                        </button>
                        <button className="aspect-square bg-white dark:bg-[#1a2e20] rounded-xl border border-gray-100 dark:border-white/10 p-2 overflow-hidden hover:border-primary/50 transition-colors">
                            <img alt="Thumbnail 3" className="w-full h-full object-contain opacity-50" src={product.image} />
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-7 space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20 uppercase tracking-wider">{product.category}</span>
                            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full border border-amber-200 uppercase tracking-wider">Alta Concentração</span>
                        </div>
                        <h1 className="text-4xl font-black text-[#0e1b12] dark:text-white leading-tight">{product.name}</h1>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 line-through text-lg">{product.oldPrice}</span>
                                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">Economize 22%</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-primary">{product.price}</span>
                                <div className="flex items-center gap-1 group cursor-help">
                                    <span className="text-xs font-bold text-primary/80 uppercase">Preço Humanizado</span>
                                    <span className="material-symbols-outlined text-sm text-primary/50">info</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-2xl">
                            Desenvolvido para tratamentos crônicos, o {product.name.split(' ')[0]} Full Spectrum mantém todos os canabinoides naturais da planta, proporcionando o "efeito comitiva" para máxima eficácia terapêutica em casos de ansiedade severa, dores crônicas e distúrbios do sono.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            Certificações Profissionais
                            <div className="h-px flex-1 bg-gray-100 dark:bg-white/10"></div>
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-center">
                                <span className="material-symbols-outlined text-primary mb-2">magnification_small</span>
                                <span className="text-xs font-bold">THC &lt; 0.3%</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-center">
                                <span className="material-symbols-outlined text-primary mb-2">psychiatry</span>
                                <span className="text-xs font-bold">Orgânico</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-center">
                                <span className="material-symbols-outlined text-primary mb-2">biotech</span>
                                <span className="text-xs font-bold">Lab Tested</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-primary">
                                <span className="material-symbols-outlined text-sm">medical_services</span>
                                <h4 className="text-xs font-bold uppercase tracking-wider">Guia de Dosagem</h4>
                            </div>
                            <p className="text-xs text-gray-500 leading-normal">
                                Iniciar com 2 gotas (sublingual) 2x ao dia. Ajustar conforme orientação do seu médico Rootcare após a primeira semana.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-primary">
                                <span className="material-symbols-outlined text-sm">inventory_2</span>
                                <h4 className="text-xs font-bold uppercase tracking-wider">Especificações</h4>
                            </div>
                            <ul className="text-[10px] space-y-1 font-medium text-gray-500">
                                <li className="flex justify-between"><span>Volume:</span> <span className="text-gray-900 dark:text-white">30ml</span></li>
                                <li className="flex justify-between"><span>Veículo:</span> <span className="text-gray-900 dark:text-white">Azeite de Oliva Extra Virgem</span></li>
                                <li className="flex justify-between"><span>Extração:</span> <span className="text-gray-900 dark:text-white">CO2 Supercrítico</span></li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <div className="flex items-center bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-2">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="p-3 text-gray-400 hover:text-primary"
                            >
                                <span className="material-symbols-outlined text-sm font-bold">remove</span>
                            </button>
                            <span className="px-4 font-bold">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="p-3 text-gray-400 hover:text-primary"
                            >
                                <span className="material-symbols-outlined text-sm font-bold">add</span>
                            </button>
                        </div>
                        <button
                            onClick={() => onAddToCart(product, quantity)}
                            className="flex-1 bg-primary text-[#0e1b12] font-black py-4 rounded-xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-100"
                        >
                            <span className="material-symbols-outlined">add_shopping_cart</span>
                            <span className="hidden sm:inline">Adicionar ao Carrinho</span>
                            <span className="sm:hidden">Adicionar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
