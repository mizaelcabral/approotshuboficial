import React, { useState } from 'react';
import { DoctorPage, Appointment, User } from '../../types';
import DashboardLayout from '../layouts/DashboardLayout';
import DoctorDashboardPage from '../../pages/doctor/Dashboard';
import PatientsPage from '../../pages/doctor/Patients';
import AppointmentsPage from '../../pages/doctor/Appointments';
import ReportsPage from '../../pages/doctor/Reports';
import ProfilePage from '../../pages/doctor/Profile';
import { useAppointments } from '../../hooks/useAppointments';

interface DoctorDashboardProps {
    user: User;
    onPageChange: (page: DoctorPage) => void;
    onLogout: () => void;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ user, onPageChange, onLogout, isDarkMode, onToggleDarkMode }) => {
    const [activePage, setActivePage] = useState<DoctorPage>('doc_dashboard');
    const [isReportsExpanded, setIsReportsExpanded] = useState(false);

    const handlePageChange = (page: DoctorPage) => {
        setActivePage(page);
        onPageChange(page);
    };

    const { appointments: dbAppointments, loading: aptLoading } = useAppointments('doctor', user.id);

    // Use actual user data
    // Remove the mock user object that was here


    const stats = [
        { label: 'Total de Pacientes', value: '48', icon: 'group', color: 'blue' },
        { label: 'Consultas Hoje', value: '8', icon: 'calendar_today', color: 'green' },
        { label: 'Relatórios Pendentes', value: '3', icon: 'description', color: 'amber' },
        { label: 'Avaliação Média', value: '4.8', icon: 'star', color: 'purple' },
    ];

    const sidebarItems = [
        { id: 'doc_dashboard', icon: 'grid_view', label: 'Dashboard' },
        { id: 'doc_patients', icon: 'group', label: 'Meus Pacientes' },
        { id: 'doc_appointments', icon: 'event_available', label: 'Minha Agenda' },
        {
            id: 'doc_reports',
            icon: 'description',
            label: 'Relatórios',
            hasSubmenu: true,
            isExpanded: isReportsExpanded,
            onClickSub: () => setIsReportsExpanded(!isReportsExpanded),
            activeIds: ['doc_reports', 'doc_reports_pending', 'doc_reports_history'],
            submenu: [
                { id: 'doc_reports_pending', label: 'Pendentes', count: 3 },
                { id: 'doc_reports_history', label: 'Histórico' }
            ]
        },
        { id: 'doc_profile', icon: 'person', label: 'Meu Perfil' },
    ];

    const renderContent = () => {
        if (aptLoading) return <div className="p-20 text-center font-bold">Carregando consultas...</div>;

        const transformedApts = dbAppointments.map((apt: any) => ({
            ...apt,
            patientName: apt.patient?.name || 'Paciente'
        }));

        switch (activePage) {
            case 'doc_dashboard':
                return (
                    <DoctorDashboardPage
                        stats={stats}
                        appointments={transformedApts as any}
                        onViewAppointments={() => handlePageChange('doc_appointments')}
                        onReviewReports={() => handlePageChange('doc_reports_pending')}
                    />
                );
            case 'doc_patients':
                return <PatientsPage doctorId={user.id} />;
            case 'doc_appointments':
                return <AppointmentsPage />;
            case 'doc_reports':
            case 'doc_reports_pending':
                return <ReportsPage filter="pending" />;
            case 'doc_reports_history':
                return <ReportsPage filter="history" />;
            case 'doc_profile':
                return <ProfilePage />;
            default:
                return (
                    <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-20 rounded-2xl text-center">
                        <span className="material-symbols-outlined text-6xl text-primary/20 mb-4 italic">construction</span>
                        <h3 className="text-xl font-black">Em Desenvolvimento</h3>
                        <p className="text-text-subtle mt-2">Esta funcionalidade está sendo atualizada para o novo padrão visual.</p>
                        <button onClick={() => handlePageChange('doc_dashboard')} className="mt-6 px-6 py-3 bg-primary text-background-dark rounded-xl font-black text-sm uppercase">Voltar ao Início</button>
                    </div>
                );
        }
    };

    return (
        <DashboardLayout
            user={user}
            activePage={activePage}
            onPageChange={(p) => handlePageChange(p as DoctorPage)}
            onLogout={onLogout}
            sidebarItems={sidebarItems}
            isDarkMode={isDarkMode}
            onToggleDarkMode={onToggleDarkMode}
            title={
                activePage === 'doc_dashboard' ? 'Painel Médico' :
                    activePage === 'doc_patients' ? 'Gestão de Pacientes' :
                        activePage === 'doc_appointments' ? 'Agenda de Consultas' :
                            activePage.startsWith('doc_reports') ? 'Relatórios de Tratamento' : 'Perfil do Médico'
            }
        >
            {renderContent()}
        </DashboardLayout>
    );
};

export default DoctorDashboard;

