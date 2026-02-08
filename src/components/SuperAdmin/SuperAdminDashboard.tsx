import React, { useState } from 'react';
import { SuperAdminPage, Institution } from '../../types';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminDashboardPage from '../../pages/admin/Dashboard';

interface SuperAdminDashboardProps {
    onPageChange: (page: SuperAdminPage) => void;
    onLogout: () => void;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ onPageChange, onLogout }) => {
    const [activePage, setActivePage] = useState<SuperAdminPage>('sa_dashboard');

    const handlePageChange = (page: SuperAdminPage) => {
        setActivePage(page);
        onPageChange(page);
    };

    // User data (this would come from Supabase context eventually)
    const user = {
        id: 'admin-id',
        name: 'Administrador Root',
        email: 'admin@rootcare.com',
        role: 'super_admin' as const
    };

    // Mock data for institutions
    const institutions: Institution[] = [
        { id: '1', name: 'Clínica Bem Estar', location: 'São Paulo, SP', city: 'São Paulo', state: 'SP', patients: 842, revenue: 42500, status: 'active', icon: 'local_hospital' },
        { id: '2', name: 'Instituto Vida Verde', location: 'Curitiba, PR', city: 'Curitiba', state: 'PR', patients: 312, revenue: 18220, status: 'active', icon: 'health_and_safety' },
        { id: '3', name: 'Assoc. Flor da Cura', location: 'Salvador, BA', city: 'Salvador', state: 'BA', patients: 1024, revenue: 58120, status: 'active', icon: 'home_health' },
        { id: '4', name: 'Centro MedCannabis', location: 'Rio de Janeiro, RJ', city: 'Rio de Janeiro', state: 'RJ', patients: 154, revenue: 4400, status: 'pending', icon: 'medical_services' },
    ];

    const stats = [
        { label: 'Instituições', value: '12', icon: 'domain', color: 'blue' },
        { label: 'Pacientes Ativos', value: '2.4k', icon: 'group', color: 'primary' },
        { label: 'Faturamento Mensal', value: 'R$ 124k', icon: 'payments', color: 'purple' },
        { label: 'Uptime Sistema', value: '99.9%', icon: 'bolt', color: 'amber' },
    ];

    const sidebarItems = [
        { id: 'sa_dashboard', icon: 'analytics', label: 'Dashboard' },
        { id: 'sa_institutions', icon: 'domain', label: 'Instituições' },
        { id: 'sa_patients', icon: 'group', label: 'Pacientes' },
        { id: 'sa_representatives', icon: 'badge', label: 'Representantes' },
        { id: 'sa_financial', icon: 'payments', label: 'Financeiro' },
        { id: 'sa_pharmacy', icon: 'storefront', label: 'Farmácia' },
        { id: 'sa_settings', icon: 'settings', label: 'Configurações' },
    ];

    return (
        <DashboardLayout
            user={user}
            activePage={activePage}
            onPageChange={(p) => handlePageChange(p as SuperAdminPage)}
            onLogout={onLogout}
            sidebarItems={sidebarItems}
            title="Painel de Controle Nacional"
            statusLabel="Status: Blindado"
        >
            {activePage === 'sa_dashboard' ? (
                <AdminDashboardPage
                    stats={stats}
                    institutions={institutions}
                    onViewInstitutions={() => handlePageChange('sa_institutions')}
                />
            ) : (
                <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-20 rounded-2xl text-center">
                    <span className="material-symbols-outlined text-6xl text-primary/20 mb-4 italic">shield</span>
                    <h3 className="text-xl font-black">Módulo de Segurança Máxima</h3>
                    <p className="text-text-subtle mt-2">Este acesso é restritivo e os logs de atividade estão sendo monitorados.</p>
                    <button onClick={() => handlePageChange('sa_dashboard')} className="mt-6 px-6 py-3 bg-primary text-background-dark rounded-xl font-black text-sm uppercase">Voltar ao Painel</button>
                </div>
            )}
        </DashboardLayout>
    );
};

export default SuperAdminDashboard;
