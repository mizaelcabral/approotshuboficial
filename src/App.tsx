import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
type Page = 'dashboard' | 'orders' | 'appointments' | 'professionals' | 'pharmacy' | 'product_details' | 'cart' | 'checkout' | 'payment_success' | 'addresses' | 'reports' | 'documents' | 'anvisa' | 'profile';

interface CartItem {
    name: string;
    price: number;
    priceString: string;
    image: string;
    category: string;
    quantity: number;
}

// --- Sidebar Item ---
const SidebarItem = ({ icon, label, active = false, onClick, hasSubmenu = false, isExpanded = false }: { icon: string, label: string, active?: boolean, onClick: () => void, hasSubmenu?: boolean, isExpanded?: boolean }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${active && !hasSubmenu
            ? 'bg-primary/10 text-primary font-bold'
            : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 hover:text-text-main dark:hover:text-white'
            }`}
    >
        <span className={`material-symbols-outlined ${active ? 'text-primary' : 'text-gray-500 group-hover:text-primary'}`}>
            {icon}
        </span>
        <span className="text-sm flex-1 text-left">{label}</span>
        {hasSubmenu && (
            <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                expand_more
            </span>
        )}
    </button>
);

// --- Sidebar SubItem ---
const SidebarSubItem = ({ label, active = false, onClick }: { label: string, active?: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 pl-12 pr-3 py-2 rounded-lg transition-all duration-200 group ${active
            ? 'text-primary font-bold'
            : 'text-gray-400 hover:text-text-main dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
            }`}
    >
        <div className={`w-1.5 h-1.5 rounded-full transition-colors ${active ? 'bg-primary' : 'bg-gray-300 dark:bg-white/20 group-hover:bg-primary/50'}`} />
        <span className="text-xs uppercase tracking-wider font-bold">{label}</span>
    </button>
);

