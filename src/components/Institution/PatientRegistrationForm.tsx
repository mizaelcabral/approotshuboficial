import React, { useState } from 'react';
import { usePatients } from '../../hooks/usePatients';
import { useAppointments } from '../../hooks/useAppointments';
import AppointmentScheduler from '../common/AppointmentScheduler';
import { motion, AnimatePresence } from 'framer-motion';

interface PatientRegistrationFormProps {
    institutionId: string;
    onSuccess: () => void;
    onCancel: () => void;
}

const PatientRegistrationForm: React.FC<PatientRegistrationFormProps> = ({ institutionId, onSuccess, onCancel }) => {
    const [step, setStep] = useState(1);
    const { createPatient, loading: patientLoading, error: patientError } = usePatients();
    const { createAppointment } = useAppointments();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        cpf: '',
        birthDate: '',
        address_street: '',
        address_number: '',
        address_complement: '',
        address_neighborhood: '',
        address_city: '',
        address_state: '',
        address_zip: '',
        institution_id: institutionId
    });

    const [createdPatientId, setCreatedPatientId] = useState<string | null>(null);

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreatePatient = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await createPatient(formData);
            if (user) {
                setCreatedPatientId(user.id);
                handleNext();
            }
        } catch (error) {
            console.error("Erro ao criar paciente:", error);
        }
    };

    const handleSchedule = async (scheduleData: { doctorId: string; date: string; time: string }) => {
        if (!createdPatientId) return;

        try {
            await createAppointment({
                patient_id: createdPatientId,
                doctor_id: scheduleData.doctorId,
                appointment_date: scheduleData.date,
                appointment_time: scheduleData.time,
                type: 'consultation',
                notes: 'Primeira consulta - Cadastro ANVISA'
            });
            onSuccess();
        } catch (error) {
            console.error("Erro ao agendar:", error);
        }
    };

    const steps = [
        { id: 1, label: 'Dados Básicos', icon: 'person' },
        { id: 2, label: 'Endereço ANVISA', icon: 'location_on' },
        { id: 3, label: 'Agendamento', icon: 'event' }
    ];

    return (
        <div className="max-w-3xl mx-auto py-2">
            {/* Improved Progress Header */}
            <div className="flex items-center justify-between mb-10 px-4 relative">
                <div className="absolute top-5 left-10 right-10 h-0.5 bg-gray-100 dark:bg-white/5 -z-10" />
                <div
                    className="absolute top-5 left-10 h-0.5 bg-primary transition-all duration-500 -z-10"
                    style={{ width: `${(step - 1) * 45}%` }}
                />

                {steps.map((s) => (
                    <div key={s.id} className="flex flex-col items-center gap-2">
                        <div className={`size-10 rounded-full flex items-center justify-center transition-all duration-300 ${step >= s.id
                            ? 'bg-primary text-background-dark shadow-xl shadow-primary/30 scale-110'
                            : 'bg-white dark:bg-[#1a2e20] border-2 border-gray-100 dark:border-white/5 text-text-subtle'
                            }`}>
                            <span className="material-symbols-outlined text-lg">{step > s.id ? 'check' : s.icon}</span>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s.id ? 'text-primary' : 'text-text-subtle'
                            }`}>{s.label}</span>
                    </div>
                ))}
            </div>

            {patientError && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-sm font-bold animate-shake">
                    <span className="material-symbols-outlined">error</span>
                    {patientError}
                </div>
            )}

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="md:col-span-2">
                                <InputField label="Nome Completo" name="name" value={formData.name} onChange={handleInputChange} placeholder="Ex: João da Silva Santos" icon="badge" />
                            </div>
                            <InputField label="E-mail" name="email" value={formData.email} onChange={handleInputChange} placeholder="joao@email.com" type="email" icon="mail" />
                            <InputField label="Telefone/WhatsApp" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(11) 99999-9999" icon="call" />
                            <InputField label="CPF" name="cpf" value={formData.cpf} onChange={handleInputChange} placeholder="000.000.000-00" icon="fingerprint" />
                            <InputField label="Data de Nascimento" name="birthDate" value={formData.birthDate} onChange={handleInputChange} type="date" icon="calendar_today" />
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button onClick={onCancel} className="flex-1 py-4 bg-gray-50 dark:bg-white/5 text-text-subtle hover:text-text-main dark:hover:text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all">Cancelar</button>
                            <button
                                onClick={handleNext}
                                disabled={!formData.name || !formData.email || !formData.cpf}
                                className="flex-[2] py-4 bg-[#2df377] hover:bg-[#28e16d] text-background-dark rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#2df377]/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale-0"
                            >
                                Próximo: Endereço
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
                            <div className="md:col-span-4">
                                <InputField label="Rua/Avenida" name="address_street" value={formData.address_street} onChange={handleInputChange} placeholder="Nome da rua ou logradouro" icon="home" />
                            </div>
                            <div className="md:col-span-2">
                                <InputField label="Número" name="address_number" value={formData.address_number} onChange={handleInputChange} placeholder="123" />
                            </div>
                            <div className="md:col-span-3">
                                <InputField label="Bairro" name="address_neighborhood" value={formData.address_neighborhood} onChange={handleInputChange} placeholder="Ex: Jardins" icon="map" />
                            </div>
                            <div className="md:col-span-3">
                                <InputField label="Complemento" name="address_complement" value={formData.address_complement} onChange={handleInputChange} placeholder="Apto, Bloco, etc." />
                            </div>
                            <div className="md:col-span-3">
                                <InputField label="Cidade" name="address_city" value={formData.address_city} onChange={handleInputChange} placeholder="Ex: São Paulo" icon="location_city" />
                            </div>
                            <div className="md:col-span-1">
                                <InputField label="UF" name="address_state" value={formData.address_state} onChange={handleInputChange} placeholder="SP" maxLength={2} />
                            </div>
                            <div className="md:col-span-2">
                                <InputField label="CEP" name="address_zip" value={formData.address_zip} onChange={handleInputChange} placeholder="00000-000" icon="pin_drop" />
                            </div>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button onClick={handleBack} className="flex-1 py-4 bg-gray-50 dark:bg-white/5 text-text-subtle hover:text-text-main dark:hover:text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all">Voltar</button>
                            <button
                                onClick={handleCreatePatient}
                                disabled={patientLoading}
                                className="flex-[2] py-4 bg-[#2df377] hover:bg-[#28e16d] text-background-dark rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#2df377]/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70 disabled:grayscale-0"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    {patientLoading ? (
                                        <>
                                            <div className="size-4 border-2 border-background-dark/30 border-t-background-dark rounded-full animate-spin" />
                                            <span>Salvando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-lg font-black">save</span>
                                            <span>Concluir e Agendar</span>
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                    >
                        <div className="bg-primary/10 border border-primary/20 p-6 rounded-3xl mb-8 flex items-center gap-6">
                            <div className="size-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-4xl">celebration</span>
                            </div>
                            <div>
                                <h3 className="font-black text-lg text-primary leading-tight">Sucesso! Paciente Registrado.</h3>
                                <p className="text-sm text-text-subtle font-bold">O prontuário de {formData.name} foi criado. Agende agora a avaliação.</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm">
                            <AppointmentScheduler institutionId={institutionId} onSchedule={handleSchedule} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const InputField = ({ label, icon, ...props }: any) => (
    <div className="space-y-1.5 text-left group">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1 group-focus-within:text-primary transition-colors">{label}</label>
        <div className="relative flex items-center">
            {icon && (
                <span className="absolute left-4 material-symbols-outlined text-lg text-text-subtle group-focus-within:text-primary transition-colors">
                    {icon}
                </span>
            )}
            <input
                {...props}
                className={`w-full ${icon ? 'pl-12' : 'px-5'} py-4 bg-gray-50/50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary font-bold text-sm transition-all placeholder:text-text-subtle/50 text-text-main dark:text-white`}
            />
        </div>
    </div>
);

export default PatientRegistrationForm;
