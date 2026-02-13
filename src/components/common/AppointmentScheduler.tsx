import React, { useState } from 'react';
import { useDoctors } from '../../hooks/useDoctors';
import { motion } from 'framer-motion';

interface AppointmentSchedulerProps {
    onSchedule: (data: { doctorId: string; date: string; time: string }) => void;
    institutionId: string;
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({ onSchedule, institutionId }) => {
    const { doctors, loading } = useDoctors(institutionId);
    const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const timeSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];

    if (loading) return <div className="p-8 text-center text-sm font-bold opacity-50">Carregando especialistas...</div>;

    const handleSubmit = () => {
        if (selectedDoctor && selectedDate && selectedTime) {
            onSchedule({ doctorId: selectedDoctor, date: selectedDate, time: selectedTime });
        }
    };

    return (
        <div className="space-y-8 py-4">
            <div>
                <label className="text-xs font-black uppercase tracking-widest text-text-subtle mb-4 block">1. Selecione o Especialista</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {doctors.map((doc) => (
                        <button
                            key={doc.id}
                            type="button"
                            onClick={() => setSelectedDoctor(doc.id)}
                            className={`p-4 rounded-2xl border transition-all text-left flex items-center gap-4 ${selectedDoctor === doc.id
                                    ? 'bg-primary/5 border-primary shadow-lg shadow-primary/10'
                                    : 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 hover:border-primary/30'
                                }`}
                        >
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">medical_services</span>
                            </div>
                            <div>
                                <p className="font-bold text-sm tracking-tight">{doc.name}</p>
                                <p className="text-[10px] font-black uppercase text-primary tracking-wider">{doc.specialization}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="text-xs font-black uppercase tracking-widest text-text-subtle mb-4 block">2. Escolha a Data</label>
                    <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-5 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary font-bold text-sm"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-xs font-black uppercase tracking-widest text-text-subtle mb-4 block">3. Horários Disponíveis</label>
                    <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                            <button
                                key={time}
                                type="button"
                                onClick={() => setSelectedTime(time)}
                                className={`py-2 rounded-lg text-xs font-black transition-all ${selectedTime === time
                                        ? 'bg-primary text-background-dark'
                                        : 'bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 text-text-subtle hover:bg-primary/5'
                                    }`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button
                type="button"
                disabled={!selectedDoctor || !selectedDate || !selectedTime}
                onClick={handleSubmit}
                className="w-full py-5 bg-primary text-background-dark rounded-2xl font-black uppercase text-sm shadow-xl shadow-primary/20 hover:brightness-110 disabled:opacity-50 disabled:brightness-100 transition-all flex items-center justify-center gap-3"
            >
                <span className="material-symbols-outlined">event_available</span>
                Confirmar e Finalizar Cadastro
            </button>
        </div>
    );
};

export default AppointmentScheduler;