// --- Sidebar Info Card ---
const SidebarInfoCard = ({ icon, label, title, subtitle, variant = 'default', actionLabel }: { icon: string, label: string, title: string, subtitle: string, variant?: 'default' | 'warning', actionLabel?: string }) => (
    <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10">
        <div className={`flex items-center gap-2 mb-2 ${variant === 'warning' ? 'text-amber-500' : 'text-primary'}`}>
            <span className="material-symbols-outlined text-sm">{icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{label}</span>
        </div>
        <p className="text-sm font-bold">{title}</p>
        <p className={`text-xs font-medium ${variant === 'warning' ? 'text-amber-600' : (variant === 'default' && (label === 'Minha Associação' || label === 'Associação') ? 'text-green-600' : 'text-gray-500')}`}>{subtitle}</p>
        {actionLabel && <button className="text-[10px] text-primary font-bold mt-1 hover:underline">{actionLabel}</button>}
    </div>
);

// --- Component: Professional Card ---
const ProfessionalGridCard = ({ name, specialty, image, verified = false }: { name: string, specialty: string, image: string, verified?: boolean }) => (
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

// --- Component: Product Card (Pharmacy) ---
const ProductCard = ({ name, category, price, oldPrice, image, badge, onProductClick, onAddToCart }: { name: string, category: string, price: string, oldPrice: string, image: string, badge?: string, onProductClick: () => void, onAddToCart: () => void }) => (
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

// --- Page: Dashboard ---
// --- Medication Card ---
const MedicationCard = ({ icon, title, dosage, status, nextTime, completed = false }: { icon: string, title: string, dosage: string, status: string, nextTime?: string, completed?: boolean }) => (
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

// --- Page: Dashboard ---
const DashboardPage = ({ setActivePage }: { setActivePage: (page: Page) => void }) => (
    <div className="space-y-8 pb-12">
        {/* Welcome Section */}
        <header className="flex flex-wrap justify-between items-center gap-4">
            <div className="space-y-1">
                <h2 className="text-xl md:text-3xl font-black tracking-tight dark:text-white leading-tight">Olá, João Silva</h2>
                <p className="text-[#4e9767] text-sm md:text-base font-medium">Seu resumo de hoje, 31 de Janeiro.</p>
            </div>
            <div className="flex items-center gap-6">
                <div className="hidden sm:flex flex-col items-end">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status Financeiro</span>
                    <span className="text-sm font-black text-green-600">Regular</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setActivePage('profile')}
                        className="p-2 border border-gray-100 dark:border-white/10 rounded-xl bg-white dark:bg-dark-surface shadow-sm hover:border-primary/50 transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-primary text-sm">settings</span>
                        <span className="text-xs font-bold px-1">Ajustes</span>
                    </button>
                    <div className="hidden sm:flex bg-primary/10 border border-primary/20 px-4 py-2 rounded-xl items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-xl">military_tech</span>
                        <span className="text-xs font-black text-primary uppercase tracking-tighter">Isenção 100%</span>
                    </div>
                </div>
            </div>
        </header>

        {/* Hub Row 1: Core Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Progress Card */}
            <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-primary text-2xl">insights</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tratamento</span>
                </div>
                <div>
                    <h3 className="text-2xl font-black">65%</h3>
                    <p className="text-xs text-gray-500 font-medium">Progresso da Fase Atual</p>
                </div>
                <div className="w-full bg-gray-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full w-[65%] shadow-[0_0_8px_rgba(78,151,103,0.5)]" />
                </div>
            </div>

            {/* Logistics Hub Snippet */}
            <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-blue-500 text-2xl">local_shipping</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Logística</span>
                </div>
                <div className="min-w-0">
                    <h3 className="text-sm font-bold truncate">Rua das Flores, 123</h3>
                    <p className="text-[10px] text-gray-500 font-medium">Destino Principal • Curitiba</p>
                </div>
                <button onClick={() => setActivePage('addresses')} className="text-[10px] font-black text-primary uppercase hover:underline">Alterar Endereço</button>
            </div>

            {/* Documentation Hub Snippet */}
            <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-amber-500 text-2xl">description</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Documentação</span>
                </div>
                <div>
                    <h3 className="text-sm font-bold">Receita: Válida</h3>
                    <p className="text-[10px] text-amber-600 font-black uppercase tracking-tight">Expira em 45 dias</p>
                </div>
                <button onClick={() => setActivePage('documents')} className="text-[10px] font-black text-primary uppercase hover:underline">Ver Receita Digital</button>
            </div>

            {/* Next Appointment Card */}
            <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 size-20 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <span className="material-symbols-outlined text-primary text-2xl mb-1">calendar_today</span>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Próxima Consulta</p>
                    </div>
                    <div>
                        <h3 className="text-gray-900 dark:text-white text-base font-bold leading-tight">Dra. Letícia</h3>
                        <p className="text-primary text-xs font-black">24 de Set, 14:30</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Medications Column */}
            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-xl font-black tracking-tight">Tratamento Diário</h3>
                    <button onClick={() => setActivePage('pharmacy')} className="text-primary text-xs font-black uppercase hover:underline">Farmácia</button>
                </div>

                <div className="grid gap-4">
                    <div className="bg-white dark:bg-dark-surface p-5 rounded-2xl border border-gray-100 dark:border-white/10 flex items-center gap-5 hover:border-primary/40 transition-all shadow-sm group">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            <span className="material-symbols-outlined text-3xl">opacity</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-base leading-tight">Óleo CBD Full Spectrum 10%</h4>
                            <p className="text-sm text-gray-500 font-medium">Sublingual • 3 gotas • Próxima: 20:00</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="hidden sm:flex flex-col items-end mr-2">
                                <span className="text-[8px] font-black text-gray-400 uppercase">Estoque</span>
                                <span className="text-xs font-bold text-green-600">Regular</span>
                            </div>
                            <button className="bg-primary/10 text-primary p-2.5 rounded-xl hover:bg-primary transition-colors">
                                <span className="material-symbols-outlined text-lg">check</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-dark-surface p-5 rounded-2xl border border-gray-100 dark:border-white/10 flex items-center gap-5 hover:border-primary/40 transition-all shadow-sm group">
                        <div className="w-14 h-14 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-primary/20 group-hover:text-primary transition-colors duration-300">
                            <span className="material-symbols-outlined text-3xl">medication</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-base leading-tight">Gummies CBD Relax Night</h4>
                            <p className="text-sm text-gray-500 font-medium">Mastigável • 1 un • Hoje, 22:30</p>
                        </div>
                        <button className="bg-gray-100 dark:bg-white/5 text-gray-400 p-2.5 rounded-xl">
                            <span className="material-symbols-outlined text-lg">schedule</span>
                        </button>
                    </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <button onClick={() => setActivePage('reports')} className="p-4 bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-2 group">
                        <div className="size-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                            <span className="material-symbols-outlined">edit_square</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-primary">Registrar</span>
                    </button>
                    <button onClick={() => setActivePage('documents')} className="p-4 bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-2 group">
                        <div className="size-10 bg-blue-500/5 rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                            <span className="material-symbols-outlined">folder</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-blue-500">Arquivos</span>
                    </button>
                    <button onClick={() => setActivePage('appointments')} className="p-4 bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-2 group">
                        <div className="size-10 bg-amber-500/5 rounded-xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all">
                            <span className="material-symbols-outlined">event</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-amber-500">Agenda</span>
                    </button>
                    <button onClick={() => setActivePage('pharmacy')} className="p-4 bg-[#112116] rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-2 group">
                        <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">storefront</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Comprar</span>
                    </button>
                </div>

                {/* Treatment Insights & Metrics */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-black tracking-tight">Insights do Tratamento</h3>
                        <button onClick={() => setActivePage('reports')} className="text-xs font-black text-primary uppercase hover:underline">Ver Todos</button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-green-600 text-lg">bedtime</span>
                                <span className="text-[10px] font-black text-gray-500 uppercase">Sono</span>
                            </div>
                            <p className="text-2xl font-black text-green-600">+32%</p>
                            <p className="text-[10px] text-gray-500 font-medium">Melhora</p>
                        </div>
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-blue-600 text-lg">mood</span>
                                <span className="text-[10px] font-black text-gray-500 uppercase">Humor</span>
                            </div>
                            <p className="text-2xl font-black text-blue-600">+28%</p>
                            <p className="text-[10px] text-gray-500 font-medium">Melhora</p>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-900/20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-purple-600 text-lg">self_improvement</span>
                                <span className="text-[10px] font-black text-gray-500 uppercase">Ansiedade</span>
                            </div>
                            <p className="text-2xl font-black text-purple-600">-45%</p>
                            <p className="text-[10px] text-gray-500 font-medium">Redução</p>
                        </div>
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-amber-600 text-lg">favorite</span>
                                <span className="text-[10px] font-black text-gray-500 uppercase">Dor</span>
                            </div>
                            <p className="text-2xl font-black text-amber-600">-38%</p>
                            <p className="text-[10px] text-gray-500 font-medium">Redução</p>
                        </div>
                    </div>
                </div>

                {/* Upcoming Deliveries & Activity Timeline */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Upcoming Deliveries */}
                    <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="size-10 bg-blue-50 dark:bg-blue-900/10 rounded-xl flex items-center justify-center text-blue-500">
                                    <span className="material-symbols-outlined">local_shipping</span>
                                </div>
                                <h3 className="text-lg font-black tracking-tight">Próximas Entregas</h3>
                            </div>
                            <button onClick={() => setActivePage('orders')} className="text-xs font-black text-primary uppercase hover:underline">Ver Pedidos</button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                                <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                                    <span className="material-symbols-outlined">package_2</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-sm truncate">Óleo CBD Full Spectrum 10%</p>
                                    <p className="text-xs text-gray-500 font-medium">Pedido #4521 • Chega em 2 dias</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 text-[10px] font-black rounded-full uppercase">Em Trânsito</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                                <div className="size-12 bg-amber-50 dark:bg-amber-900/10 rounded-xl flex items-center justify-center text-amber-500 flex-shrink-0">
                                    <span className="material-symbols-outlined">inventory_2</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-sm truncate">Gummies CBD Relax Night</p>
                                    <p className="text-xs text-gray-500 font-medium">Pedido #4498 • Chega em 5 dias</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 text-[10px] font-black rounded-full uppercase">Processando</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity Timeline */}
                    <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="size-10 bg-purple-50 dark:bg-purple-900/10 rounded-xl flex items-center justify-center text-purple-500">
                                    <span className="material-symbols-outlined">history</span>
                                </div>
                                <h3 className="text-lg font-black tracking-tight">Atividade Recente</h3>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                                        <span className="material-symbols-outlined text-sm">check</span>
                                    </div>
                                    <div className="w-0.5 h-full bg-gray-200 dark:bg-white/10 mt-2"></div>
                                </div>
                                <div className="flex-1 pb-4">
                                    <p className="font-bold text-sm">Relato Registrado</p>
                                    <p className="text-xs text-gray-500 font-medium">Ontem às 20:30 • Melhora no sono</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="size-8 bg-blue-50 dark:bg-blue-900/10 rounded-full flex items-center justify-center text-blue-500 flex-shrink-0">
                                        <span className="material-symbols-outlined text-sm">medication</span>
                                    </div>
                                    <div className="w-0.5 h-full bg-gray-200 dark:bg-white/10 mt-2"></div>
                                </div>
                                <div className="flex-1 pb-4">
                                    <p className="font-bold text-sm">Medicação Tomada</p>
                                    <p className="text-xs text-gray-500 font-medium">Hoje às 08:00 • Óleo CBD 3 gotas</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="size-8 bg-amber-50 dark:bg-amber-900/10 rounded-full flex items-center justify-center text-amber-500 flex-shrink-0">
                                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-sm">Consulta Agendada</p>
                                    <p className="text-xs text-gray-500 font-medium">Há 2 dias • Dra. Letícia Oliveira</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Concierge, Tips & Reports Hub Column */}
            <div className="space-y-8">
                {/* Reports Summary Card (from User Image) */}
                <div className="bg-primary p-7 rounded-2xl shadow-xl shadow-primary/20 flex flex-col justify-between items-start relative overflow-hidden group">
                    <div className="absolute right-0 top-0 size-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-125 transition-all duration-700" />
                    <div className="relative z-10 w-full space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="size-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">edit_square</span>
                            </div>
                            <h4 className="text-white font-black text-lg">Relatos do Tratamento</h4>
                        </div>
                        <p className="text-white/90 text-sm font-medium leading-relaxed">
                            Último relato: <span className="font-black">Ontem, 20:30</span><br />
                            Status: <span className="font-black italic">Melhora no Sono</span>
                        </p>
                        <button
                            onClick={() => setActivePage('reports')}
                            className="w-full bg-white text-primary font-black py-4 rounded-xl text-sm shadow-lg hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2"
                        >
                            Registrar Agora
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>

                {/* Concierge Card */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm space-y-5 group cursor-pointer hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="size-14 rounded-2xl bg-primary/10 p-0.5 border border-primary/20 overflow-hidden">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD80dArObbYpuXgVgJ8NNJ7sYtznk2tjUDomJsAvfvtiM4vNnQMVbEkd0bYqCrSGFsH_JTgANLQO7YIw0Nfh_1MsGQtU8iZtBt5fNeOs5uvVGr3TK8QEGwzl9dUeK4RW_0_A287HMttjG1ZNMh7ts4qohYVfZTD0qjTdnVa9QWGSXQJDPnFC3uFlI3K1eO3b4T-gqUZ3FNvutAjaDM5W90uNEa-grRuYGvoguFLn07zYHQh9c_tS8ADOvNbNT2ky4AFaSgoMbrmnTg" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div>
                            <p className="font-black leading-tight">Dra. Letícia</p>
                            <p className="text-primary text-[10px] font-black uppercase tracking-widest">Sua Concierge</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                        "Olá João! Verifiquei que seu estoque de óleo está quase no fim. Deseja renovar seu pedido?"
                    </p>
                    <button className="text-xs font-black text-primary uppercase hover:underline">Falar no Concierge</button>
                </div>

                <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm group cursor-pointer hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="size-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 dark:bg-amber-500/10">
                            <span className="material-symbols-outlined text-xl">lightbulb</span>
                        </div>
                        <h4 className="font-bold text-sm">Dica de Bem-estar</h4>
                    </div>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                        A constância é fundamental. Tente administrar o CBD no mesmo horário todos os dias.
                    </p>
                </div>

                {/* Prescription Renewal Reminder Card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 p-6 rounded-2xl border border-green-100 dark:border-green-900/20 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-8 -bottom-8 size-32 bg-green-200/30 dark:bg-primary/10 rounded-full blur-2xl group-hover:scale-125 transition-all duration-500" />
                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-2xl">event_upcoming</span>
                            </div>
                            <div>
                                <h4 className="font-black text-sm">Próxima Renovação</h4>
                                <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Receita Médica</p>
                            </div>
                        </div>
                        <div className="p-4 bg-white/60 dark:bg-white/5 rounded-xl border border-green-200/50 dark:border-green-800/30">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">Vencimento</span>
                                <span className="text-xs font-black text-primary">45 dias</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-primary to-emerald-500 h-full rounded-full w-[65%] shadow-lg shadow-primary/30"></div>
                            </div>
                        </div>
                        <button
                            onClick={() => setActivePage('appointments')}
                            className="w-full bg-primary hover:bg-primary-dark text-[#0e1b12] font-bold py-3 rounded-xl text-xs shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group/btn"
                        >
                            <span>Agendar Renovação</span>
                            <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <footer className="py-10 border-t border-gray-100 dark:border-white/5 text-center px-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-loose">
                © 2024 Rootcare Integrated Health Systems.<br />
                Inteligência Médica & Cuidado Humanizado.
            </p>
        </footer>
    </div>
);

// --- Mock Data ---
const ORDERS_DATA = [
    { id: '#RC-9842', date: '18 Set, 2023', time: '14:45', icon: 'opacity', product: 'Óleo CBD Full Spectrum 10%', desc: 'Frasco 30ml', price: 'R$ 245,00', status: 'Processando', statusColor: 'amber' },
    { id: '#RC-9210', date: '05 Ago, 2023', time: '10:15', icon: 'medical_services', product: 'Cápsulas THC:CBD 1:1', desc: '60 cápsulas', price: 'R$ 189,90', status: 'Enviado', statusColor: 'blue' },
    { id: '#RC-8850', date: '12 Jul, 2023', time: '09:30', icon: 'opacity', product: 'Óleo CBD Full Spectrum 10%', desc: 'Frasco 30ml', price: 'R$ 245,00', status: 'Entregue', statusColor: 'green' },
    { id: '#RC-8520', date: '22 Jun, 2023', time: '15:20', icon: 'medical_services', product: 'Gel CBD Tópico Sport', desc: 'Frasco 100ml', price: 'R$ 156,00', status: 'Entregue', statusColor: 'green' },
    { id: '#RC-7912', date: '15 Mai, 2023', time: '11:10', icon: 'opacity', product: 'Óleo CBD Isolado 5%', desc: 'Frasco 30ml', price: 'R$ 120,00', status: 'Entregue', statusColor: 'green' },
    { id: '#RC-7450', date: '02 Abr, 2023', time: '08:45', icon: 'medical_services', product: 'Gummies CBD Relax', desc: '30 unidades', price: 'R$ 98,00', status: 'Entregue', statusColor: 'green' },
];

// --- Page: Orders ---
const OrdersPage = () => (
    <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                <input
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-primary focus:border-primary transition-all outline-none"
                    placeholder="Buscar por produto ou ID..."
                    type="text"
                />
            </div>
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500">Filtrar por:</span>
                <select className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-primary focus:border-primary outline-none cursor-pointer">
                    <option>Todos os Status</option>
                    <option>Processando</option>
                    <option>Enviado</option>
                    <option>Entregue</option>
                </select>
            </div>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl overflow-hidden"
        >
            {/* Desktop Table - Hidden on Mobile */}
            <div className="hidden md:block bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID do Pedido</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Data</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Produtos</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Preço Humanizado</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                            {ORDERS_DATA.map((order, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-5">
                                        <span className="font-bold text-sm text-gray-900 dark:text-white">{order.id}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{order.date}</span>
                                            <span className="text-xs text-gray-500">{order.time}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                                <span className="material-symbols-outlined text-xl">{order.icon}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold">{order.product}</span>
                                                <span className="text-xs text-gray-500">{order.desc}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-primary">{order.price}</span>
                                            <span className="text-[10px] text-green-600 font-bold uppercase tracking-tight">Preço Social</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${order.statusColor === 'amber' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                            order.statusColor === 'blue' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                                'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${order.statusColor === 'amber' ? 'bg-amber-500' :
                                                order.statusColor === 'blue' ? 'bg-blue-500' :
                                                    'bg-green-500'
                                                }`}></span>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined">visibility</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card List - Visible Only on Mobile */}
            <div className="md:hidden space-y-4">
                {ORDERS_DATA.map((order, idx) => (
                    <div key={idx} className="bg-white dark:bg-dark-surface p-4 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-bold text-primary uppercase">{order.id}</p>
                                <p className="text-xs text-gray-400">{order.date}</p>
                            </div>
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${order.statusColor === 'amber' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30' : order.statusColor === 'blue' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30' : 'bg-green-100 text-green-700'}`}>{order.status}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-xl">{order.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold truncate">{order.product}</p>
                                <p className="text-[10px] text-gray-500">{order.desc}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="text-sm font-black text-primary">{order.price}</p>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-gray-100 dark:border-white/5 flex gap-2">
                            <button className="flex-1 bg-primary/10 text-primary py-2 rounded-lg font-bold text-xs">Rastrear</button>
                            <button className="bg-gray-100 dark:bg-white/10 text-gray-500 px-3 py-2 rounded-lg"><span className="material-symbols-outlined text-sm">visibility</span></button>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex flex-shrink-0 items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">support_agent</span>
                </div>
                <div>
                    <h4 className="font-bold mb-1">Dúvidas sobre seu pedido?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Nossa equipe de suporte está disponível para acompanhar sua entrega e sanar qualquer dúvida.</p>
                    <button className="text-primary text-sm font-bold hover:underline">Falar com suporte</button>
                </div>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-6 flex gap-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-white/10 rounded-lg flex flex-shrink-0 items-center justify-center text-gray-500">
                    <span className="material-symbols-outlined text-2xl">verified</span>
                </div>
                <div>
                    <h4 className="font-bold mb-1">Humanismo e Acesso</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Garantimos o preço humanizado através de parcerias com associações sem fins lucrativos.</p>
                    <button className="text-gray-500 text-sm font-bold hover:underline">Saber mais sobre o programa</button>
                </div>
            </div>
        </div>
    </div>
);

// --- Page: Addresses & Logistics ---
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

// --- Page: Patient Reports ---
const PatientReportsPage = () => {
    const [humor, setHumor] = useState('BOM');
    const [painLevel, setPainLevel] = useState(2);

    return (
        <div className="space-y-8 pb-20 md:pb-0">
            <header className="flex flex-wrap justify-between items-start gap-4">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black tracking-tight dark:text-white">Relatos do Paciente</h2>
                    <p className="text-[#4e9767] text-base">Acompanhe seu tratamento e compartilhe seu progresso.</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white dark:bg-[#1a2e20] p-3 px-5 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-3 shadow-sm">
                        <span className="material-symbols-outlined text-primary">analytics</span>
                        <div>
                            <p className="text-xs text-gray-500">Adesão</p>
                            <p className="font-bold">92%</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Medicamentos Section */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">medication</span>
                                Medicamentos em Uso
                            </h3>
                        </div>
                        <div className="grid gap-4">
                            <div className="bg-white dark:bg-[#1a2e20] p-5 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-4 hover:border-primary/30 transition-colors">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-3xl">opacity</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-base">Óleo CBD Full Spectrum 10%</h4>
                                    <p className="text-sm text-gray-500">3 gotas • 2x ao dia (Manhã/Noite)</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full uppercase">Em uso</span>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-[#1a2e20] p-5 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-4 hover:border-primary/30 transition-colors">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-3xl">medical_services</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-base">Cápsula Noturna THC:CBD</h4>
                                    <p className="text-sm text-gray-500">1 cápsula • 1x ao dia (Antes de dormir)</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full uppercase">Em uso</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Diário de Sintomas Section */}
                    <section className="bg-white dark:bg-[#1a2e20] p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">mood</span>
                            Diário de Sintomas
                        </h3>
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Como está seu humor hoje?</p>
                                <div className="flex justify-between gap-2">
                                    {[
                                        { icon: '😞', label: 'PÉSSIMO' },
                                        { icon: '😐', label: 'NEUTRO' },
                                        { icon: '🙂', label: 'BOM' },
                                        { icon: '😊', label: 'ÓTIMO' }
                                    ].map((item) => (
                                        <button
                                            key={item.label}
                                            onClick={() => setHumor(item.label)}
                                            className={`flex-1 py-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${humor === item.label
                                                ? 'border-primary bg-primary/5'
                                                : 'border-gray-100 dark:border-white/5 hover:border-primary/50'
                                                }`}
                                        >
                                            <span className="text-3xl">{item.icon}</span>
                                            <span className={`text-[10px] font-bold ${humor === item.label ? 'text-primary' : 'text-gray-400'}`}>
                                                {item.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center px-1">
                                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Nível de Dor ou Desconforto</p>
                                    <span className="text-primary font-bold text-sm">Nível {painLevel}</span>
                                </div>
                                <div className="flex gap-1 h-10">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => setPainLevel(level)}
                                            className={`flex-1 rounded transition-colors ${level <= painLevel ? 'bg-primary' : 'bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase px-1">
                                    <span>Sem Dor</span>
                                    <span>Dor Moderada</span>
                                    <span>Dor Intensa</span>
                                </div>
                            </div>
                            <textarea
                                className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-sm focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                                placeholder="Observações adicionais em relação ao tratamento hoje..."
                                rows={3}
                            ></textarea>
                            <button className="w-full bg-primary text-[#0e1b12] font-black py-4 rounded-xl hover:scale-[1.01] active:scale-100 shadow-xl shadow-primary/20 transition-all">
                                Salvar Relato Diário
                            </button>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    {/* Document Upload Section */}
                    <section className="bg-white dark:bg-[#1a2e20] p-6 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm space-y-4">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">upload_file</span>
                            Compartilhar com Médico
                        </h3>
                        <div className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center gap-3 hover:border-primary/50 transition-colors cursor-pointer group">
                            <span className="material-symbols-outlined text-4xl text-gray-300 group-hover:text-primary transition-colors">cloud_upload</span>
                            <div className="space-y-1">
                                <p className="text-sm font-bold">Arraste seus documentos aqui</p>
                                <p className="text-xs text-gray-500">Exames, laudos ou receitas (PDF, JPG)</p>
                            </div>
                            <button className="mt-2 text-primary text-xs font-bold px-4 py-2 border border-primary/20 rounded-lg hover:bg-primary/5">Selecionar Arquivo</button>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Arquivos Recentes</p>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                <span className="material-symbols-outlined text-amber-500">description</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold truncate">Exame_Sangue_Jan23.pdf</p>
                                    <p className="text-[10px] text-gray-500">Enviado em 15/08</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Adjustment Section */}
                    <section className="bg-white dark:bg-[#1a2e20] p-6 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-600 dark:text-amber-500">
                                <span className="material-symbols-outlined">tune</span>
                            </div>
                            <h3 className="text-lg font-bold">Ajuste de Dose</h3>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">Sentindo que a dose não está ideal? Fale com nossa equipe técnica.</p>
                        <div className="flex flex-col gap-2">
                            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-all active:scale-[0.98]">
                                <span className="material-symbols-outlined text-sm">medication_liquid</span>
                                Solicitar Ajuste ao Médico
                            </button>
                            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-[#25D366]/20">
                                <span className="material-symbols-outlined text-sm">support_agent</span>
                                Falar com Farmacêutico
                            </button>
                        </div>
                    </section>

                    {/* Concierge Note */}
                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 relative overflow-hidden">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-primary" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD80dArObbYpuXgVgJ8NNJ7sYtznk2tjUDomJsAvfvtiM4vNnQMVbEkd0bYqCrSGFsH_JTgANLQO7YIw0Nfh_1MsGQtU8iZtBt5fNeOs5uvVGr3TK8QEGwzl9dUeK4RW_0_A287HMttjG1ZNMh7ts4qohYVfZTD0qjTdnVa9QWGSXQJDPnFC3uFlI3K1eO3b4T-gqUZ3FNvutAjaDM5W90uNEa-grRuYGvoguFLn07zYHQh9c_tS8ADOvNbNT2ky4AFaSgoMbrmnTg')" }}></div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div>
                                <p className="font-bold text-sm">Dra. Letícia</p>
                                <p className="text-[10px] text-[#4e9767] font-black uppercase tracking-wider">Sua Concierge</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed italic relative z-10">
                            "Estou acompanhando seus relatos. Se os sintomas de dor persistirem acima do nível 5, por favor, me avise imediatamente."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Page: Patient Documents ---
const DocumentsPage = ({ activeSubPage = 'documents' }: { activeSubPage?: 'documents' | 'anvisa' }) => {
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

// --- Page: Pharmacy ---
const PharmacyPage = ({ onProductSelect, onAddToCart, onCartClick, cart, cartSubtotal }: { onProductSelect: (product: any) => void, onAddToCart: (product: any) => void, onCartClick: () => void, cart: CartItem[], cartSubtotal: number }) => {
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
                    <button className="relative bg-primary text-white p-3 rounded-xl shadow-lg shadow-primary/20 flex flex-shrink-0">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        <span className="absolute -top-1 -right-1 bg-white text-primary text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-primary">3</span>
                    </button>
                </div>
            </header>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">Farmácia Medicinal</h2>
                        <p className="text-[#4e9767] text-sm font-medium">Produtos homologados e selecionados para o seu tratamento.</p>
                    </div>
                    <div className="hidden sm:flex gap-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">Preço Humanizado</span>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 text-xs font-bold rounded-full border border-blue-100 dark:border-blue-900/30">Entrega Grátis</span>
                    </div>
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
                        className="flex items-center gap-3 bg-text-main dark:bg-primary text-white dark:text-text-main px-6 py-4 rounded-full shadow-2xl"
                    >
                        <div className="relative">
                            <span className="material-symbols-outlined text-2xl">shopping_cart</span>
                            <span className="absolute -top-2 -right-2 bg-primary dark:bg-white text-white dark:text-text-main text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
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

// --- Page: Professionals ---
const ProfessionalsPage = () => {
    const [activeCategory, setActiveCategory] = useState('Médicos');

    const professionals = [
        { name: 'Dra. Juliana Mendes', specialty: 'Endocrinologista • Bem-estar', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCExtjjw05OSdlgk1RmlbEGQEhachUP5QgvWj9hvTAKFm62cMm64pHClLdnUxL6dST0ttEehugx0B0y6an8uEjelsSKfMeq9WCFSwr0Hqj44V98IcstsPTaeF0z-gmEVzmWErZSlsO64Lv9zkkvL_pJK1RSxBhgMr87hqprzutmEkWfD-_XvzSYmZW-8h1Tmzk5m-3J0RtiKvY3WkjaqOYvTWNf-q5n0kB-jfkM6SulaIXrWNTYPFb90gpHfyOh40EC_wHRSWct-5Y' },
        { name: 'Dr. Ricardo Almada', specialty: 'Geriatra • Parkinson & Alzheimer', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5ms2Qu3s6XElYyzP0xh_f-3-7mDFut26yd-_-m1BjTpRRHO1cBwR7w4XQ5l9T_fDoE8NXFUoxbLsuBkri3LgsdheTVlCBV03EqgqAICMmELy_U_UjqDj9QQWk7_nM85aSN766z6GYThLb_wMB2lHqwEb1yfA7gxLX6PxULsWr1EzMCvzkqjHiBYG3kqnAW-6sfQ6rgtT6-0tjmYQIoSohoM7yOe2LepVbTDl_uouM7I1Jwkb9wCGzhh-ZSyDUypXZdT8FjyLknPU' },
        { name: 'Dra. Beatriz Costa', specialty: 'Dermatologista • Psoríase', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8wqnWxCBMqYzpDCrbpQOsDWHo8qad0s0XQ-ZlbBvziOlkOaxzlgLB0jrB-H38CBM0_ni6l0HsO0LoafQWCX3URtUUZxGSuRLybgjX-9nhaA1hknHuSWufrdJluAfMqObuURLpAZ6tiSQRsU6l96Ro1H_FuTpUghI7CNwo-8YmwDeJdrY9WOAX-RnMfaDl9btO4r4DiYPn7nIjFYpWKmORpaHM31gA0h-wVOJ-Tva3r11FndioAYw7XiUoB5XU4bwBzZ8EbY3aW7o' },
        { name: 'Dr. Paulo Rossi', specialty: 'Infectologista • Terapias Canábicas', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDRYkd4VY7lR_UfjM3uWHJLAhPEOengIWJyALJF_H4PVn0zs-dDQTiTFZIwgZuUT7me2TZ7qZx5Fv5E15Otg8nOIR2NDaDetJ_Jc9RR7mq6Q47nu4xAluR4Z_1p8eY8bfwch-1gQBLUCc4wPyqm4cb3b_RK-8BJjJT8g-4ODAdlUmjUgdXi5F0H31oXDdWBYK_rXXsfRQGEYEqC_FSkcKnA34HNPdF1cGCsoMBKZhVXBYo-xyaNziwMjVTD8677bjq6RyFPPnPU' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-96">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                    <input
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-dark-surface focus:ring-primary focus:border-primary text-sm outline-none transition-all"
                        placeholder="Buscar profissional por nome ou especialidade..."
                        type="text"
                    />
                </div>
                <div className="flex bg-white dark:bg-dark-surface p-1 rounded-xl border border-gray-200 dark:border-white/10 w-full md:w-auto overflow-x-auto scrollbar-hide">
                    {['Médicos', 'Psicólogos', 'Dentistas', 'Farmacêuticos'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:text-primary'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {professionals.map((prof, idx) => (
                        <motion.div
                            key={prof.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <ProfessionalGridCard {...prof} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 bg-green-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-green-600/20"
            >
                <div className="space-y-2 text-center md:text-left">
                    <h4 className="font-bold text-xl leading-tight">Não encontrou o profissional que procurava?</h4>
                    <p className="text-white/80 text-sm">Nossa equipe de concierge pode ajudar você a encontrar o especialista ideal para sua necessidade específica.</p>
                </div>
                <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-gray-50 transition-colors whitespace-nowrap">Solicitar Indicação</button>
            </motion.div>
        </div>
    );
};

// --- Page: Appointments ---
const AppointmentLogCard = ({ date, month, time, doctor, description, status, type }: { date: string, month: string, time: string, doctor: string, description: string, status?: string, type: string }) => (
    <div className={`p-6 rounded-2xl border ${status === 'next' ? 'bg-primary/5 dark:bg-primary/10 border-primary/20 relative overflow-hidden' : 'bg-white dark:bg-dark-surface border-gray-100 dark:border-white/10 opacity-90'}`}>
        {status === 'next' && <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-white text-[10px] font-bold uppercase rounded-bl-xl shadow-sm">Próxima</div>}
        <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className={`flex-shrink-0 text-center md:border-r ${status === 'next' ? 'border-primary/20' : 'border-gray-100 dark:border-white/10'} md:pr-6 ${status !== 'next' && 'opacity-60'}`}>
                <p className="text-xs font-bold uppercase text-primary">{month}</p>
                <p className="text-3xl font-black">{date}</p>
                <p className="text-sm font-medium">{time}</p>
            </div>
            <div className="flex-1">
                <span className="px-2 py-0.5 text-[10px] font-bold rounded uppercase bg-primary/20 text-primary">{type}</span>
                <h4 className="text-lg font-bold">{doctor}</h4>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-md">{status === 'next' ? 'Entrar na Sala' : 'Ver Retorno'}</button>
        </div>
    </div>
);

const AppointmentsPage = () => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-8">
                <section className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">event_available</span>
                        Agendar Consulta
                    </h3>
                    <div className="bg-white dark:bg-[#1a2e20] p-6 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="font-bold">Outubro 2023</h4>
                            <div className="flex gap-2">
                                <button className="p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                                <button className="p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 text-center text-xs font-bold text-gray-400 mb-4">
                            <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
                        </div>
                        <div className="grid grid-cols-7 text-center gap-y-2">
                            <span className="p-2 text-gray-300">1</span><span className="p-2">2</span><span className="p-2">3</span><span className="p-2">4</span><span className="p-2">5</span><span className="p-2">6</span><span className="p-2">7</span>
                            <span className="p-2">8</span><span className="p-2">9</span><span className="p-2">10</span><span className="p-2">11</span><span className="p-2">12</span><span className="p-2">13</span><span className="p-2">14</span>
                            <span className="p-2">15</span><span className="p-2">16</span><span className="p-2">17</span><span className="p-2">18</span><span className="p-2">19</span><span className="p-2">20</span><span className="p-2">21</span>
                            <span className="p-2">22</span><span className="p-2">23</span><span className="p-2 bg-primary/20 text-primary font-bold rounded-full">24</span><span className="p-2">25</span><span className="p-2">26</span><span className="p-2">27</span><span className="p-2">28</span>
                            <span className="p-2">29</span><span className="p-2">30</span><span className="p-2">31</span>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h3 className="text-lg font-bold px-1">Médicos da sua Instituição</h3>
                    <div className="space-y-3">
                        <div className="bg-white dark:bg-[#1a2e20] p-4 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-4 hover:border-primary/40 transition-colors group cursor-pointer">
                            <div className="w-12 h-12 rounded-lg bg-cover bg-center bg-gray-100" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD80dArObbYpuXgVgJ8NNJ7sYtznk2tjUDomJsAvfvtiM4vNnQMVbEkd0bYqCrSGFH_JTgANLQO7YIw0Nfh_1MsGQtU8iZtBt5fNeOs5uvVGr3TK8QEGwzl9dUeK4RW_0_A287HMttjG1ZNMh7ts4qohYVfZTD0qjTdnVa9QWGSXQJDPnFC3uFlI3K1eO3b4T-gqUZ3FNvutAjaDM5W90uNEa-grRuYGvoguFLn07zYHQh9c_tS8ADOvNbNT2ky4AFaSgoMbrmnTg')" }}></div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm">Dra. Letícia Oliveira</h4>
                                <p className="text-xs text-[#4e9767]">Clínica Geral • Canabinologia</p>
                            </div>
                            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">chevron_right</span>
                        </div>
                        <div className="bg-white dark:bg-[#1a2e20] p-4 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-4 hover:border-primary/40 transition-colors group cursor-pointer">
                            <div className="w-12 h-12 rounded-lg bg-cover bg-center bg-gray-100" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCu5uFFzFQ9gu487H4VYjlgrjb23oktCIg8IB1ovGXJiOUVHW35oWP_54imRyhHVxofd97r1vNKTYcxssuU4FI9n8xXPPa_6E4meW_Lw9whqR_QAmRxYiHRESmLE_t1JJr5W3G8aXolc5i3Ya6yFp2QqPIozZ4zc1O3FEjZj1P9L2sinY_CbTNwu38fid4Zxo4MA8KRlDUXLYlaT85fXS76m6hNWG0FiKr1dSQVhoU2kfqt7qoE7MYOB99EO_P__i6FiBUgvEYzWCYAtBO73nYcDIDpjHLyKuE0')" }}></div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm">Dr. Roberto Santos</h4>
                                <p className="text-xs text-[#4e9767]">Neurologista</p>
                            </div>
                            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">chevron_right</span>
                        </div>
                        <div className="bg-white dark:bg-[#1a2e20] p-4 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-4 hover:border-primary/40 transition-colors group cursor-pointer">
                            <div className="w-12 h-12 rounded-lg bg-cover bg-center bg-gray-100" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDH7N1-GMwM8HYy8LjJ-CqcUbryNZ66_gLO43HVtrqUk_wOiRVxrUDsD5G6Ny_tH8PQVoftEEUvF5bJPn7TeAOSqaZ0DoQPXT6ciAiYwbTbu-Xo4DYmewq9SWg9e6Kelol2rD4cEyaPo-ICRTK35cnJ1Z1iuHZbZLe-dRMR_cyDlaBOAGq8xOioPFqqL86eD19xdMNAApN3lE256vqosLYhNbo22dwEkxI29REU_P__i6FiBUgvEYzWCYAtBO73nYcDIDpjHLyKuE0')" }}></div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm">Dra. Ana Paula</h4>
                                <p className="text-xs text-[#4e9767]">Psiquiatra</p>
                            </div>
                            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">chevron_right</span>
                        </div>
                    </div>
                </section>
            </div>

            <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">history</span>
                        Meu Histórico de Consultas
                    </h3>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-500">Filtrar</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Next Appointment Card */}
                    <div className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/20 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-white text-[10px] font-bold uppercase rounded-bl-xl">Próxima</div>
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="flex-shrink-0 text-center md:border-r border-primary/20 md:pr-6">
                                <p className="text-xs font-bold text-primary uppercase">Setembro</p>
                                <p className="text-3xl font-black">24</p>
                                <p className="text-sm font-medium">Terça, 14:30</p>
                            </div>
                            <div className="flex-1 space-y-1">
                                <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-bold rounded uppercase">Consulta Inicial</span>
                                <h4 className="text-lg font-bold">Dra. Letícia Oliveira</h4>
                                <p className="text-sm text-gray-500">Unidade Jardins - São Paulo / Online</p>
                            </div>
                            <div className="flex flex-col gap-2 min-w-[140px]">
                                <button className="bg-primary text-white px-4 py-2.5 rounded-lg font-bold text-sm shadow-md hover:opacity-90 transition-opacity">Entrar na Sala</button>
                                <button className="text-gray-500 text-xs font-bold hover:underline">Reagendar</button>
                            </div>
                        </div>
                    </div>

                    {/* Past Appointment 1 */}
                    <div className="bg-white dark:bg-[#1a2e20] p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="flex-shrink-0 text-center md:border-r border-gray-100 dark:border-white/10 md:pr-6">
                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Agosto</p>
                                <p className="text-3xl font-black">12</p>
                                <p className="text-sm font-medium">Segunda, 10:00</p>
                            </div>
                            <div className="flex-1 space-y-1">
                                <span className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-gray-500 text-[10px] font-bold rounded uppercase">Retorno</span>
                                <h4 className="text-lg font-bold">Dr. Roberto Santos</h4>
                                <p className="text-sm text-gray-500">Consulta via Telemedicina</p>
                            </div>
                            <div className="min-w-[140px]">
                                <button className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white px-4 py-2.5 rounded-lg font-bold text-sm border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                    <span className="material-symbols-outlined text-sm">receipt_long</span>
                                    Ver Receita
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Past Appointment 2 */}
                    <div className="bg-white dark:bg-[#1a2e20] p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="flex-shrink-0 text-center md:border-r border-gray-100 dark:border-white/10 md:pr-6">
                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Julho</p>
                                <p className="text-3xl font-black">15</p>
                                <p className="text-sm font-medium">Segunda, 16:15</p>
                            </div>
                            <div className="flex-1 space-y-1">
                                <span className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-gray-500 text-[10px] font-bold rounded uppercase">Consulta</span>
                                <h4 className="text-lg font-bold">Dra. Letícia Oliveira</h4>
                                <p className="text-sm text-gray-500">Acompanhamento de Dosagem</p>
                            </div>
                            <div className="min-w-[140px]">
                                <button className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white px-4 py-2.5 rounded-lg font-bold text-sm border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                    <span className="material-symbols-outlined text-sm">visibility</span>
                                    Ver Retorno
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Past Appointment 3 */}
                    <div className="bg-white dark:bg-[#1a2e20] p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="flex-shrink-0 text-center md:border-r border-gray-100 dark:border-white/10 md:pr-6">
                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Junho</p>
                                <p className="text-3xl font-black">28</p>
                                <p className="text-sm font-medium">Sexta, 09:30</p>
                            </div>
                            <div className="flex-1 space-y-1">
                                <span className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-gray-500 text-[10px] font-bold rounded uppercase">Acompanhamento</span>
                                <h4 className="text-lg font-bold">Dr. Roberto Santos</h4>
                                <p className="text-sm text-gray-500">Avaliação de Exames Laboratoriais</p>
                            </div>
                            <div className="min-w-[140px]">
                                <button className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white px-4 py-2.5 rounded-lg font-bold text-sm border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                    <span className="material-symbols-outlined text-sm">description</span>
                                    Ver Laudo
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Past Appointment 4 */}
                    <div className="bg-white dark:bg-[#1a2e20] p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="flex-shrink-0 text-center md:border-r border-gray-100 dark:border-white/10 md:pr-6">
                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Maio</p>
                                <p className="text-3xl font-black">10</p>
                                <p className="text-sm font-medium">Sexta, 11:45</p>
                            </div>
                            <div className="flex-1 space-y-1">
                                <span className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-gray-500 text-[10px] font-bold rounded uppercase">Triagem</span>
                                <h4 className="text-lg font-bold">Dra. Letícia Oliveira</h4>
                                <p className="text-sm text-gray-500">Sessão de Triagem e Anamnese</p>
                            </div>
                            <div className="min-w-[140px]">
                                <button className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white px-4 py-2.5 rounded-lg font-bold text-sm border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                    <span className="material-symbols-outlined text-sm">history_edu</span>
                                    Ver Prontuário
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-green-600 rounded-2xl p-6 text-white flex items-center justify-between">
                    <div className="space-y-1">
                        <h4 className="font-bold text-lg leading-tight">Precisa de ajuda com o agendamento?</h4>
                        <p className="text-white/80 text-sm">Nossa concierge está disponível para auxiliar você.</p>
                    </div>
                    <button className="bg-white text-green-600 px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg whitespace-nowrap ml-4">Falar com Suporte</button>
                </div>
            </div>
        </div>
    </div>
);

// --- Page: Login ---
const LoginPage = ({ onLogin, onSwitchToRegister, isDarkMode }: { onLogin: () => void, onSwitchToRegister: () => void, isDarkMode: boolean }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple mock login validation
        if (email && password) {
            onLogin();
        } else {
            alert('Por favor, preencha o email e a senha.');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen bg-background-light dark:bg-background-dark font-display text-text-main dark:text-white transition-colors duration-200">
            {/* Left Panel - Hidden on mobile, visible on LG+ */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#112116]">
                <img
                    alt="Doctor"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXdPRVe8aviHVjb4qqOYNPzRhQMcB-NjJf4qyx8IIQC2rkYxzL01CII380Sd4yCIAQ3uGEpRhyZHICpEO77GHqVfDVSyyX79snnhW2_g3DSy1LmTNZ4GR3COLHYe1FtOxxnNHoPuc8eKyERa4sOnNviTTYg9YAIdmQMJ5AO8SM472JqPDouRXF_ao4tLMhnFoeGCaeA_S84wJdYeoJ240IkUaAbOQDER-8CTWHr5dsji5XjrGbGhPuS51HiWNRW_UNA6MjZazTxw"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#112116] via-[#112116]/40 to-transparent"></div>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#112116] via-transparent to-[#112116]/20"></div>
                <div className="relative z-20 flex flex-col justify-end p-20 text-white w-full h-full">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="size-12 text-primary">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fill-rule="evenodd"></path>
                                <path clip-rule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fill-rule="evenodd"></path>
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Rootcare</h1>
                    </div>
                    <div className="max-w-xl">
                        <h2 className="text-5xl font-black leading-tight mb-4 drop-shadow-lg">Tratamento medicinal integrado com precisão.</h2>
                        <p className="text-xl text-gray-100 max-w-md drop-shadow-md">Cuidado humanizado que conecta tecnologia e saúde para o seu bem-estar.</p>
                    </div>
                    <div className="mt-12 flex gap-8 border-t border-white/20 pt-8">
                        <div>
                            <span className="block text-2xl font-bold">100%</span>
                            <span className="text-sm text-gray-300">Cuidado Centrado no Paciente</span>
                        </div>
                        <div>
                            <span className="block text-2xl font-bold">Safe</span>
                            <span className="text-sm text-gray-300">Conformidade Regulatória</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 py-8 md:px-6 md:py-12 bg-white dark:bg-background-dark">
                {/* Mobile Header */}
                <div className="lg:hidden flex items-center gap-2 mb-8 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                    <span className="material-symbols-outlined text-primary font-bold">eco</span>
                    <span className="text-primary font-black uppercase text-xs tracking-widest">Rootcare</span>
                </div>
                <div className="w-full max-w-[440px] flex flex-col">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="size-10 text-primary">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fill-rule="evenodd"></path>
                                <path clip-rule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fill-rule="evenodd"></path>
                            </svg>
                        </div>
                        <h2 className="text-[#0e1b12] dark:text-white text-2xl font-bold tracking-tight">Rootcare</h2>
                    </div>
                    <div className="mb-8">
                        <h1 className="text-[#0e1b12] dark:text-white text-3xl font-bold tracking-tight mb-2">Bem-vindo de volta</h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Entre com suas credenciais para gerenciar seu tratamento de forma segura.</p>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label className="text-[#0e1b12] dark:text-white text-sm font-medium">Email</label>
                            <div className="relative flex items-center">
                                <span className="absolute left-4 text-gray-400 material-symbols-outlined">mail</span>
                                <input
                                    className="w-full pl-12 pr-4 py-4 bg-[#f1f5f9] dark:bg-[#1a2e20] border border-[#e2e8f0] dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-[#0e1b12] dark:text-white placeholder:text-gray-400"
                                    placeholder="exemplo@email.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        WebkitBoxShadow: `0 0 0px 1000px ${isDarkMode ? '#1a2e20' : '#f1f5f9'} inset`,
                                        WebkitTextFillColor: isDarkMode ? '#fff' : '#0e1b12'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label className="text-[#0e1b12] dark:text-white text-sm font-medium">Senha</label>
                                <a className="text-[#30e86e] text-sm font-bold hover:underline" href="#">Esqueceu a senha?</a>
                            </div>
                            <div className="relative flex items-center">
                                <span className="absolute left-4 text-gray-400 material-symbols-outlined">lock</span>
                                <input
                                    className="w-full pl-12 pr-12 py-4 bg-[#f1f5f9] dark:bg-[#1a2e20] border border-[#e2e8f0] dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-[#0e1b12] dark:text-white placeholder:text-gray-400"
                                    placeholder="Sua senha"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{
                                        WebkitBoxShadow: `0 0 0px 1000px ${isDarkMode ? '#1a2e20' : '#f1f5f9'} inset`,
                                        WebkitTextFillColor: isDarkMode ? '#fff' : '#0e1b12'
                                    }}
                                />
                                <button className="absolute right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" type="button">
                                    <span className="material-symbols-outlined">visibility</span>
                                </button>
                            </div>
                        </div>
                        <div className="pt-2">
                            <button className="w-full bg-[#2df377] hover:bg-[#28e16d] text-background-dark font-black py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] text-lg" type="submit">
                                <span className="truncate">Entrar</span>
                                <span className="material-symbols-outlined text-[24px]">login</span>
                            </button>
                        </div>
                    </form>
                    <div className="mt-8 flex items-center justify-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">Não tem uma conta?</span>
                        <button
                            onClick={onSwitchToRegister}
                            className="text-[#0e1b12] dark:text-white font-bold text-sm hover:text-primary transition-colors"
                        >
                            Cadastre-se agora
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Page: Register ---
const RegisterPage = ({ onBackToLogin, isDarkMode }: { onBackToLogin: () => void, isDarkMode: boolean }) => {
    const [step, setStep] = useState(1);
    const [userType, setUserType] = useState('paciente');

    return (
        <div className="flex min-h-screen w-full bg-white dark:bg-background-dark font-display">
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#112116]">
                <img
                    alt="Smiling doctor"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAii9FSfW08r8Zs0Jhm_7e24VC2KSeYU3knCsknNrgO4YthJBocBIbFpcRWQDpSpoECJ9P6ST4HIaibUR--s_0lFu_XmWXiuP7GoJ7I6cl1ere25wfpjbJdaC4Ir1Ttxm5i0Uf1FDHXESk7D7jgOCmo5XF0N83UmQC84ZKbfihAQ3GaKk2t-5PQkjO9JpCtrKO5aGY1LgT7AfQoKRTvqKH29MSlkvz_ZdPZo9F65vf0pi8PqEsnoOdC9KLAhwWNbSBJE1HuzvO08-g"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#112116] via-[#112116]/40 to-transparent"></div>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#112116] via-transparent to-[#112116]/20"></div>
                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    <div className="flex items-center gap-3 text-white">
                        <div className="size-10">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="#30e86e" fillRule="evenodd"></path>
                                <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="#30e86e" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <span className="text-2xl font-bold tracking-tight">Rootcare</span>
                    </div>
                    <div className="max-w-lg">
                        <h2 className="text-4xl font-bold text-white mb-6 leading-tight drop-shadow-lg">Cuidado humano e tecnologia para o seu bem-estar.</h2>
                        <p className="text-lg text-gray-100 leading-relaxed font-medium drop-shadow-md">Conectamos pacientes a especialistas para um tratamento de cannabis medicinal integrado, seguro e personalizado.</p>
                    </div>
                    <div className="text-sm text-gray-300">
                        © 2024 Rootcare. Todos os direitos reservados.
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col bg-white dark:bg-background-dark overflow-y-auto scrollbar-hide">
                <div className="max-w-[540px] w-full mx-auto px-6 py-12 lg:py-16 flex flex-col h-full">
                    {step < 3 && (
                        <>
                            <div className="flex lg:hidden items-center gap-3 mb-10">
                                <div className="size-8">
                                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="#30e86e" fillRule="evenodd"></path>
                                        <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="#30e86e" fillRule="evenodd"></path>
                                    </svg>
                                </div>
                                <span className="text-xl font-bold">Rootcare</span>
                            </div>

                            <div className="mb-8">
                                <button
                                    onClick={() => step > 1 ? setStep(step - 1) : onBackToLogin()}
                                    className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-4 group"
                                >
                                    <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
                                    <span className="text-xs font-bold uppercase tracking-wider">Voltar</span>
                                </button>
                                <h1 className="text-3xl font-extrabold text-[#0e1b12] dark:text-white mb-2 font-display">
                                    {step === 1 ? 'Criar sua conta' : 'Segurança da conta'}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {step === 1 ? 'Junte-se à nossa plataforma de saúde integrada.' : 'Defina sua senha de acesso para continuar.'}
                                </p>
                            </div>

                            <div className="mb-10">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-xs font-bold text-primary tracking-wider uppercase">Passo {step} de 3: {step === 1 ? 'Perfil' : 'Senhas'}</span>
                                    <span className="text-xs font-medium text-gray-500">{step === 1 ? '33%' : '66%'} concluído</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-500"
                                        style={{ width: `${(step / 3) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                {step === 1 && (
                                    <>
                                        <div className="mb-10">
                                            <h3 className="text-sm font-bold text-[#0e1b12] dark:text-gray-200 mb-4">Como você deseja usar o Rootcare?</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setUserType('paciente')}
                                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${userType === 'paciente' ? 'border-primary bg-primary/5 text-[#0e1b12] dark:text-white' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 hover:border-primary/50'}`}
                                                >
                                                    <span className={`material-symbols-outlined mb-2 text-3xl ${userType === 'paciente' ? 'text-primary' : ''}`}>person</span>
                                                    <span className="text-sm font-bold">Paciente</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setUserType('medico')}
                                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${userType === 'medico' ? 'border-primary bg-primary/5 text-[#0e1b12] dark:text-white' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 hover:border-primary/50'}`}
                                                >
                                                    <span className={`material-symbols-outlined mb-2 text-3xl ${userType === 'medico' ? 'text-primary' : ''}`}>medical_services</span>
                                                    <span className="text-sm font-bold">Médico</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setUserType('profissional')}
                                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${userType === 'profissional' ? 'border-primary bg-primary/5 text-[#0e1b12] dark:text-white' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 hover:border-primary/50'}`}
                                                >
                                                    <span className={`material-symbols-outlined mb-2 text-3xl ${userType === 'profissional' ? 'text-primary' : ''}`}>clinical_notes</span>
                                                    <span className="text-sm font-bold">Profissional</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-5">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-tight" htmlFor="fullname">Nome Completo</label>
                                                <input
                                                    className="block w-full px-4 py-4 bg-[#f1f5f9] dark:bg-[#1a2e20] border border-[#e2e8f0] dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-[#0e1b12] dark:text-white placeholder:text-gray-400"
                                                    id="fullname"
                                                    placeholder="Seu nome completo"
                                                    type="text"
                                                    style={{
                                                        WebkitBoxShadow: `0 0 0px 1000px ${isDarkMode ? '#1a2e20' : '#f1f5f9'} inset`,
                                                        WebkitTextFillColor: isDarkMode ? '#fff' : '#0e1b12'
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-tight" htmlFor="email">E-mail</label>
                                                <input
                                                    className="block w-full px-4 py-4 bg-[#f1f5f9] dark:bg-[#1a2e20] border border-[#e2e8f0] dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-[#0e1b12] dark:text-white placeholder:text-gray-400"
                                                    id="email"
                                                    placeholder="seu@email.com"
                                                    type="email"
                                                    style={{
                                                        WebkitBoxShadow: `0 0 0px 1000px ${isDarkMode ? '#1a2e20' : '#f1f5f9'} inset`,
                                                        WebkitTextFillColor: isDarkMode ? '#fff' : '#0e1b12'
                                                    }}
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-tight" htmlFor="cpf">CPF / Documento</label>
                                                    <input
                                                        className="block w-full px-4 py-4 bg-[#f1f5f9] dark:bg-[#1a2e20] border border-[#e2e8f0] dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-[#0e1b12] dark:text-white placeholder:text-gray-400"
                                                        id="cpf"
                                                        placeholder="000.000.000-00"
                                                        type="text"
                                                        style={{
                                                            WebkitBoxShadow: `0 0 0px 1000px ${isDarkMode ? '#1a2e20' : '#f1f5f9'} inset`,
                                                            WebkitTextFillColor: isDarkMode ? '#fff' : '#0e1b12'
                                                        }}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-tight" htmlFor="association">Associação</label>
                                                    <select
                                                        className="block w-full px-4 py-4 bg-[#f1f5f9] dark:bg-[#1a2e20] border border-[#e2e8f0] dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-[#0e1b12] dark:text-white"
                                                        id="association"
                                                        style={{
                                                            WebkitBoxShadow: `0 0 0px 1000px ${isDarkMode ? '#1a2e20' : '#f1f5f9'} inset`,
                                                            WebkitTextFillColor: isDarkMode ? '#fff' : '#0e1b12'
                                                        }}
                                                    >
                                                        <option disabled value="">Vínculo opcional</option>
                                                        <option value="1">Associação Abrace Esperança</option>
                                                        <option value="2">Apepi</option>
                                                        <option value="3">Cultive</option>
                                                        <option value="4">Não possuo vínculo</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {step === 2 && (
                                    <div className="space-y-5">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-tight" htmlFor="password">Senha de Acesso</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined">lock</span>
                                                <input
                                                    className="block w-full pl-12 pr-4 py-4 bg-[#f1f5f9] dark:bg-[#1a2e20] border border-[#e2e8f0] dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-[#0e1b12] dark:text-white placeholder:text-gray-400"
                                                    id="password"
                                                    placeholder="Mínimo 8 caracteres"
                                                    type="password"
                                                    style={{
                                                        WebkitBoxShadow: `0 0 0px 1000px ${isDarkMode ? '#1a2e20' : '#f1f5f9'} inset`,
                                                        WebkitTextFillColor: isDarkMode ? '#fff' : '#0e1b12'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-tight" htmlFor="confirm-password">Confirmar Senha</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined">security</span>
                                                <input
                                                    className="block w-full pl-12 pr-4 py-4 bg-[#f1f5f9] dark:bg-[#1a2e20] border border-[#e2e8f0] dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-[#0e1b12] dark:text-white placeholder:text-gray-400"
                                                    id="confirm-password"
                                                    placeholder="Repita sua senha"
                                                    type="password"
                                                    style={{
                                                        WebkitBoxShadow: `0 0 0px 1000px ${isDarkMode ? '#1a2e20' : '#f1f5f9'} inset`,
                                                        WebkitTextFillColor: isDarkMode ? '#fff' : '#0e1b12'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                                            <div className="flex items-start gap-3">
                                                <span className="material-symbols-outlined text-primary text-xl">info</span>
                                                <p className="text-xs text-gray-500 leading-relaxed">Sua senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-6">
                                    <button
                                        onClick={() => setStep(step + 1)}
                                        className="w-full bg-primary hover:bg-primary-dark text-[#0e1b12] font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
                                        type="button"
                                    >
                                        <span>{step === 2 ? 'Finalizar Cadastro' : 'Próximo Passo'}</span>
                                        <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
                                            {step === 2 ? 'check_circle' : 'arrow_forward'}
                                        </span>
                                    </button>
                                </div>
                            </form>

                            <div className="mt-10 flex flex-col items-center gap-4">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Já possui uma conta? <button onClick={onBackToLogin} className="text-primary font-bold hover:underline">Fazer Login</button>
                                </p>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                            <div className="size-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-8">
                                <span className="material-symbols-outlined text-5xl">task_alt</span>
                            </div>
                            <h1 className="text-3xl font-black text-[#0e1b12] dark:text-white mb-4">Cadastro realizado!</h1>
                            <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-10">Enviamos um e-mail de confirmação para você. Verifique sua caixa de entrada para ativar sua conta.</p>
                            <button
                                onClick={onBackToLogin}
                                className="w-full max-w-xs bg-[#0e1b12] dark:bg-primary text-white dark:text-[#0e1b12] font-bold py-4 rounded-xl shadow-xl transition-all hover:scale-[1.02]"
                            >
                                Ir para o Login
                            </button>
                        </div>
                    )}

                    <div className="mt-auto pt-10 flex items-center justify-center gap-6">
                        <a className="text-xs text-gray-400 hover:text-primary transition-colors" href="#">Termos de Uso</a>
                        <a className="text-xs text-gray-400 hover:text-primary transition-colors" href="#">Privacidade</a>
                        <a className="text-xs text-gray-400 hover:text-primary transition-colors" href="#">Suporte</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Page: Product Details ---
const ProductDetailsPage = ({ product, onBack, onAddToCart }: { product: any, onBack: () => void, onAddToCart: (product: any, qty: number) => void }) => {
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


// --- Page: Cart ---
const CartPage = ({ items, onUpdateQuantity, onCheckout, onBack }: { items: CartItem[], onUpdateQuantity: (name: string, delta: number) => void, onCheckout: () => void, onBack: () => void }) => {
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

// --- Page: Checkout ---
const CheckoutPage = ({ total, onComplete, onBack }: { total: number, onComplete: () => void, onBack: () => void }) => {
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

// --- Page: Success ---
const SuccessPage = ({ onHome }: { onHome: () => void }) => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 text-primary">
            <span className="material-symbols-outlined text-5xl">check_circle</span>
        </div>
        <h2 className="text-3xl font-black mb-2">Pedido Confirmado!</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
            Seu pedido foi recebido e já está sendo processado. Você receberá atualizações por e-mail e pode acompanhar o status em "Meus Pedidos".
        </p>
        <button
            onClick={onHome}
            className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
        >
            Voltar para o Início
        </button>
    </div>
);

// --- Page: Profile ---
const ProfilePage = ({ isDarkMode }: { isDarkMode: boolean }) => {
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
                <div className="bg-[#112116] p-6 rounded-2xl text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute -right-8 -top-8 size-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500" />
                    <div className="flex flex-col h-full relative z-10">
                        <div className="size-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6">
                            <span className="material-symbols-outlined text-2xl">support_agent</span>
                        </div>
                        <h3 className="text-lg font-black mb-2">Suporte ao Paciente</h3>
                        <p className="text-gray-400 text-sm font-medium mb-auto">Atendimento especializado 24/7 para tirar suas dúvidas sobre o tratamento.</p>
                        <button className="w-full mt-6 py-3 bg-primary text-white font-black rounded-xl text-sm shadow-lg shadow-primary/20 hover:brightness-105 transition-all">Iniciar Chat Agora</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main App ---
export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authView, setAuthView] = useState<'login' | 'register'>('login');
    const [activePage, setActivePage] = useState<Page>('dashboard');
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    const [isPharmacyExpanded, setIsPharmacyExpanded] = useState(false);
    const [isDocumentsExpanded, setIsDocumentsExpanded] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const addToCart = (product: any, qty: number = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.name === product.name);
            if (existing) {
                return prev.map(item => item.name === product.name ? { ...item, quantity: item.quantity + qty } : item);
            }
            const priceValue = parseFloat(product.price.replace('R$', '').replace('.', '').replace(',', '.'));
            return [...prev, {
                name: product.name,
                price: priceValue,
                priceString: product.price,
                image: product.image,
                category: product.category,
                quantity: qty
            }];
        });
    };

    const updateCartQuantity = (name: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.name === name) {
                const newQty = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const clearCart = () => setCart([]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setAuthView('login');
    };

    if (!isAuthenticated) {
        return authView === 'login'
            ? <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setAuthView('register')} isDarkMode={isDarkMode} />
            : <RegisterPage onBackToLogin={() => setAuthView('login')} isDarkMode={isDarkMode} />;
    }

    return (
        <div className={`flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display transition-colors duration-200`}>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-72 flex-shrink-0 border-r border-gray-200 dark:border-white/10 bg-white dark:bg-dark-surface flex-col p-6 overflow-y-auto scrollbar-hide">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/20 p-2 rounded-lg cursor-pointer" onClick={() => setActivePage('dashboard')}>
                                <span className="material-symbols-outlined text-primary text-2xl font-bold">eco</span>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-lg font-bold uppercase tracking-wider">Rootcare</h1>
                                <p className="text-text-muted text-xs font-medium">Portal do Paciente</p>
                            </div>
                        </div>
                        <button onClick={toggleDarkMode} className="p-2 rounded-lg text-gray-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
                        </button>
                    </div>
                    <nav className="flex flex-col gap-1">
                        <SidebarItem icon="grid_view" label="Dashboard" active={activePage === 'dashboard'} onClick={() => setActivePage('dashboard')} />
                        <SidebarItem icon="edit_note" label="Relatos do Paciente" active={activePage === 'reports'} onClick={() => setActivePage('reports')} />

                        <div className="flex flex-col gap-1 mt-2">
                            <SidebarItem
                                icon="shopping_basket"
                                label="Farmácia Medicinal"
                                active={['pharmacy', 'cart', 'orders', 'addresses', 'product_details'].includes(activePage)}
                                onClick={() => setIsPharmacyExpanded(!isPharmacyExpanded)}
                                hasSubmenu={true}
                                isExpanded={isPharmacyExpanded}
                            />
                            <AnimatePresence>
                                {isPharmacyExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="flex flex-col gap-0.5 mb-2 overflow-hidden"
                                    >
                                        <SidebarSubItem label="Medicamentos" active={activePage === 'pharmacy' || activePage === 'product_details'} onClick={() => setActivePage('pharmacy')} />
                                        <SidebarSubItem label="Meu Carrinho" active={activePage === 'cart'} onClick={() => setActivePage('cart')} />
                                        <SidebarSubItem label="Meus Pedidos" active={activePage === 'orders'} onClick={() => setActivePage('orders')} />
                                        <SidebarSubItem label="Meus Endereços" active={activePage === 'addresses'} onClick={() => setActivePage('addresses')} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <SidebarItem icon="calendar_month" label="Consultas" active={activePage === 'appointments'} onClick={() => setActivePage('appointments')} />

                        <div className="flex flex-col gap-1 mt-2">
                            <SidebarItem
                                icon="folder_shared"
                                label="Documentação"
                                active={activePage === 'documents' || activePage === 'anvisa'}
                                onClick={() => setIsDocumentsExpanded(!isDocumentsExpanded)}
                                hasSubmenu={true}
                                isExpanded={isDocumentsExpanded}
                            />
                            <AnimatePresence>
                                {isDocumentsExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="flex flex-col gap-0.5 mb-2 overflow-hidden"
                                    >
                                        <SidebarSubItem label="Meus Arquivos" active={activePage === 'documents'} onClick={() => setActivePage('documents')} />
                                        <SidebarSubItem label="Autorização Anvisa" active={activePage === 'anvisa'} onClick={() => setActivePage('anvisa')} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <SidebarItem icon="medication" label="Profissionais" active={activePage === 'professionals'} onClick={() => setActivePage('professionals')} />
                    </nav>
                    <div className="flex flex-col gap-4 pt-4">
                        <SidebarInfoCard icon="verified" label="Associação Curativa" title="João Silva" subtitle="Membro Ativo" />
                        <SidebarInfoCard icon="description" label="Receituário" title="Válido até 15/12" subtitle="2 Itens restantes" variant="warning" actionLabel="Ver PDF" />
                        <SidebarInfoCard icon="local_shipping" label="Próximo Pedido" title="Chega em 3 dias" subtitle="Rastrear Entrega" variant="default" actionLabel="Ver Detalhes" />
                    </div>
                </div>
                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/10 flex items-center gap-3 cursor-pointer group" onClick={() => setActivePage('profile')}>
                    <div className="w-10 h-10 rounded-full bg-cover border-2 border-transparent group-hover:border-primary transition-all" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrtKeZhqdggv1wsvLq0DOybOiQ2V61oHjkC7mifSoS1wgPTqxFGcLwD0hU12IWe8h048zjzVk4KBcVXZJfD3HhIQGQE13UGkr9vgHsTHkhzkvedoTfIFr8bGoY3FLcrrND7LIzLXWN0lLbDZNZeDTLuJuyaanCdBCLujd9z48xs3Cq-5YH6vdvImklSwX-P6rcOomkyhB58u-JDr6WudVZOQDNWeOqVQaZ8SjwJ6U5UichLoW_SBmtVg_aWfw2mlD6irLV2JHlYMI')" }}></div>
                    <div className="flex flex-col">
                        <p className="text-sm font-bold group-hover:text-primary transition-colors">João Silva</p>
                        <p className="text-xs text-gray-500">ID: #4429</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); handleLogout(); }} className="ml-auto text-gray-400 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-sm">logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-surface border-t border-gray-100 dark:border-white/10 px-6 py-3 z-50 flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <button onClick={() => setActivePage('dashboard')} className={`flex flex-col items-center gap-1 ${activePage === 'dashboard' ? 'text-primary' : 'text-gray-400'}`}>
                    <span className="material-symbols-outlined text-2xl">grid_view</span>
                    <span className="text-[10px] font-bold">Início</span>
                </button>
                <button onClick={() => setActivePage('pharmacy')} className={`flex flex-col items-center gap-1 ${activePage === 'pharmacy' ? 'text-primary' : 'text-gray-400'}`}>
                    <span className="material-symbols-outlined text-2xl">shopping_basket</span>
                    <span className="text-[10px] font-bold">Loja</span>
                </button>
                <button onClick={() => setActivePage('appointments')} className={`flex flex-col items-center gap-1 ${activePage === 'appointments' ? 'text-primary' : 'text-gray-400'}`}>
                    <span className="material-symbols-outlined text-2xl">calendar_month</span>
                    <span className="text-[10px] font-bold">Agenda</span>
                </button>
                <button onClick={() => setActivePage('orders')} className={`flex flex-col items-center gap-1 ${activePage === 'orders' ? 'text-primary' : 'text-gray-400'}`}>
                    <span className="material-symbols-outlined text-2xl">shopping_bag</span>
                    <span className="text-[10px] font-bold">Pedidos</span>
                </button>
                <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-500">
                    <span className="material-symbols-outlined text-2xl">logout</span>
                    <span className="text-[10px] font-bold">Sair</span>
                </button>
            </nav>

            <main className="flex-1 overflow-y-auto bg-[#fdfdfd] dark:bg-background-dark custom-scrollbar pb-24 lg:pb-0">
                <header className="bg-white dark:bg-dark-surface border-b border-gray-100 dark:border-white/10 px-4 md:px-8 py-4 sticky top-0 z-10 transition-colors">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-3 lg:hidden">
                            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-gray-400 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                            <div className="bg-primary p-1.5 rounded-lg text-white">
                                <span className="material-symbols-outlined text-xl font-bold">eco</span>
                            </div>
                            <h1 className="text-sm font-bold uppercase tracking-wider">Rootcare</h1>
                        </div>
                        <h2 className="text-base md:text-xl font-bold uppercase tracking-wide truncate ml-2 lg:ml-0">
                            {activePage === 'dashboard' ? 'Dashboard' :
                                (activePage === 'pharmacy' || activePage === 'product_details') ? 'Farmácia Medicinal' :
                                    activePage === 'cart' ? 'Meu Carrinho' :
                                        activePage === 'checkout' ? 'Checkout' :
                                            activePage === 'payment_success' ? 'Pedido Confirmado' :
                                                activePage === 'orders' ? 'Meus Pedidos' :
                                                    activePage === 'appointments' ? 'Consultas' :
                                                        activePage === 'addresses' ? 'Meus Endereços' :
                                                            activePage === 'reports' ? 'Relatos do Paciente' :
                                                                activePage === 'documents' ? 'Documentação' :
                                                                    activePage === 'anvisa' ? 'Autorização ANVISA' :
                                                                        activePage === 'profile' ? 'Meu Perfil' :
                                                                            'Profissionais'}
                        </h2>
                        <div className="flex items-center gap-2 md:gap-4">
                            <button onClick={toggleDarkMode} className="lg:hidden p-2 rounded-lg text-gray-400 border border-gray-100 dark:border-white/5">
                                <span className="material-symbols-outlined text-sm">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
                            </button>
                            <div className="hidden sm:flex flex-col items-end mr-4">
                                <span className="text-[10px] font-bold text-primary uppercase">Status Financeiro</span>
                                <span className="text-xs font-bold text-green-600">Regular</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-6xl mx-auto p-4 md:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div key={activePage === 'product_details' ? `pd-${selectedProduct?.name}` : activePage} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.2 }}>
                            {activePage === 'dashboard' && <DashboardPage setActivePage={setActivePage} />}
                            {activePage === 'pharmacy' && (
                                <PharmacyPage
                                    onProductSelect={(product) => {
                                        setSelectedProduct(product);
                                        setActivePage('product_details');
                                    }}
                                    onAddToCart={(product) => {
                                        addToCart(product, 1);
                                        setActivePage('cart');
                                    }}
                                    onCartClick={() => setActivePage('cart')}
                                    cart={cart}
                                    cartSubtotal={cartSubtotal}
                                />
                            )}
                            {activePage === 'cart' && (
                                <CartPage
                                    items={cart}
                                    onUpdateQuantity={updateCartQuantity}
                                    onCheckout={() => setActivePage('checkout')}
                                    onBack={() => setActivePage('pharmacy')}
                                />
                            )}
                            {activePage === 'checkout' && (
                                <CheckoutPage
                                    total={cartSubtotal}
                                    onComplete={() => {
                                        clearCart();
                                        setActivePage('payment_success');
                                    }}
                                    onBack={() => setActivePage('cart')}
                                />
                            )}
                            {activePage === 'payment_success' && (
                                <SuccessPage onHome={() => setActivePage('dashboard')} />
                            )}
                            {activePage === 'orders' && <OrdersPage />}
                            {activePage === 'appointments' && <AppointmentsPage />}
                            {activePage === 'professionals' && <ProfessionalsPage />}
                            {activePage === 'addresses' && <AddressesPage />}
                            {activePage === 'reports' && <PatientReportsPage />}
                            {activePage === 'documents' && <DocumentsPage activeSubPage="documents" />}
                            {activePage === 'anvisa' && <DocumentsPage activeSubPage="anvisa" />}
                            {activePage === 'profile' && <ProfilePage isDarkMode={isDarkMode} />}
                            {activePage === 'product_details' && selectedProduct && (
                                <ProductDetailsPage
                                    product={selectedProduct}
                                    onBack={() => setActivePage('pharmacy')}
                                    onAddToCart={(product, qty) => {
                                        addToCart(product, qty);
                                        setActivePage('cart');
                                    }}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* Mobile Sidebar Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed inset-y-0 left-0 w-[280px] bg-white dark:bg-dark-surface z-[101] shadow-2xl flex flex-col p-6"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/20 p-2 rounded-lg">
                                        <span className="material-symbols-outlined text-primary text-2xl font-bold">eco</span>
                                    </div>
                                    <h1 className="text-lg font-bold uppercase tracking-wider">Rootcare</h1>
                                </div>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <nav className="flex flex-col gap-1 overflow-y-auto scrollbar-hide">
                                <SidebarItem
                                    icon="grid_view"
                                    label="Dashboard"
                                    active={activePage === 'dashboard'}
                                    onClick={() => { setActivePage('dashboard'); setIsMobileMenuOpen(false); }}
                                />
                                <SidebarItem
                                    icon="edit_note"
                                    label="Relatos do Paciente"
                                    active={activePage === 'reports'}
                                    onClick={() => { setActivePage('reports'); setIsMobileMenuOpen(false); }}
                                />

                                <div className="flex flex-col gap-1 mt-2">
                                    <SidebarItem
                                        icon="shopping_basket"
                                        label="Farmácia Medicinal"
                                        active={['pharmacy', 'cart', 'orders', 'addresses', 'product_details'].includes(activePage)}
                                        onClick={() => setIsPharmacyExpanded(!isPharmacyExpanded)}
                                        hasSubmenu={true}
                                        isExpanded={isPharmacyExpanded}
                                    />
                                    <AnimatePresence>
                                        {isPharmacyExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="flex flex-col gap-0.5 mb-2 overflow-hidden pl-4"
                                            >
                                                <SidebarSubItem label="Medicamentos" active={activePage === 'pharmacy'} onClick={() => { setActivePage('pharmacy'); setIsMobileMenuOpen(false); }} />
                                                <SidebarSubItem label="Meu Carrinho" active={activePage === 'cart'} onClick={() => { setActivePage('cart'); setIsMobileMenuOpen(false); }} />
                                                <SidebarSubItem label="Meus Pedidos" active={activePage === 'orders'} onClick={() => { setActivePage('orders'); setIsMobileMenuOpen(false); }} />
                                                <SidebarSubItem label="Meus Endereços" active={activePage === 'addresses'} onClick={() => { setActivePage('addresses'); setIsMobileMenuOpen(false); }} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <SidebarItem
                                    icon="calendar_month"
                                    label="Consultas"
                                    active={activePage === 'appointments'}
                                    onClick={() => { setActivePage('appointments'); setIsMobileMenuOpen(false); }}
                                />

                                <div className="flex flex-col gap-1 mt-2">
                                    <SidebarItem
                                        icon="folder_shared"
                                        label="Documentação"
                                        active={activePage === 'documents' || activePage === 'anvisa'}
                                        onClick={() => setIsDocumentsExpanded(!isDocumentsExpanded)}
                                        hasSubmenu={true}
                                        isExpanded={isDocumentsExpanded}
                                    />
                                    <AnimatePresence>
                                        {isDocumentsExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="flex flex-col gap-0.5 mb-2 overflow-hidden pl-4"
                                            >
                                                <SidebarSubItem label="Meus Arquivos" active={activePage === 'documents'} onClick={() => { setActivePage('documents'); setIsMobileMenuOpen(false); }} />
                                                <SidebarSubItem label="Autorização Anvisa" active={activePage === 'anvisa'} onClick={() => { setActivePage('anvisa'); setIsMobileMenuOpen(false); }} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <SidebarItem
                                    icon="medication"
                                    label="Profissionais"
                                    active={activePage === 'professionals'}
                                    onClick={() => { setActivePage('professionals'); setIsMobileMenuOpen(false); }}
                                />
                            </nav>

                            <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/10">
                                <div className="flex items-center gap-3 mb-6 cursor-pointer group" onClick={() => { setActivePage('profile'); setIsMobileMenuOpen(false); }}>
                                    <div className="w-10 h-10 rounded-full bg-cover border-2 border-transparent group-hover:border-primary transition-all" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrtKeZhqdggv1wsvLq0DOybOiQ2V61oHjkC7mifSoS1wgPTqxFGcLwD0hU12IWe8h048zjzVk4KBcVXZJfD3HhIQGQE13UGkr9vgHsTHkhzkvedoTfIFr8bGoY3FLcrrND7LIzLXWN0lLbDZNZeDTLuJuyaanCdBCLujd9z48xs3Cq-5YH6vdvImklSwX-P6rcOomkyhB58u-JDr6WudVZOQDNWeOqVQaZ8SjwJ6U5UichLoW_SBmtVg_aWfw2mlD6irLV2JHlYMI')" }} />
                                    <div className="flex flex-col text-left">
                                        <p className="text-sm font-bold group-hover:text-primary transition-colors">João Silva</p>
                                        <p className="text-xs text-gray-500">ID: #4429</p>
                                    </div>
                                    <span className="material-symbols-outlined ml-auto text-gray-300 group-hover:text-primary transition-colors">chevron_right</span>
                                </div>
                                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="p-2 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                    <span className="material-symbols-outlined">logout</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #30e86e33; border-radius: 10px; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}

