import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { UserRole } from '../../types';

interface RegisterPageProps {
    onBackToLogin: () => void;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
}

const RegisterPage = ({ onBackToLogin, isDarkMode, onToggleDarkMode }: RegisterPageProps) => {
    const [step, setStep] = useState(1);
    const [userType, setUserType] = useState<UserRole>('patient');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert('Senhas não coincidem');
            return;
        }

        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: fullname,
                    role: userType
                }
            }
        });

        if (error) {
            alert(`Erro no cadastro: ${error.message}`);
            setLoading(false);
            return;
        }

        if (data.user) {
            setStep(3);
        }
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen w-full bg-white dark:bg-background-dark font-display">
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-white">
                <img
                    alt="Healthcare Professional"
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/images/register-doctor.png"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/50 via-transparent to-transparent"></div>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
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
            <div className="w-full lg:w-1/2 flex flex-col bg-white dark:bg-background-dark overflow-y-auto scrollbar-hide relative">
                {/* Theme Toggle Top Right */}
                <div className="absolute top-6 right-6 z-20">
                    <button
                        onClick={onToggleDarkMode}
                        className="size-10 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center hover:bg-primary/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">
                            {isDarkMode ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                </div>

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
                                                    onClick={() => setUserType('patient')}
                                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${userType === 'patient' ? 'border-primary bg-primary/5 text-[#0e1b12] dark:text-white' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 hover:border-primary/50'}`}
                                                >
                                                    <span className={`material-symbols-outlined mb-2 text-3xl ${userType === 'patient' ? 'text-primary' : ''}`}>person</span>
                                                    <span className="text-sm font-bold">Paciente</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setUserType('doctor')}
                                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${userType === 'doctor' ? 'border-primary bg-primary/5 text-[#0e1b12] dark:text-white' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 hover:border-primary/50'}`}
                                                >
                                                    <span className={`material-symbols-outlined mb-2 text-3xl ${userType === 'doctor' ? 'text-primary' : ''}`}>medical_services</span>
                                                    <span className="text-sm font-bold">Médico</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setUserType('institution')}
                                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${userType === 'institution' ? 'border-primary bg-primary/5 text-[#0e1b12] dark:text-white' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 hover:border-primary/50'}`}
                                                >
                                                    <span className={`material-symbols-outlined mb-2 text-3xl ${userType === 'institution' ? 'text-primary' : ''}`}>clinical_notes</span>
                                                    <span className="text-sm font-bold">Instituição</span>
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
                                                    value={fullname}
                                                    onChange={(e) => setFullname(e.target.value)}
                                                    style={{
                                                        WebkitBoxShadow: `0 0 0px 1000px ${isDarkMode ? '#1a2e20' : '#f1f5f9'} inset`,
                                                        WebkitTextFillColor: isDarkMode ? '#fff' : '#0e1b12'
                                                    } as any}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-tight" htmlFor="email">E-mail</label>
                                                <input
                                                    className="block w-full px-4 py-4 bg-[#f1f5f9] dark:bg-[#1a2e20] border border-[#e2e8f0] dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-[#0e1b12] dark:text-white placeholder:text-gray-400"
                                                    id="email"
                                                    placeholder="seu@email.com"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    style={{
                                                        WebkitBoxShadow: `0 0 0px 1000px ${isDarkMode ? '#1a2e20' : '#f1f5f9'} inset`,
                                                        WebkitTextFillColor: isDarkMode ? '#fff' : '#0e1b12'
                                                    } as any}
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
                                                        } as any}
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
                                                        } as any}
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
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    style={{
                                                        WebkitBoxShadow: `0 0 0px 1000px ${isDarkMode ? '#1a2e20' : '#f1f5f9'} inset`,
                                                        WebkitTextFillColor: isDarkMode ? '#fff' : '#0e1b12'
                                                    } as any}
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
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    style={{
                                                        WebkitBoxShadow: `0 0 0px 1000px ${isDarkMode ? '#1a2e20' : '#f1f5f9'} inset`,
                                                        WebkitTextFillColor: isDarkMode ? '#fff' : '#0e1b12'
                                                    } as any}
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
                                        onClick={() => {
                                            if (step === 2) {
                                                handleRegister();
                                            } else {
                                                setStep(step + 1);
                                            }
                                        }}
                                        disabled={loading}
                                        className="w-full bg-primary hover:bg-primary-dark text-[#0e1b12] font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                                        type="button"
                                    >
                                        <span>{loading ? 'Processando...' : (step === 2 ? 'Finalizar Cadastro' : 'Próximo Passo')}</span>
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
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
