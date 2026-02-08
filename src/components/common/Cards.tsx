import React from 'react';
import { motion } from 'framer-motion';

// --- Professional Card ---
interface ProfessionalGridCardProps {
    name: string;
    specialty: string;
    image: string;
    verified?: boolean;
}

export const ProfessionalGridCard = ({ name, specialty, image, verified = false }: ProfessionalGridCardProps) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
    >
        <div className="aspect-square relative overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            {verified && (
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-dark-surface/90 p-1.5 rounded-full shadow-sm">
                    <span className="material-symbols-outlined text-primary text-lg leading-none">verified</span>
                </div>
            )}
        </div>
        <div className="p-5">
            <h4 className="font-bold text-lg mb-1">{name}</h4>
            <p className="text-primary text-xs font-bold mb-4 uppercase tracking-wide">{specialty}</p>
            <div className="flex flex-col gap-2">
                <button className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:brightness-110 transition-all shadow-md shadow-primary/10">Agendar</button>
                <button className="w-full py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 font-bold text-sm hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">Ver Perfil</button>
            </div>
        </div>
    </motion.div>
);

// --- Product Card (Pharmacy) ---
interface ProductCardProps {
    name: string;
    category: string;
    price: string;
    oldPrice: string;
    image: string;
    badge?: string;
    onProductClick: () => void;
    onAddToCart: () => void;
}

export const ProductCard = ({ name, category, price, oldPrice, image, badge, onProductClick, onAddToCart }: ProductCardProps) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="product-card group bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
    >
        <div onClick={onProductClick} className="relative aspect-square bg-gray-50 dark:bg-white/5 flex items-center justify-center p-8 overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
            {badge && (
                <span className={`absolute top-4 left-4 ${badge === 'MAIS VENDIDO' ? 'bg-primary' : 'bg-amber-500'} text-white text-[10px] font-bold px-2 py-1 rounded`}>
                    {badge}
                </span>
            )}
            <div className="add-to-cart-btn absolute inset-x-4 bottom-4 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <button
                    onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
                    className="w-full bg-primary text-text-main font-bold py-3 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 hover:bg-primary/90"
                >
                    <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
        <div className="p-5 space-y-3">
            <div>
                <p className="text-[10px] font-bold text-text-muted uppercase">{category}</p>
                <h3 className="font-bold text-lg leading-tight">{name}</h3>
            </div>
            <div className="flex flex-col">
                <span className="text-xs text-gray-400 line-through">{oldPrice}</span>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-primary">{price}</span>
                    <span className="text-[10px] font-bold text-primary/70 uppercase">Preço Humanizado</span>
                </div>
            </div>
        </div>
    </motion.div>
);

// --- Medication Card ---
interface MedicationCardProps {
    icon: string;
    title: string;
    dosage: string;
    status: string;
    nextTime?: string;
    completed?: boolean;
}

export const MedicationCard = ({ icon, title, dosage, status, nextTime, completed = false }: MedicationCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.01 }}
        className={`bg-white dark:bg-dark-surface p-5 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-4 hover:border-primary/40 transition-colors group ${completed ? 'opacity-80' : ''}`}
    >
        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>
        <div className="flex-1">
            <h4 className="font-bold text-base">{title}</h4>
            <p className="text-sm text-gray-500">{dosage}</p>
        </div>
        <div className="text-right flex flex-col items-end gap-2">
            <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${nextTime ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 dark:bg-white/10 text-gray-500'
                }`}>
                {nextTime ? `Próxima: ${nextTime}` : status}
            </span>
            <button className={`p-2 rounded-lg transition-colors ${completed ? 'text-primary bg-primary/10' : 'bg-gray-100 dark:bg-white/5 text-gray-400 group-hover:text-primary'}`}>
                <span className="material-symbols-outlined">check_circle</span>
            </button>
        </div>
    </motion.div>
);
