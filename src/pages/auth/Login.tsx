import React, { useState, useEffect } from 'react';
import { UserRole } from '../../types';

interface LoginPageProps {
    onLogin: (email: string, password: string, role: UserRole) => void;
    onSwitchToRegister: () => void;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
}

const LoginPage = ({ onLogin, onSwitchToRegister, isDarkMode, onToggleDarkMode }: LoginPageProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Limpeza agressiva removida para evitar problemas de persistência
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password, selectedRole);
    };

    const handleDemoLogin = () => {
        const credentials = {
            patient: { email: 'paciente@rootcare.com', password: 'demo123' },
            doctor: { email: 'medico@rootcare.com', password: 'demo123' },
            institution: { email: 'instituicao@rootcare.com', password: 'demo123' },
            super_admin: { email: 'admin@rootcare.com', password: 'demo123' },
        };
        const creds = credentials[selectedRole as keyof typeof credentials];

        setEmail(creds.email);
        setPassword(creds.password);

        setTimeout(() => {
            onLogin(creds.email, creds.password, selectedRole);
        }, 800);
    };

    const roles = [
        { id: 'patient' as UserRole, label: 'Paciente', icon: 'person' },
        { id: 'doctor' as UserRole, label: 'Médico', icon: 'medical_services' },
        { id: 'institution' as UserRole, label: 'Instituição', icon: 'domain' },
        { id: 'super_admin' as UserRole, label: 'Super Admin', icon: 'admin_panel_settings' },
    ];

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen bg-background-light dark:bg-background-dark font-display text-text-main dark:text-white transition-colors duration-200">
            {/* Left Panel - Hidden on mobile, visible on LG+ */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-white">
                <img
                    alt="Doctor"
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/images/login-doctor.png"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/40 via-transparent to-transparent"></div>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="relative z-20 flex flex-col justify-end p-20 text-white w-full h-full">
                    <div className="flex items-center mb-8">
                        <img
                            src="/images/rootcare-logo-fundo-escuro.png"
                            alt="Rootcare Logo"
                            className="h-10 w-auto object-contain"
                        />
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
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 py-8 md:px-6 md:py-12 bg-white dark:bg-background-dark relative">
                {/* Theme Toggle Top Right */}
                <div className="absolute top-6 right-6">
                    <button
                        onClick={onToggleDarkMode}
                        className="size-10 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center hover:bg-primary/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">
                            {isDarkMode ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                </div>

                {/* Mobile Header */}
                <div className="lg:hidden flex items-center mb-8 px-4 py-2 rounded-full">
                    <img
                        src={isDarkMode ? "/images/rootcare-logo-fundo-escuro.png" : "/images/rootcare-logo-fundo-branco.png"}
                        alt="Rootcare Logo"
                        className="h-8 w-auto object-contain"
                    />
                </div>
                <div className="w-full max-w-[440px] flex flex-col">
                    <div className="flex items-center mb-10">
                        <img
                            src={isDarkMode ? "/images/rootcare-logo-fundo-escuro.png" : "/images/rootcare-logo-fundo-branco.png"}
                            alt="Rootcare Logo"
                            className="h-10 w-auto object-contain"
                        />
                    </div>

                    {/* Role Selector */}
                    <div className="mb-8">
                        <label className="text-[#0e1b12] dark:text-white text-xs font-bold uppercase tracking-wider mb-4 block">Selecione seu perfil</label>
                        <div className="grid grid-cols-4 gap-2">
                            {roles.map((role) => (
                                <button
                                    key={role.id}
                                    type="button"
                                    onClick={() => setSelectedRole(role.id)}
                                    className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all ${selectedRole === role.id ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-white/5 text-gray-400 hover:border-gray-200 dark:hover:border-white/10'}`}
                                >
                                    <span className="material-symbols-outlined text-xl">{role.icon}</span>
                                    <span className="text-[10px] font-bold leading-tight text-center">{role.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h1 className="text-[#0e1b12] dark:text-white text-3xl font-bold tracking-tight mb-2">Bem-vindo de volta</h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">Entre com suas credenciais para gerenciar seu tratamento.</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
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
                                    autoComplete="new-email"
                                    style={{
                                        WebkitBoxShadow: `0 0 0px 1000px ${isDarkMode ? '#1a2e20' : '#f1f5f9'} inset`,
                                        WebkitTextFillColor: isDarkMode ? '#fff' : '#0e1b12'
                                    } as any}
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
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                    style={{
                                        WebkitBoxShadow: `0 0 0px 1000px ${isDarkMode ? '#1a2e20' : '#f1f5f9'} inset`,
                                        WebkitTextFillColor: isDarkMode ? '#fff' : '#0e1b12'
                                    } as any}
                                />
                                <button
                                    className="absolute right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            <button className="w-full bg-[#2df377] hover:bg-[#28e16d] text-background-dark font-black py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] text-lg" type="submit">
                                <span className="truncate">Entrar</span>
                                <span className="material-symbols-outlined text-[24px]">login</span>
                            </button>
                            <button
                                type="button"
                                onClick={handleDemoLogin}
                                className="w-full bg-white dark:bg-white/5 border-2 border-primary/20 hover:border-primary/50 text-text-main dark:text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                            >
                                <span className="material-symbols-outlined text-primary">rocket_launch</span>
                                <span>Entrar com Demonstração</span>
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

export default LoginPage;
