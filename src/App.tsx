import React, { useState, useEffect } from 'react';
import { User, UserRole } from './types';
import SuperAdminDashboard from './components/SuperAdmin/SuperAdminDashboard';
import DoctorDashboard from './components/Doctor/DoctorDashboard';
import InstitutionDashboard from './components/Institution/InstitutionDashboard';
import PatientDashboard from './components/patient/PatientDashboard';
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
import { supabase } from './lib/supabase';
import { getProfile, logout as supabaseLogout } from './lib/auth';

export default function App() {
    const [user, setUser] = useState<User | null>(null);
    const [authView, setAuthView] = useState<'login' | 'register'>('login');
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

    const handleLogin = async (email: string, password: string, role: UserRole) => {
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
                    alert(`❌ Perfil incorreto! Este usuário é um ${profile.role}`);
                    await supabaseLogout();
                    return;
                }
                setUser(profile);
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

    if (!user) {
        return authView === 'login'
            ? <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setAuthView('register')} isDarkMode={isDarkMode} />
            : <RegisterPage onBackToLogin={() => setAuthView('login')} isDarkMode={isDarkMode} />;
    }

    // Role-based routing
    switch (user.role) {
        case 'super_admin':
            return <SuperAdminDashboard onPageChange={handlePageChange} onLogout={handleLogout} />;
        case 'doctor':
            return <DoctorDashboard onPageChange={handlePageChange} onLogout={handleLogout} />;
        case 'institution':
            return <InstitutionDashboard onPageChange={handlePageChange} onLogout={handleLogout} />;
        case 'patient':
            return <PatientDashboard user={user} onLogout={handleLogout} isDarkMode={isDarkMode} />;
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
