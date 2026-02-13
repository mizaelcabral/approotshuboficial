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
    const { createPatient, loading: patientLoading } = usePatients();
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

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Header */}
            <div className="flex items-center justify-between mb-12">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center flex-1 last:flex-none">
                        <div className={`size-10 rounded-xl flex items-center justify-center font-black text-xs transition-all ${step >= s ? 'bg-primary text-background-dark shadow-lg shadow-primary/20' : 'bg-gray-100 dark:bg-white/5 text-text-subtle'
                            }`}>
                            {s}
                        </div>
                        {s < 3 && <div className={`h-1 flex-1 mx-4 rounded-full transition-all ${step > s ? 'bg-primary' : 'bg-gray-100 dark:bg-white/5'}`} />}
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Nome Completo" name="name" value={formData.name} onChange={handleInputChange} placeholder="Ex: João Silva" />
                            <InputField label="E-mail" name="email" value={formData.email} onChange={handleInputChange} placeholder="joao@email.com" />
                            <InputField label="CPF" name="cpf" value={formData.cpf} onChange={handleInputChange} placeholder="000.000.000-00" />
                            <InputField label="Data de Nascimento" name="birthDate" value={formData.birthDate} onChange={handleInputChange} type="date" />
                            <InputField label="Telefone/WhatsApp" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(11) 99999-9999" />
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button onClick={onCancel} className="flex-1 py-4 bg-gray-100 dark:bg-white/5 rounded-2xl font-black text-sm uppercase">Cancelar</button>
                            <button onClick={handleNext} disabled={!formData.name || !formData.cpf} className="flex-1 py-4 bg-primary text-background-dark rounded-2xl font-black text-sm uppercase shadow-xl shadow-primary/20 hover:brightness-110 disabled:opacity-50">Próximo: Endereço</button>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                                <InputField label="Rua/Avenida" name="address_street" value={formData.address_street} onChange={handleInputChange} placeholder="Nome da rua" />
                            </div>
                            <InputField label="Número" name="address_number" value={formData.address_number} onChange={handleInputChange} placeholder="123" />
                            <InputField label="Complemento" name="address_complement" value={formData.address_complement} onChange={handleInputChange} placeholder="Apto 10" />
                            <InputField label="Bairro" name="address_neighborhood" value={formData.address_neighborhood} onChange={handleInputChange} placeholder="Centro" />
                            <InputField label="Cidade" name="address_city" value={formData.address_city} onChange={handleInputChange} placeholder="São Paulo" />
                            <InputField label="Estado (UF)" name="address_state" value={formData.address_state} onChange={handleInputChange} placeholder="SP" />
                            <InputField label="CEP" name="address_zip" value={formData.address_zip} onChange={handleInputChange} placeholder="00000-000" />
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button onClick={handleBack} className="flex-1 py-4 bg-gray-100 dark:bg-white/5 rounded-2xl font-black text-sm uppercase">Voltar</button>
                            <button onClick={handleCreatePatient} disabled={patientLoading} className="flex-1 py-4 bg-primary text-background-dark rounded-2xl font-black text-sm uppercase shadow-xl shadow-primary/20 hover:brightness-110">
                                {patientLoading ? 'Salvando...' : 'Salvar e Agendar'}
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl mb-8">
                            <h3 className="font-bold text-primary flex items-center gap-2 mb-1">
                                <span className="material-symbols-outlined text-xl">check_circle</span>
                                Paciente Criado com Sucesso!
                            </h3>
                            <p className="text-xs text-text-subtle">Agora, escolha o médico e horário para a primeira consulta de avaliação ANVISA.</p>
                        </div>
                        <AppointmentScheduler institutionId={institutionId} onSchedule={handleSchedule} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const InputField = ({ label, ...props }: any) => (
    <div className="space-y-2 text-left">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-2">{label}</label>
        <input
            {...props}
            className="w-full px-5 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary font-bold text-sm transition-all"
        />
    </div>
);

export default PatientRegistrationForm;
