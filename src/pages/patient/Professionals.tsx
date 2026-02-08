import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ProfessionalGridCard } from '../../components/common/Cards';

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
                className="mt-12 bg-[#1a3a2a] dark:bg-primary/20 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-primary/20"
            >
                <div className="space-y-2 text-center md:text-left">
                    <h4 className="font-bold text-xl leading-tight">Não encontrou o profissional que procurava?</h4>
                    <p className="text-white/80 text-sm">Nossa equipe de concierge pode ajudar você a encontrar o especialista ideal para sua necessidade específica.</p>
                </div>
                <button className="bg-white text-primary px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-gray-50 transition-colors whitespace-nowrap">Solicitar Indicação</button>
            </motion.div>
        </div>
    );
};

export default ProfessionalsPage;
