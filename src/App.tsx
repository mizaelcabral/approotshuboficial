import React, { useState, useEffect } from 'react';
import { User, UserRole } from './types';
import SuperAdminDashboard from './components/SuperAdmin/SuperAdminDashboard';
import DoctorDashboard from './components/Doctor/DoctorDashboard';
import InstitutionDashboard from './components/Institution/InstitutionDashboard';
import PatientDashboard from './components/patient/PatientDashboard';
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
import { supabase } from './lib/supabase';
import { getProfile, logout as supabaseLogout, getInstitutionBySlug } from './lib/auth';
import InstitutionLandingPage from './pages/public/InstitutionLandingPage';

export default function App() {
    const [user, setUser] = useState<User | null>(null);
    const [authView, setAuthView] = useState<'login' | 'register'>('login');
    const [publicInstitution, setPublicInstitution] = useState<User | null>(null);
    const [isLoadingPath, setIsLoadingPath] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    useEffect(() => {
        // Initial session check
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                getProfile(session.user.id).then(profile => {
                    if (profile) setUser(profile);
                });
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                getProfile(session.user.id).then(profile => {
                    if (profile) {
                        setUser(profile);
                    }
                });
            } else {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        const checkPublicPath = async () => {
            const path = window.location.pathname.split('/').filter(Boolean)[0];
            if (path && path !== 'login' && path !== 'register') {
                const inst = await getInstitutionBySlug(path);
                if (inst) {
                    setPublicInstitution(inst);
                }
            }
            setIsLoadingPath(false);
        };
        checkPublicPath();
    }, []);

    const handleLogin = async (email: string, password: string, role: UserRole) => {
        // Demo access bypass
        const demoCredentials: Record<string, string> = {
            'paciente@rootcare.com': 'demo123',
            'medico@rootcare.com': 'demo123',
            'instituicao@rootcare.com': 'demo123',
            'admin@rootcare.com': 'demo123'
        };

        if (demoCredentials[email] === password) {
            const mockUser: User = {
                id: 'demo-uuid-' + role,
                name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
                email: email,
                role: role
            };
            setUser(mockUser);
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            alert(`❌ Erro no login: ${error.message}`);
            return;
        }

        if (data.user) {
            const profile = await getProfile(data.user.id);
            if (profile) {
                if (profile.role !== role) {
                    alert(`❌ Perfil incorreto! Este usuário está registrado como "${profile.role}". Por favor, selecione o ícone correto no login.`);
                    await supabaseLogout();
                    return;
                }
                setUser(profile);
            } else {
                alert(`❌ Erro: Perfil não encontrado. Por favor, tente novamente ou entre em contato com o suporte.`);
                await supabaseLogout();
            }
        }
    };

    const handleLogout = async () => {
        await supabaseLogout();
        setUser(null);
        setAuthView('login');
        localStorage.clear();
        sessionStorage.clear();
    };

    const handlePageChange = (page: any) => {
        console.log('Page change tracking:', page);
    };

    const toggleDarkMode = () => setIsDarkMode(prev => !prev);

    if (isLoadingPath) {
        return (
            <div className="flex items-center justify-center h-screen bg-background-light dark:bg-background-dark">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        if (publicInstitution) {
            return (
                <InstitutionLandingPage
                    institution={publicInstitution}
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={toggleDarkMode}
                />
            );
        }

        return authView === 'login'
            ? <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setAuthView('register')} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
            : <RegisterPage onBackToLogin={() => setAuthView('login')} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />;
    }

    // Role-based routing
    switch (user.role) {
        case 'super_admin':
            return <SuperAdminDashboard user={user} onPageChange={handlePageChange} onLogout={handleLogout} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />;
        case 'doctor':
            return <DoctorDashboard user={user} onPageChange={handlePageChange} onLogout={handleLogout} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />;
        case 'institution':
            return <InstitutionDashboard user={user} onPageChange={handlePageChange} onLogout={handleLogout} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />;
        case 'patient':
            return <PatientDashboard user={user} onLogout={handleLogout} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />;

        default:
            return (
                <div className="flex items-center justify-center h-screen bg-background-light dark:bg-background-dark">
                    <div className="text-center">
                        <h1 className="text-2xl font-black">Role desconhecida: {user.role}</h1>
                        <button onClick={handleLogout} className="mt-4 px-6 py-2 bg-primary rounded-xl font-bold">Sair</button>
                    </div>
                </div>
            );
    }
}
