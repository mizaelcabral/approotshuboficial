import React, { useState } from 'react';
import { InstitutionPage, Patient } from '../../types';
import DashboardLayout from '../layouts/DashboardLayout';
import InstitutionDashboardPage from '../../pages/institution/Dashboard';
import Modal from '../common/Modal';

interface InstitutionDashboardProps {
    onPageChange: (page: InstitutionPage) => void;
    onLogout: () => void;
}

const InstitutionDashboard: React.FC<InstitutionDashboardProps> = ({ onPageChange, onLogout }) => {
    const [activePage, setActivePage] = useState<InstitutionPage>('inst_dashboard');
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handlePageChange = (page: InstitutionPage) => {
        setActivePage(page);
        onPageChange(page);
    };

    // User data
    const user = {
        id: 'inst-id',
        name: 'Clínica Bem Estar',
        email: 'clinica@bemestar.com',
        role: 'institution' as const
    };

    // Mock data
    const patients: Patient[] = [
        { id: '1', name: 'João Silva', email: 'joao@email.com', phone: '(11) 98765-4321', institutionId: '1', institutionName: 'Clínica Bem Estar', doctorName: 'Dr. Carlos', status: 'active', treatmentProgress: 65, financialStatus: 'regular', registrationDate: '2024-01-15' },
        { id: '2', name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 98765-4322', institutionId: '1', institutionName: 'Clínica Bem Estar', doctorName: 'Dra. Ana', status: 'active', treatmentProgress: 80, financialStatus: 'regular', registrationDate: '2024-01-20' },
        { id: '3', name: 'Pedro Costa', email: 'pedro@email.com', phone: '(11) 98765-4323', institutionId: '1', institutionName: 'Clínica Bem Estar', status: 'pending', treatmentProgress: 0, financialStatus: 'pending', registrationDate: '2024-02-01' },
    ];

    const stats = [
        { label: 'Total Pacientes', value: patients.length, icon: 'group', color: 'purple' },
        { label: 'Em Tratamento', value: patients.filter(p => p.status === 'active').length, icon: 'local_hospital', color: 'primary' },
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

    return (
        <>
            <DashboardLayout
                user={user}
                activePage={activePage}
                onPageChange={(p) => handlePageChange(p as InstitutionPage)}
                onLogout={onLogout}
                sidebarItems={sidebarItems}
                infoCards={infoCards}
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
                            <button onClick={() => setShowRegisterModal(true)} className="flex items-center gap-2 px-6 py-3 bg-primary text-background-dark rounded-xl font-black text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined">person_add</span>
                                Novo Paciente
                            </button>
                        </div>
                    )}

                    {activePage === 'inst_dashboard' ? (
                        <InstitutionDashboardPage
                            stats={stats}
                            patients={patients}
                            onManageList={() => handlePageChange('inst_patients')}
                        />
                    ) : (
                        <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-20 rounded-2xl text-center">
                            <span className="material-symbols-outlined text-6xl text-primary/20 mb-4 italic">architecture</span>
                            <h3 className="text-xl font-black">Em Atualização Visual</h3>
                            <p className="text-text-subtle mt-2">Esta tela está sendo adaptada para o novo padrão de design premium.</p>
                            <button onClick={() => handlePageChange('inst_dashboard')} className="mt-6 px-6 py-3 bg-primary text-background-dark rounded-xl font-black text-sm uppercase">Ir para Resumo</button>
                        </div>
                    )}
                </div>
            </DashboardLayout>

            <Modal
                isOpen={showRegisterModal}
                onClose={() => setShowRegisterModal(false)}
                title="Cadastro de Paciente"
                subtitle="Preencha os dados básicos para iniciar o prontuário."
            >
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <input className="w-full px-5 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary font-bold text-sm" placeholder="Nome Completo" />
                    <input className="w-full px-5 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary font-bold text-sm" placeholder="E-mail" />
                    <div className="flex gap-4">
                        <button type="button" onClick={() => setShowRegisterModal(false)} className="flex-1 py-4 bg-gray-100 dark:bg-white/5 rounded-2xl font-black text-sm transition-all hover:bg-gray-200">Cancelar</button>
                        <button type="submit" className="flex-1 py-4 bg-primary text-background-dark rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:brightness-110">Cadastrar</button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default InstitutionDashboard;
