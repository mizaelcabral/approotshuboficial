import React from 'react';
import { useAppointments } from '../../hooks/useAppointments';
import { User } from '../../types';

interface AppointmentsPageProps {
    user: User;
}

const AppointmentLogCard = ({ date, month, time, doctor, description, status, type }: any) => (
    <div className={`p-6 rounded-2xl border ${status === 'confirmed' ? 'bg-primary/5 dark:bg-primary/10 border-primary/20 relative overflow-hidden' : 'bg-white dark:bg-dark-surface border-gray-100 dark:border-white/10 opacity-90'}`}>
        {status === 'confirmed' && <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-white text-[10px] font-bold uppercase rounded-bl-xl shadow-sm">Próxima</div>}
        <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className={`flex-shrink-0 text-center md:border-r ${status === 'confirmed' ? 'border-primary/20' : 'border-gray-100 dark:border-white/10'} md:pr-6 ${status !== 'confirmed' && 'opacity-60'}`}>
                <p className="text-xs font-bold uppercase text-primary">{month}</p>
                <p className="text-3xl font-black">{date}</p>
                <p className="text-sm font-medium">{time}</p>
            </div>
            <div className="flex-1">
                <span className="px-2 py-0.5 text-[10px] font-bold rounded uppercase bg-primary/20 text-primary">{type}</span>
                <h4 className="text-lg font-bold">{doctor}</h4>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-md">{status === 'confirmed' ? 'Entrar na Sala' : 'Ver Detalhes'}</button>
        </div>
    </div>
);

const AppointmentsPage: React.FC<AppointmentsPageProps> = ({ user }) => {
    const { appointments, loading } = useAppointments('patient', user.id);

    const getMonthName = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleString('pt-BR', { month: 'long' });
    };

    const getDay = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.getDate();
    };

    if (loading) return <div className="p-20 text-center font-bold">Carregando sua agenda...</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">history</span>
                    Meu Histórico de Consultas
                </h3>
            </div>

            <div className="space-y-4">
                {appointments.length === 0 ? (
                    <div className="p-12 text-center bg-white dark:bg-white/5 border border-dashed border-gray-200 dark:border-white/10 rounded-3xl">
                        <span className="material-symbols-outlined text-4xl text-text-subtle mb-4">calendar_today</span>
                        <p className="text-text-subtle font-bold">Nenhuma consulta agendada.</p>
                    </div>
                ) : (
                    appointments.map((apt) => (
                        <AppointmentLogCard
                            key={apt.id}
                            date={getDay(apt.appointment_date)}
                            month={getMonthName(apt.appointment_date)}
                            time={apt.appointment_time}
                            doctor={apt.doctor?.name || 'Especialista'}
                            description={apt.notes || 'Consulta de rotina'}
                            status={apt.status}
                            type={apt.type === 'consultation' ? 'Consulta' : 'Retorno'}
                        />
                    ))
                )}
            </div>

            <div className="bg-green-600 rounded-2xl p-6 text-white flex items-center justify-between">
                <div className="space-y-1">
                    <h4 className="font-bold text-lg leading-tight">Precisa de ajuda com o agendamento?</h4>
                    <p className="text-white/80 text-sm">Nossa concierge está disponível para auxiliar você.</p>
                </div>
                <button className="bg-white text-green-600 px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg whitespace-nowrap ml-4">Falar com Suporte</button>
            </div>
        </div>
    );
};

export default AppointmentsPage;
