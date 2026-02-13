import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface Appointment {
    id: string;
    patient_id: string;
    doctor_id: string;
    appointment_date: string;
    appointment_time: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    type: 'consultation' | 'follow-up' | 'emergency';
    notes?: string;
    created_at: string;
    patient?: { name: string; email: string };
    doctor?: { name: string; specialization: string };
}

export const useAppointments = (role?: 'patient' | 'doctor' | 'institution', id?: string) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            let query = supabase.from('appointments').select(`
                *,
                patient:patient_id(name, email),
                doctor:doctor_id(name, specialization)
            `);

            if (role === 'patient') {
                query = query.eq('patient_id', id);
            } else if (role === 'doctor') {
                query = query.eq('doctor_id', id);
            } else if (role === 'institution') {
                // For institutions, we might need to filter by patients that belong to the institution
                // This assumes we have a link or we fetch all and filter.
                // For now, let's fetch all as a placeholder or improve if schema allows.
                // Better approach: filter by patients where institution_id = id
                const { data: patientIds } = await supabase
                    .from('profiles')
                    .select('id')
                    .eq('institution_id', id);

                if (patientIds && patientIds.length > 0) {
                    query = query.in('patient_id', patientIds.map(p => p.id));
                } else {
                    setAppointments([]);
                    setLoading(false);
                    return;
                }
            }

            const { data, error: err } = await query.order('appointment_date', { ascending: true });

            if (err) throw err;
            setAppointments(data as Appointment[]);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const createAppointment = async (appointmentData: Omit<Appointment, 'id' | 'created_at' | 'status'>) => {
        try {
            const { data, error: err } = await supabase
                .from('appointments')
                .insert([{ ...appointmentData, status: 'pending' }])
                .select()
                .single();

            if (err) throw err;
            setAppointments(prev => [...prev, data as Appointment]);
            return data;
        } catch (e: any) {
            setError(e.message);
            throw e;
        }
    };

    useEffect(() => {
        if (id) fetchAppointments();
    }, [role, id]);

    return { appointments, loading, error, createAppointment, refresh: fetchAppointments };
};
