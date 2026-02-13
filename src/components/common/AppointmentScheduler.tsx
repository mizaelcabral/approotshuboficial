import React, { useState } from 'react';
import { useDoctors } from '../../hooks/useDoctors';
import { motion, AnimatePresence } from 'framer-motion';

interface AppointmentSchedulerProps {
    onSchedule: (data: { doctorId: string; date: string; time: string }) => void;
    institutionId: string;
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({ onSchedule, institutionId }) => {
    const { doctors, loading } = useDoctors(institutionId);
    const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [showAllTimes, setShowAllTimes] = useState(false);

    const timeSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];

    const displayedTimes = showAllTimes ? timeSlots : timeSlots.slice(0, 6);

    if (loading) return (
        <div className="p-12 text-center flex flex-col items-center gap-4">
            <div className="size-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-sm font-bold text-text-subtle">Carregando corpo clínico...</p>
        </div>
    );

    const handleSubmit = () => {
        if (selectedDoctor && selectedDate && selectedTime) {
            onSchedule({ doctorId: selectedDoctor, date: selectedDate, time: selectedTime });
        }
    };

    return (
        <div className="space-y-8 p-6 md:p-8">
            <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1 block">1. Selecione o Especialista Responsável</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {doctors.map((doc) => (
                        <button
                            key={doc.id}
                            type="button"
                            onClick={() => setSelectedDoctor(doc.id)}
                            className={`p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-4 group ${selectedDoctor === doc.id
                                ? 'bg-primary/10 border-primary shadow-xl shadow-primary/10 scale-[1.02]'
                                : 'bg-white dark:bg-white/[0.02] border-gray-100 dark:border-white/5 hover:border-primary/40'
                                }`}
                        >
                            <div className={`size-12 rounded-xl flex items-center justify-center transition-colors ${selectedDoctor === doc.id ? 'bg-primary text-background-dark' : 'bg-primary/10 text-primary'
                                }`}>
                                <span className="material-symbols-outlined text-xl">medical_services</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-black text-sm tracking-tight truncate">{doc.name}</p>
                                <p className={`text-[10px] font-black uppercase tracking-wider ${selectedDoctor === doc.id ? 'text-primary' : 'text-text-subtle'
                                    }`}>{doc.specialization || 'Médico Prescritor'}</p>
                            </div>
                            {selectedDoctor === doc.id && (
                                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1 block">2. Escolha a Data</label>
                    <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-subtle group-focus-within:text-primary transition-colors">calendar_month</span>
                        <input
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full pl-12 pr-5 py-4 bg-gray-50/50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary font-bold text-sm transition-all"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle block">3. Horários Disponíveis</label>
                        <button
                            type="button"
                            onClick={() => setShowAllTimes(!showAllTimes)}
                            className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                        >
                            {showAllTimes ? 'Recolher' : 'Ver Todos'}
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {displayedTimes.map((time) => (
                            <button
                                key={time}
                                type="button"
                                onClick={() => setSelectedTime(time)}
                                className={`py-3 rounded-xl text-xs font-black transition-all border-2 ${selectedTime === time
                                    ? 'bg-primary border-primary text-background-dark scale-[1.05] shadow-lg shadow-primary/20'
                                    : 'bg-white dark:bg-white/[0.02] border-gray-100 dark:border-white/5 text-text-subtle hover:border-primary/40'
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
                className="w-full py-5 bg-[#2df377] hover:bg-[#28e16d] text-background-dark rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-[#2df377]/40 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-30 disabled:shadow-none flex items-center justify-center gap-3"
            >
                <span className="material-symbols-outlined font-black">verified</span>
                Finalizar Agendamento
            </button>
        </div>
    );
};

export default AppointmentScheduler;
