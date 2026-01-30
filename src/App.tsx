import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
type Page = 'dashboard' | 'orders' | 'appointments' | 'professionals' | 'pharmacy';

// --- Sidebar Item ---
const SidebarItem = ({ icon, label, active = false, onClick }: { icon: string, label: string, active?: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${active
            ? 'bg-primary/10 text-primary font-bold'
            : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 hover:text-text-main dark:hover:text-white'
            }`}
    >
        <span className={`material-symbols-outlined ${active ? 'text-primary' : 'text-gray-500 group-hover:text-primary'}`}>
            {icon}
        </span>
        <span className="text-sm">{label}</span>
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
const ProductCard = ({ name, category, price, oldPrice, image, badge }: { name: string, category: string, price: string, oldPrice: string, image: string, badge?: string }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="product-card group bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
    >
        <div className="relative aspect-square bg-gray-50 dark:bg-white/5 flex items-center justify-center p-8 overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
            {badge && (
                <span className={`absolute top-4 left-4 ${badge === 'MAIS VENDIDO' ? 'bg-primary' : 'bg-amber-500'} text-white text-[10px] font-bold px-2 py-1 rounded`}>
                    {badge}
                </span>
            )}
            <div className="add-to-cart-btn absolute inset-x-4 bottom-4 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <button className="w-full bg-primary text-text-main font-bold py-3 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 hover:bg-primary/90">
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
const DashboardPage = () => (
    <div className="space-y-8">
        {/* Welcome Section */}
        <header className="flex flex-wrap justify-between items-center gap-4">
            <div className="space-y-1">
                <h2 className="text-xl md:text-3xl font-black tracking-tight dark:text-white leading-tight">Olá, João Silva</h2>
                <p className="text-[#4e9767] text-sm md:text-base font-medium">Acompanhe aqui o seu progresso e tratamento medicinal.</p>
            </div>
            <div className="hidden sm:flex items-center gap-4">
                <div className="bg-white dark:bg-[#1a2e20] p-3 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">calendar_today</span>
                    <div className="text-sm">
                        <p className="font-bold">Próxima Consulta</p>
                        <p className="text-gray-500">24 de Set, 14:30</p>
                    </div>
                </div>
            </div>
        </header>

        {/* Top Grid: Progress and Quick Action */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress Card */}
            <div className="lg:col-span-2 bg-white dark:bg-[#1a2e20] p-6 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">insights</span>
                        Progresso do Tratamento
                    </h3>
                    <span className="text-primary font-black text-xl">65%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-white/10 h-3 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
                </div>
                <p className="text-sm text-gray-500">Você está na fase de <strong>ajuste de dosagem</strong>. Mantenha seus relatos em dia para melhores resultados.</p>
            </div>
            {/* CTA Quick Action */}
            <div className="bg-primary p-6 rounded-xl shadow-lg shadow-primary/20 flex flex-col justify-between items-start group cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white mb-4">
                    <span className="material-symbols-outlined text-3xl">edit_note</span>
                </div>
                <div className="space-y-1">
                    <h3 className="text-white text-xl font-bold leading-tight">Relatos do Tratamento</h3>
                    <p className="text-white/80 text-sm">Como você está se sentindo hoje?</p>
                </div>
                <button className="mt-4 flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-lg font-bold text-sm shadow-sm">
                    Registrar Agora
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
            </div>
        </div>

        {/* Main Grid: Medications and Support */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Medications Section */}
            <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold px-1">Meus Medicamentos</h3>
                    <button className="text-primary text-sm font-bold hover:underline">Ver prescrição completa</button>
                </div>
                <div className="grid gap-4">
                    {/* Med Item 1 */}
                    <div className="bg-white dark:bg-[#1a2e20] p-5 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-4 hover:border-primary/40 transition-colors group">
                        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-3xl">opacity</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-base">Óleo CBD Full Spectrum 10%</h4>
                            <p className="text-sm text-gray-500">Sublingual • 3 gotas • 2x ao dia</p>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase rounded">Próxima: 20:00</span>
                            <button className="bg-gray-100 dark:bg-white/5 p-2 rounded-lg text-gray-400 group-hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">check_circle</span>
                            </button>
                        </div>
                    </div>
                    {/* Med Item 2 */}
                    <div className="bg-white dark:bg-[#1a2e20] p-5 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-4 hover:border-primary/40 transition-colors group opacity-80">
                        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-3xl">medical_services</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-base">Cápsula Noturna THC:CBD</h4>
                            <p className="text-sm text-gray-500">Oral • 1 cápsula • Antes de dormir</p>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                            <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-500 text-[10px] font-bold uppercase rounded">Aguardando</span>
                            <button className="bg-gray-100 dark:bg-white/5 p-2 rounded-lg text-gray-400">
                                <span className="material-symbols-outlined">check_circle</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Human Support Sidebar */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold px-1">Suporte Humano</h3>
                <div className="bg-white dark:bg-[#1a2e20] p-6 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-14 h-14 rounded-full bg-cover bg-center border-2 border-primary" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD80dArObbYpuXgVgJ8NNJ7sYtznk2tjUDomJsAvfvtiM4vNnQMVbEkd0bYqCrSGFsH_JTgANLQO7YIw0Nfh_1MsGQtU8iZtBt5fNeOs5uvVGr3TK8QEGwzl9dUeK4RW_0_A287HMttjG1ZNMh7ts4qohYVfZTD0qjTdnVa9QWGSXQJDPnFC3uFlI3K1eO3b4T-gqUZ3FNvutAjaDM5W90uNEa-grRuYGvoguFLn07zYHQh9c_tS8ADOvNbNT2ky4AFaSgoMbrmnTg')" }}></div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div>
                            <p className="font-bold">Dra. Letícia</p>
                            <p className="text-xs text-[#4e9767]">Sua Concierge de Saúde</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Olá João! Estou aqui para tirar suas dúvidas sobre a medicação ou efeitos colaterais. Como posso ajudar?
                    </p>
                    <div className="grid gap-2">
                        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#25D366] text-white font-bold text-sm hover:opacity-90 transition-opacity">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
                            WhatsApp
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 dark:border-white/10 font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-sm">chat_bubble</span>
                            Abrir Chat Online
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Appointments and Sentiment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
                <h3 className="text-xl font-bold px-1">Seu Histórico Recente</h3>
                <div className="bg-white dark:bg-[#1a2e20] rounded-xl border border-gray-100 dark:border-white/10 overflow-hidden overflow-x-auto scrollbar-hide">
                    <table className="w-full text-left text-sm min-w-[300px]">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-white/5">
                                <th className="px-6 py-3 font-bold">Data</th>
                                <th className="px-6 py-3 font-bold">Ação</th>
                                <th className="px-6 py-3 font-bold text-right">Humor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                            <tr>
                                <td className="px-6 py-4">Hoje, 08:30</td>
                                <td className="px-6 py-4">Dose Registrada</td>
                                <td className="px-6 py-4 text-right">😊</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4">Ontem, 20:15</td>
                                <td className="px-6 py-4">Relato Completo</td>
                                <td className="px-6 py-4 text-right">🙂</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4">Ontem, 08:45</td>
                                <td className="px-6 py-4">Dose Registrada</td>
                                <td className="px-6 py-4 text-right">😐</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Informational Card */}
            <div className="bg-primary/10 rounded-xl p-6 border border-primary/20 flex flex-col justify-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">lightbulb</span>
                </div>
                <h4 className="font-bold text-lg">Dica do dia</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    A constância é a chave para o sucesso do tratamento com CBD. Tente administrar sua medicação sempre no mesmo horário para manter os níveis estáveis em seu organismo.
                </p>
            </div>
        </div>

        {/* Footer */}
        <footer className="max-w-6xl mx-auto py-10 border-t border-gray-100 dark:border-white/10 text-center text-xs text-gray-500">
            <p>© 2023 Rootcare Integrated Health. Todos os direitos reservados.</p>
            <div className="flex justify-center gap-4 mt-2">
                <a className="hover:text-primary" href="#">Termos de Uso</a>
                <a className="hover:text-primary" href="#">Privacidade</a>
            </div>
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

// --- Page: Pharmacy ---
const PharmacyPage = () => {
    const [activeCategory, setActiveCategory] = useState('Todos');
    const categories = ['Óleos Full Spectrum', 'Isolados', 'Cápsulas', 'Tópicos & Cremes', 'Flores In Natura'];

    const products = [
        { name: 'Cannabiol Full Spectrum 3000mg', category: 'Óleos Full Spectrum', price: 'R$ 389,00', oldPrice: 'R$ 499,00', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi9htBPss4vilfjcERPKtcMaOI55WHC_aRubs6j_KlertiYgWAWCKfLcT_sbPvsocpCCqle4XnRvx_dlEaY1cpE749ndq1CqVj8PXkd6mDgYMPtUuLHDUsEL20hZvCQNpYC4DGnLIsPLsu0GxxFKzEVqK9_MfnJz710Q9QbNNe2TkDIgYQ3nNDIoWsnNFQlXz2gLrlmec23gvghXbUTLfCfftSl_wE07NIPWcHKZeyCsPtdrpDMCYAIyhXg3UtJV3LqyZQYW5B4ks', badge: 'MAIS VENDIDO' },
        { name: 'Cápsulas Softgel CBD 25mg', category: 'Cápsulas', price: 'R$ 215,00', oldPrice: 'R$ 280,00', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfWMhqBbYiGO4WNvAO7BvZE_6VtEm4VvhDVwFcHXMqt6gM8TpwHgZX346lOXtzlPrRIXcaU1cyKL9B84dOi0ghYIvIh5k8RKmcSsE9WnMV1yZ158NabVs762s3fkSthHAMQ6lxNnI6-W0xXgYs4YhW5kuXsVHi4UJGA3vJQuAAq_ZdZTdjvg-PquBFTiObyEgQobQjCxxgjFT19bSoxMRlU0dkcGsGgUntHNiq7zzKXq_HPn_vknOHFBPUmDcz-4azdMoRKKpP-1k' },
        { name: 'Flower Premium CBD Lemon 5g', category: 'Flores In Natura', price: 'R$ 520,00', oldPrice: 'R$ 650,00', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCghNdxUiPq15xgSlIlb3jV4a72QQfmLPbzo0RW804vq7LnilFEcgn7V_0fe0RtoOtOzLaaiDVWw14PVEjR9DuM08k40EzwUF1HY_x9XLqVQfaJw4sOAJ4ZoWa5R8EiH6YgnaznBaz_1QUmJ5Wg8-oTKCTfZnIS_qS1Td3uSqG0rw4KQSpJhD0-ExbuSP1rdYI3x2MRjgdQ2Zo8X9Nu3UrLlBStRR1dSJrH_HADme-IImPiRzR0p27ETQsZg_cztK68o8ec5gqPzzk', badge: 'ESTOQUE BAIXO' },
        { name: 'Bálsamo Aliviador CBD', category: 'Tópicos & Cremes', price: 'R$ 145,00', oldPrice: 'R$ 180,00', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZHBxg6YrAUZVDo7R0vF-GmeRQvyTjZDZcuKj4mkFtYP7IcpoBK-YYjcsWUMx7SCy16iebZGAOIooLdxdJ4lSMyUdpWI3sNKlpCfteKyvTKtexTBveoErzS1Ei7AroHd5ab69-mkO7DTySeL-ZcAnAfmJAIFM4qqwLvooHDGaA-ypAfjcZXXf3uOchFdBcSBDZrsT6yIxo9Z-YH4qKd-3fUmFl2oAU--uMIcgFqEoY8EpANxEcg5lwQkldKy4LNc-3AiX_5SjC_9w' },
        { name: 'Pó Cristal CBD Isolado 99%', category: 'Isolados', price: 'R$ 290,00', oldPrice: 'R$ 350,00', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhUk1X361P89s0fCC3_NiIk-iNN6McMZKZkRTiEjkt1o5BwxrpBfOd73UoG-iFqE4w4AZeCIMIWbA236eHvmp8lFp4Xjh496NqrzGCTJSsrGns0sQaZ3idGE4m_uJum6SMHuDzDpKBSrmwfebJ_g_gzt730l9sk9bdAvnA6gVU_rhNbBKWhCxVUnSY8qR4UTVPXiG5Ngjv3QQnAboRdlOBLq8vY1EMrOSl5fCN5HAEBHZ46lFw8Z7DzJZaJz1KcIMVKYRGR1MppUs' },
        { name: 'Óleo THC:CBD Balanceado', category: 'Óleos Full Spectrum', price: 'R$ 345,00', oldPrice: 'R$ 420,00', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChX11uG6DihfAWhcRcCrxeX632JF6zB6nNgawW4sZabi0azImr7urtvwehr2IqY3j0tIRnFwEO4_l4DLh4cCTP7oeUmgf1NN0h4a17ZSkVWeJ1mmH4-jHo_9V2ops4nbPxDWrS3JRm2NCpqjyOyJ8CDaTlzJ0q_o-nyYKKEedPihxNtx9ceAkfCCUve4NmMbgExf_lqCiWC55gKpZO_OravlhOIjvvNe8rZoQNalPL4Tj-p-rtTtRkRqt7QzFzOQXz_cmTViFf_gk' },
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
                    <ProductCard key={i} {...product} />
                ))}
            </div>

            {/* Floating Cart Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.05 }} className="flex items-center gap-3 bg-text-main dark:bg-primary text-white dark:text-text-main px-6 py-4 rounded-full shadow-2xl">
                    <div className="relative">
                        <span className="material-symbols-outlined text-2xl">shopping_cart</span>
                        <span className="absolute -top-2 -right-2 bg-primary dark:bg-white text-white dark:text-text-main text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">3</span>
                    </div>
                    <div className="text-left leading-none uppercase"><p className="text-[10px] font-bold opacity-70 tracking-tighter">Carrinho</p><p className="text-sm font-black">R$ 1.124,00</p></div>
                </motion.button>
            </div>
        </div>
    );
};

// --- Page: Professionals ---
const ProfessionalsPage = () => {
    const [activeCategory, setActiveCategory] = useState('Médicos');

    const professionals = [
        { name: 'Dra. Letícia Oliveira', specialty: 'Clínica Geral • Cannabis Medicinal', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD80dArObbYpuXgVgJ8NNJ7sYtznk2tjUDomJsAvfvtiM4vNnQMVbEkd0bYqCrSGFsH_JTgANLQO7YIw0Nfh_1MsGQtU8iZtBt5fNeOs5uvVGr3TK8QEGwzl9dUeK4RW_0_A287HMttjG1ZNMh7ts4qohYVfZTD0qjTdnVa9QWGSXQJDPnFC3uFlI3K1eO3b4T-gqUZ3FNvutAjaDM5W90uNEa-grRuYGvoguFLn07zYHQh9c_tS8ADOvNbNT2ky4AFaSgoMbrmnTg', verified: true },
        { name: 'Dr. Roberto Santos', specialty: 'Neurologista • Dor Crônica', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu5uFFzFQ9gu487H4VYjlgrjb23oktCIg8IB1ovGXJiOUVHW35oWP_54imRyhHVxofd97r1vNKTYcxssuU4FI9n8xXPPa_6E4meW_Lw9whqR_QAmRxYiHRESmLE_t1JJr5W3G8aXolc5i3Ya6yFp2QqPIozZ4zc1O3FEjZj1P9L2sinY_CbTNwu38fid4Zxo4MA8KRlDUXLYlaT85fXS76m6hNWG0FiKr1dSQVhoU2kfqt7qoE7MYOB99EoNfUEmfaXPiIRXhEWbA' },
        { name: 'Dra. Ana Paula', specialty: 'Psiquiatra • Saúde Mental', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDH7N1-GMwM8HYy8LjJ-CqcUbryNZ66_gLO43HVtrqUk_wOiRVxrUDsD5G6Ny_tH8PQVoftEEUvF5bJPn7TeAOSqaZ0DoQPXT6ciAiYwbTbu-Xo4DYmewq9SWg9e6Kelol2rD4cEyaPo-ICRTK35cnJ1Z1iuHZbZLe-dRMR_cyDlaBOAGq8xOioPFqqL86eD19xdMNAApN3lE256vqosLYhNbo22dwEkxI29REU_P__i6FiBUgvEYzWCYAtBO73nYcDIDpjHLzKuE0' },
        { name: 'Dr. Marcos Vinícius', specialty: 'Oncologista • Cuidados Paliativos', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEXfZ3oznI7vDUc_JnLe9DOPd2jvnjvFJK4LGXkEs-_Op4EnBykW1BtDtylrjzP_alh4rkXmmxx4LVNaPXLE7ukq6sUAlbAkQE_sid_igI7xvjdqIA7Sb_y4zkQNTRE-0t6wvRZUGDN4fL8u2DApJpqeoWzc8nB1FygtB2hflwe84EexCSDeu0qz8TOeYWF0VjucIMGKxDz3WEyMv74WCkA0vCeXOhNUbTud7GF0QRm463fO4Ys8Fi0vstrKIafjEuMC4yEGWhM6E' },
        { name: 'Dra. Juliana Mendes', specialty: 'Endocrinologista • Bem-estar', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCExtjjw05OSdlgk1RmlbEGQEhachUP5QgvWj9hvTAKFm62cMm64pHClLdnUxL6dST0ttEehugx0B0y6an8uEjelsSKfMeq9WCFSwr0Hqj44V98IcstsPTaeF0z-gmEVzmWErZSlsO64Lv9zkkvL_pJK1RSxBhgMr87hqprzutmEkWfD-_XvzSYmZW-8h1Tmzk5m-3J0RtiKvY3WkjaqOYvTWNf-q5n0kB-jfkM6SulaIXrWNTYPFb90gpHfyOh40EC_wHRSWct-5Y' },
        { name: 'Dr. Ricardo Almada', specialty: 'Geriatra • Parkinson & Alzheimer', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5ms2Qu3s6XElYyzP0xh_f-3-7mDFut26yd-_-m1BjTpRRHO1cBwR7w4XQ5l9T_fDoE8NXFUoxwLsuBkri3LgsdheTVlCBV03EqgqAICMmELy_U_UjqDj9QQWk7_nM85aSN766z6GYThLb_wMB2lHqwEb1yfA7gxLX6PxULsWr1EzMCvzkqjHiBYG3kqnAW-6sfQ6rgtT6-0tjmYQIoSohoM7yOe2LepVbTDl_uouM7I1Jwkb9wCGzhh-ZSyDUypXZdT8FjyLknPU' },
        { name: 'Dra. Beatriz Costa', specialty: 'Dermatologista • Psoríase', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8wqnWxCBMqYzpDCrbpQOsDWHo8qad0s0XQ-ZlbBvziOlkOaxzlgLB0jrB-H38CBM0_ni6l0HsO0LoafQWCX3URtUUZxGSuRLybgjX-9nhaA1hknHuSWufrdJluAfMqObuURLpAZ6tiSQRsU6l96Ro1H_FuTpUghI7CNwo-8YmwDeJdrY9WOAX-RnMfaDl9btO4r4DiYPn7nIjFYpWKmORpaHM31gA0h-wVOJ-Tva3r11FndioAYw7XiUoB5XU4bwBzZ8EbY3aW7o' },
        { name: 'Dr. Paulo Rossi', specialty: 'Infectologista • Terapias Canábicas', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDRYkd4VY7lR_UfjM3uWHJLAhPEOengIWJyALJF_H4PVn0zs-dDQTiTFZIwgZuUT7me2TZ7qZx5Fv5E15Otg8nOIR2NDaDetJ_Jc9RR7mq6Q47nu4xAluR4Z_1p8eY8bfwch-1gQBLUCc4wPyqm4cb3b_RK-8BJjJT8g-4ODAdlUmjUgdXi5F0H31oXDdWBYK_rXXsfRQGEYEqC_FSkcKnA34HNPdF1cGCsoMBKZhVXBYo-xyaNziwMjVTD8677bjq6RyFPPuUxvo' },
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
                            <div className="w-12 h-12 rounded-lg bg-cover bg-center bg-gray-100" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCu5uFFzFQ9gu487H4VYjlgrjb23oktCIg8IB1ovGXJiOUVHW35oWP_54imRyhHVxofd97r1vNKTYcxssuU4FI9n8xXPPa_6E4meW_Lw9whqR_QAmRxYiHRESmLE_t1JJr5W3G8aXolc5i3Ya6yFp2QqPIozZ4zc1O3FEjZj1P9L2sinY_CbTNwu38fid4Zxo4MA8KRlDUXLYlaT85fXS76m6hNWG0FiKr1dSQVhoU2kfqt7qoE7MYOB99EO_P__i6FiBUgvEYzWCYAtBO73nYcDIDpjHLzKuE0')" }}></div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm">Dr. Roberto Santos</h4>
                                <p className="text-xs text-[#4e9767]">Neurologista</p>
                            </div>
                            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">chevron_right</span>
                        </div>
                        <div className="bg-white dark:bg-[#1a2e20] p-4 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-4 hover:border-primary/40 transition-colors group cursor-pointer">
                            <div className="w-12 h-12 rounded-lg bg-cover bg-center bg-gray-100" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDH7N1-GMwM8HYy8LjJ-CqcUbryNZ66_gLO43HVtrqUk_wOiRVxrUDsD5G6Ny_tH8PQVoftEEUvF5bJPn7TeAOSqaZ0DoQPXT6ciAiYwbTbu-Xo4DYmewq9SWg9e6Kelol2rD4cEyaPo-ICRTK35cnJ1Z1iuHZbZLe-dRMR_cyDlaBOAGq8xOioPFqqL86eD19xdMNAApN3lE256vqosLYhNbo22dwEkxI29REU_P__i6FiBUgvEYzWCYAtBO73nYcDIDpjHLzKuE0')" }}></div>
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
const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
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
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#144443]">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#144443] via-[#144443]/40 to-transparent"></div>
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXdPRVe8aviHVjb4qqOYNPzRhQMcB-NjJf4qyx8IIQC2rkYxzL01CII380Sd4yCIAQ3uGEpRhyZHhICpEO77GHqVfDVSyyX79snnhW2_g3DSy1LmTNZ4GR3COLHYe1FtOxxnNHoPuc8eKyERa4sOnNviTTYg9YAIdmQMJ5AO8SM472JqPDouRXF_ao4tLMhnFoeGCaeA_S84wJdYeoJ240IkUaAbOQDER-8CTWHr5dsji5XjrGbGhPuS51HiWNRW_UNA6MjZazTxw")' }}
                ></div>
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
                                    style={{ WebkitBoxShadow: '0 0 0px 1000px #f1f5f9 inset', WebkitTextFillColor: '#0e1b12' }}
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
                                    style={{ WebkitBoxShadow: '0 0 0px 1000px #f1f5f9 inset', WebkitTextFillColor: '#0e1b12' }}
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
                        <a className="text-[#0e1b12] dark:text-white font-bold text-sm hover:text-primary transition-colors" href="#">Cadastre-se agora</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main App ---
export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activePage, setActivePage] = useState<Page>('dashboard');
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    if (!isAuthenticated) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return (
        <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'dark' : ''} bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display transition-colors duration-200`}>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-72 flex-shrink-0 border-r border-gray-200 dark:border-white/10 bg-white dark:bg-dark-surface flex-col p-6 overflow-y-auto scrollbar-hide">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/20 p-2 rounded-lg cursor-pointer" onClick={() => setActivePage('dashboard')}><span className="material-symbols-outlined text-primary text-2xl font-bold">eco</span></div>
                            <div className="flex flex-col"><h1 className="text-lg font-bold uppercase tracking-wider">Rootcare</h1><p className="text-text-muted text-xs font-medium">Portal do Paciente</p></div>
                        </div>
                        <button onClick={toggleDarkMode} className="p-2 rounded-lg text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span></button>
                    </div>
                    <nav className="flex flex-col gap-1">
                        <SidebarItem icon="grid_view" label="Dashboard" active={activePage === 'dashboard'} onClick={() => setActivePage('dashboard')} />
                        <SidebarItem icon="shopping_basket" label="Farmácia Medicinal" active={activePage === 'pharmacy'} onClick={() => setActivePage('pharmacy')} />
                        <SidebarItem icon="shopping_bag" label="Meus Pedidos" active={activePage === 'orders'} onClick={() => setActivePage('orders')} />
                        <SidebarItem icon="calendar_month" label="Consultas" active={activePage === 'appointments'} onClick={() => setActivePage('appointments')} />
                        <SidebarItem icon="medication" label="Profissionais" active={activePage === 'professionals'} onClick={() => setActivePage('professionals')} />
                    </nav>
                    <div className="flex flex-col gap-4 pt-4">
                        <SidebarInfoCard icon="verified" label="Associação Curativa" title="João Silva" subtitle="Membro Ativo" />
                        <SidebarInfoCard icon="description" label="Receituário" title="Válido até 15/12" subtitle="2 Itens restantes" variant="warning" actionLabel="Ver PDF" />
                        <SidebarInfoCard icon="local_shipping" label="Próximo Pedido" title="Chega em 3 dias" subtitle="Rastrear Entrega" variant="default" actionLabel="Ver Detalhes" />
                    </div>
                </div>
                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrtKeZhqdggv1wsvLq0DOybOiQ2V61oHjkC7mifSoS1wgPTqxFGcLwD0hU12IWe8h048zjzVk4KBcVXZJfD3HhIQGQE13UGkr9vgHsTHkhzkvedoTfIFr8bGoY3FLcrrND7LIzLXWN0lLbDZNZeDTLuJuyaanCdBCLujd9z48xs3Cq-5YH6vdvImklSwX-P6rcOomkyhB58u-JDr6WudVZOQDNWeOqVQaZ8SjwJ6U5UichLoW_SBmtVg_aWfw2mlD6irLV2JHlYMI')" }}></div>
                    <div className="flex flex-col">
                        <p className="text-sm font-bold">João Silva</p>
                        <p className="text-xs text-gray-500">ID: #4429</p>
                    </div>
                    <button onClick={handleLogout} className="ml-auto text-gray-400 hover:text-red-500 transition-colors">
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
                            <div className="bg-primary p-1.5 rounded-lg text-white">
                                <span className="material-symbols-outlined text-xl font-bold">eco</span>
                            </div>
                            <h1 className="text-sm font-bold uppercase tracking-wider">Rootcare</h1>
                        </div>
                        <h2 className="text-base md:text-xl font-bold uppercase tracking-wide truncate ml-2 lg:ml-0">{activePage === 'dashboard' ? 'Dashboard' : activePage === 'pharmacy' ? 'Farmácia Medicinal' : activePage === 'orders' ? 'Meus Pedidos' : activePage === 'appointments' ? 'Consultas' : 'Profissionais'}</h2>
                        <div className="flex items-center gap-2 md:gap-4">
                            <button onClick={toggleDarkMode} className="lg:hidden p-2 rounded-lg text-gray-400 border border-gray-100 dark:border-white/5"><span className="material-symbols-outlined text-sm">{isDarkMode ? 'light_mode' : 'dark_mode'}</span></button>
                            <div className="hidden sm:flex flex-col items-end mr-4"><span className="text-[10px] font-bold text-primary uppercase">Status Financeiro</span><span className="text-xs font-bold text-green-600">Regular</span></div>
                            <button className="bg-primary/10 text-primary px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-bold text-[10px] md:text-sm border border-primary/20">ID Digital</button>
                        </div>
                    </div>
                </header>

                <div className="max-w-6xl mx-auto p-4 md:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div key={activePage} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.2 }}>
                            {activePage === 'dashboard' && <DashboardPage />}
                            {activePage === 'pharmacy' && <PharmacyPage />}
                            {activePage === 'orders' && <OrdersPage />}
                            {activePage === 'appointments' && <AppointmentsPage />}
                            {activePage === 'professionals' && <ProfessionalsPage />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #30e86e33; border-radius: 10px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </div>
    );
}
