import React from 'react';
import { motion } from 'framer-motion';

const ORDERS_DATA = [
    { id: '#RC-9842', date: '18 Set, 2023', time: '14:45', icon: 'opacity', product: 'Óleo CBD Full Spectrum 10%', desc: 'Frasco 30ml', price: 'R$ 245,00', status: 'Processando', statusColor: 'amber' },
    { id: '#RC-9210', date: '05 Ago, 2023', time: '10:15', icon: 'medical_services', product: 'Cápsulas THC:CBD 1:1', desc: '60 cápsulas', price: 'R$ 189,90', status: 'Enviado', statusColor: 'blue' },
    { id: '#RC-8850', date: '12 Jul, 2023', time: '09:30', icon: 'opacity', product: 'Óleo CBD Full Spectrum 10%', desc: 'Frasco 30ml', price: 'R$ 245,00', status: 'Entregue', statusColor: 'green' },
    { id: '#RC-8520', date: '22 Jun, 2023', time: '15:20', icon: 'medical_services', product: 'Gel CBD Tópico Sport', desc: 'Frasco 100ml', price: 'R$ 156,00', status: 'Entregue', statusColor: 'green' },
    { id: '#RC-7912', date: '15 Mai, 2023', time: '11:10', icon: 'opacity', product: 'Óleo CBD Isolado 5%', desc: 'Frasco 30ml', price: 'R$ 120,00', status: 'Entregue', statusColor: 'green' },
    { id: '#RC-7450', date: '02 Abr, 2023', time: '08:45', icon: 'medical_services', product: 'Gummies CBD Relax', desc: '30 unidades', price: 'R$ 98,00', status: 'Entregue', statusColor: 'green' },
];

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

export default OrdersPage;
