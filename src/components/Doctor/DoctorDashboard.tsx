import React, { useState } from 'react';
import { DoctorPage, Appointment } from '../../types';
import DashboardLayout from '../layouts/DashboardLayout';
import DoctorDashboardPage from '../../pages/doctor/Dashboard';

interface DoctorDashboardProps {
    onPageChange: (page: DoctorPage) => void;
    onLogout: () => void;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ onPageChange, onLogout }) => {
    const [activePage, setActivePage] = useState<DoctorPage>('doc_dashboard');
    const [isReportsExpanded, setIsReportsExpanded] = useState(false);

    const handlePageChange = (page: DoctorPage) => {
        setActivePage(page);
        onPageChange(page);
    };

    // Mock User
    const user = {
        id: 'doc-id',
        name: 'Dr. Carlos Silva',
        email: 'medico@rootcare.com',
        role: 'doctor' as const,
        avatar: '/images/doctor-green.png'
    };

    const appointments: Appointment[] = [
        { id: '1', patientId: '1', patientName: 'João Silva', doctorId: '1', doctorName: 'Dr. Carlos', date: '2024-02-05', time: '14:30', status: 'pending', type: 'consultation' },
        { id: '2', patientId: '2', patientName: 'Maria Santos', doctorId: '1', doctorName: 'Dr. Carlos', date: '2024-02-05', time: '15:00', status: 'confirmed', type: 'follow-up' },
        { id: '3', patientId: '3', patientName: 'Pedro Costa', doctorId: '1', doctorName: 'Dr. Carlos', date: '2024-02-06', time: '10:00', status: 'confirmed', type: 'consultation' },
    ];

    const stats = [
        { label: 'Total de Pacientes', value: '48', icon: 'group', color: 'blue' },
        { label: 'Consultas Hoje', value: '2', icon: 'calendar_today', color: 'green' },
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
            submenu: [
                { id: 'doc_reports_pending', label: 'Pendentes', count: 3 },
                { id: 'doc_reports_history', label: 'Histórico' }
            ]
        },
        { id: 'doc_profile', icon: 'person', label: 'Meu Perfil' },
    ];

    return (
        <DashboardLayout
            user={user}
            activePage={activePage}
            onPageChange={(p) => handlePageChange(p as DoctorPage)}
            onLogout={onLogout}
            sidebarItems={sidebarItems}
            title={
                activePage === 'doc_dashboard' ? 'Painel Médico' :
                    activePage === 'doc_patients' ? 'Gestão de Pacientes' :
                        activePage === 'doc_appointments' ? 'Agenda de Consultas' :
                            activePage === 'doc_reports' ? 'Relatórios de Tratamento' : 'Perfil do Médico'
            }
        >
            {activePage === 'doc_dashboard' ? (
                <DoctorDashboardPage
                    stats={stats}
                    appointments={appointments}
                    onViewAppointments={() => handlePageChange('doc_appointments')}
                    onReviewReports={() => handlePageChange('doc_reports')}
                />
            ) : (
                <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-20 rounded-2xl text-center">
                    <span className="material-symbols-outlined text-6xl text-primary/20 mb-4 italic">construction</span>
                    <h3 className="text-xl font-black">Em Desenvolvimento</h3>
                    <p className="text-text-subtle mt-2">Esta funcionalidade está sendo atualizada para o novo padrão visual.</p>
                    <button onClick={() => handlePageChange('doc_dashboard')} className="mt-6 px-6 py-3 bg-primary text-background-dark rounded-xl font-black text-sm uppercase">Voltar ao Início</button>
                </div>
            )}
        </DashboardLayout>
    );
};

export default DoctorDashboard;
