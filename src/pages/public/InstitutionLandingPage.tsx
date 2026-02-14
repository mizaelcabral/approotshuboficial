import React from 'react';
import { User } from '../../types';
import PatientRegistrationForm from '../../components/Institution/PatientRegistrationForm';
import { motion } from 'framer-motion';

interface InstitutionLandingPageProps {
    institution: User;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
}

const InstitutionLandingPage: React.FC<InstitutionLandingPageProps> = ({ institution, isDarkMode, onToggleDarkMode }) => {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-text-main dark:text-white transition-colors duration-200 overflow-y-auto">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10 px-8 py-4 transition-colors">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <img
                        src={isDarkMode ? "/images/rootcare-logo-fundo-escuro.png" : "/images/rootcare-logo-fundo-branco.png"}
                        alt="Rootcare Logo"
                        className="h-8 w-auto object-contain"
                    />
                    <button
                        onClick={onToggleDarkMode}
                        className="size-10 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center hover:bg-primary/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">
                            {isDarkMode ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                </div>
            </header>

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6 border border-primary/20">
                            <span className="material-symbols-outlined text-sm">verified</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">Unidade Credenciada</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
                            Bem-vindo à <span className="text-primary">{institution.name}</span>
                        </h1>
                        <p className="text-lg text-text-subtle max-w-2xl mx-auto font-medium">
                            Inicie seu tratamento de cannabis medicinal com segurança. Complete seu cadastro abaixo para se vincular à nossa clínica.
                        </p>
                    </motion.div>

                    {/* Registration Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-white/10 rounded-3xl shadow-2xl shadow-black/5 p-1 overflow-hidden"
                    >
                        <div className="p-8 md:p-12">
                            <PatientRegistrationForm
                                institutionId={institution.id}
                                onSuccess={() => window.location.href = '/login'}
                                onCancel={() => window.location.href = '/login'}
                            />
                        </div>
                    </motion.div>

                    {/* Footer Info */}
                    <div className="mt-12 text-center text-text-subtle text-xs font-bold uppercase tracking-widest">
                        © 2024 Rootcare Network • {institution.name}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InstitutionLandingPage;
