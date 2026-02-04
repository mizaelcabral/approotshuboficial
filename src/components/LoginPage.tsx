import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserRole } from '../types';

interface LoginPageProps {
    onLogin: (email: string, password: string, role: UserRole) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Limpar qualquer autenticação antiga ao montar
    useEffect(() => {
        localStorage.clear();
        sessionStorage.clear();
    }, []);

    const roles = [
        { value: 'patient' as UserRole, label: 'Paciente', icon: 'person', color: 'bg-primary', textColor: 'text-primary' },
        { value: 'doctor' as UserRole, label: 'Médico', icon: 'medical_services', color: 'bg-blue-500', textColor: 'text-blue-500' },
        { value: 'institution' as UserRole, label: 'Instituição', icon: 'domain', color: 'bg-purple-500', textColor: 'text-purple-500' },
        { value: 'super_admin' as UserRole, label: 'Super Admin', icon: 'admin_panel_settings', color: 'bg-amber-500', textColor: 'text-amber-500' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password, selectedRole);
    };

    // Demo login direto
    const handleDemoLogin = () => {
        const credentials = {
            patient: { email: 'paciente@rootcare.com', password: 'demo123' },
            doctor: { email: 'medico@rootcare.com', password: 'demo123' },
            institution: { email: 'instituicao@rootcare.com', password: 'demo123' },
            super_admin: { email: 'admin@rootcare.com', password: 'demo123' },
        };

        const creds = credentials[selectedRole];
        onLogin(creds.email, creds.password, selectedRole);
    };

    const currentRole = roles.find(r => r.value === selectedRole);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f6f8f6] via-white to-primary/5 dark:from-[#112116] dark:via-[#0e1b12] dark:to-[#112116] flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #30e86e 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-md"
            >
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.1 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-xl shadow-primary/30 mb-4"
                    >
                        <span className="material-symbols-outlined text-white text-3xl">potted_plant</span>
                    </motion.div>
                    <h1 className="text-3xl font-black text-text-main dark:text-white mb-2">Rootcare</h1>
                    <p className="text-text-subtle text-sm font-medium">Sistema Integrado de Saúde Medicinal</p>
                </div>

                {/* Login Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-[#1a2e20] rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 p-8"
                >
                    {/* Role Selection */}
                    <div className="mb-6">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                            Tipo de Acesso
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {roles.map((role) => (
                                <button
                                    key={role.value}
                                    type="button"
                                    onClick={() => setSelectedRole(role.value)}
                                    className={`p-4 rounded-xl border-2 transition-all ${selectedRole === role.value
                                            ? `${role.color} border-transparent text-white shadow-lg`
                                            : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                                        }`}
                                >
                                    <span className={`material-symbols-outlined text-2xl mb-1 block ${selectedRole === role.value ? 'text-white' : role.textColor
                                        }`}>
                                        {role.icon}
                                    </span>
                                    <span className={`text-xs font-bold ${selectedRole === role.value ? 'text-white' : 'text-gray-600 dark:text-gray-400'
                                        }`}>
                                        {role.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    mail
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-text-main dark:text-white"
                                    placeholder="seu@email.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Senha
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    lock
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-text-main dark:text-white"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                                >
                                    <span className="material-symbols-outlined text-xl">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Demo Credentials Button */}
                        <button
                            type="button"
                            onClick={handleDemoLogin}
                            className="w-full text-sm font-bold hover:underline py-2 flex items-center justify-center gap-2"
                            style={{ color: currentRole?.color.replace('bg-', '#') || '#30e86e' }}
                        >
                            <span>🚀</span>
                            <span>Entrar com Demonstração</span>
                        </button>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`w-full ${currentRole?.color || 'bg-primary'} hover:brightness-110 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group`}
                        >
                            <span>Entrar</span>
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                                arrow_forward
                            </span>
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/10 text-center space-y-2">
                        <button className="text-xs text-gray-500 hover:text-primary font-bold">
                            Esqueceu sua senha?
                        </button>
                        <p className="text-xs text-gray-400">
                            Não tem uma conta? <button className="text-primary font-bold hover:underline">Cadastre-se</button>
                        </p>
                    </div>
                </motion.div>

                {/* Demo Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-xl"
                >
                    <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                        <span className="font-bold text-primary">Demo:</span> Clique em "🚀 Entrar com Demonstração" para acesso rápido
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
