import React, { useState } from 'react';
import { InstitutionPage, Patient, User } from '../../types';
import DashboardLayout from '../layouts/DashboardLayout';
import InstitutionDashboardPage from '../../pages/institution/Dashboard';
import PatientsPage from '../../pages/institution/Patients';
import DoctorsPage from '../../pages/institution/Doctors';
import ReportsPage from '../../pages/institution/Reports';
import ProfilePage from '../../pages/institution/Profile';
import PatientRegistrationForm from './PatientRegistrationForm';
import Modal from '../common/Modal';
import { usePatients } from '../../hooks/usePatients';

interface InstitutionDashboardProps {
    user: User;
    onPageChange: (page: InstitutionPage) => void;
    onLogout: () => void;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
}

import PatientMedicalRecord from '../../pages/institution/PatientMedicalRecord';

const InstitutionDashboard: React.FC<InstitutionDashboardProps> = ({ user, onPageChange, onLogout, isDarkMode, onToggleDarkMode }) => {
    const [activePage, setActivePage] = useState<InstitutionPage>('inst_dashboard');
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
    const { refresh } = usePatients('institution', user.id);

    const handlePageChange = (page: InstitutionPage) => {
        setSelectedPatientId(null);
        setActivePage(page);
        onPageChange(page);
    };

    // Stats for Dashboard Page
    const stats = [
        { label: 'Total Pacientes', value: '...', icon: 'group', color: 'purple' },
        { label: 'Em Tratamento', value: '...', icon: 'local_hospital', color: 'primary' },
        { label: 'Receita Est.', value: 'R$ 42k', icon: 'payments', color: 'blue' },
        { label: 'NPS Clínica', value: '4.9', icon: 'star', color: 'amber' },
    ];

    const sidebarItems = [
        { id: 'inst_dashboard', icon: 'grid_view', label: 'Dashboard' },
        { id: 'inst_patients', icon: 'group', label: 'Pacientes' },
        { id: 'inst_doctors', icon: 'medical_services', label: 'Corpo Clínico' },
        { id: 'inst_reports', icon: 'analytics', label: 'Métricas' },
        { id: 'inst_profile', icon: 'business', label: 'Perfil da Clínica' },
    ];

    const infoCards = [
        {
            icon: 'trending_up',
            label: 'Desempenho',
            title: 'Receita Mensal',
            subtitle: 'R$ 42.500 (+12%)',
            actionLabel: 'Ver Detalhes'
        },
    ];

    const renderContent = () => {
        if (selectedPatientId) {
            return (
                <PatientMedicalRecord
                    patientId={selectedPatientId}
                    onBack={() => setSelectedPatientId(null)}
                />
            );
        }

        switch (activePage) {
            case 'inst_dashboard':
                return (
                    <InstitutionDashboardPage
                        stats={stats}
                        patients={[]}
                        onManageList={() => handlePageChange('inst_patients')}
                    />
                );
            case 'inst_patients':
                return (
                    <PatientsPage
                        institutionId={user.id}
                        onViewRecord={(id) => setSelectedPatientId(id)}
                    />
                );
            case 'inst_doctors':
                return <DoctorsPage institutionId={user.id} />;
            case 'inst_reports':
                return <ReportsPage />;
            case 'inst_profile':
                return <ProfilePage />;
            default:
                return null;
        }
    };

    return (
        <>
            <DashboardLayout
                user={user}
                activePage={activePage}
                onPageChange={(p) => handlePageChange(p as InstitutionPage)}
                onLogout={onLogout}
                sidebarItems={sidebarItems}
                infoCards={infoCards}
                isDarkMode={isDarkMode}
                onToggleDarkMode={onToggleDarkMode}
                title={
                    activePage === 'inst_dashboard' ? 'Painel da Instituição' :
                        activePage === 'inst_patients' ? 'Gestão de Pacientes' :
                            activePage === 'inst_doctors' ? 'Corpo Clínico' :
                                activePage === 'inst_reports' ? 'Relatórios Institucionais' : 'Perfil da Instituição'
                }
                statusLabel="Rede Rootcare"
                statusDetail="Conectada"
                onTitleClick={() => handlePageChange('inst_dashboard')}
            >
                <div className="flex flex-col gap-8">
                    {activePage === 'inst_dashboard' && (
                        <div className="flex justify-end -mb-4">
                            <button
                                onClick={() => setShowRegisterModal(true)}
                                className="flex items-center gap-2 px-6 py-3 bg-primary text-background-dark rounded-xl font-black text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                            >
                                <span className="material-symbols-outlined">person_add</span>
                                Novo Paciente
                            </button>
                        </div>
                    )}
                    {renderContent()}
                </div>
            </DashboardLayout>

            <Modal
                isOpen={showRegisterModal}
                onClose={() => setShowRegisterModal(false)}
                title="Cadastro de Novo Paciente"
                subtitle="Siga as etapas para registrar o paciente e agendar a primeira consulta."
                size="large"
            >
                <PatientRegistrationForm
                    institutionId={user.id}
                    onSuccess={() => {
                        setShowRegisterModal(false);
                        refresh();
                    }}
                    onCancel={() => setShowRegisterModal(false)}
                />
            </Modal>
        </>
    );
};

export default InstitutionDashboard;
