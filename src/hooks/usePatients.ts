import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Patient } from '../types';

export const usePatients = (role?: 'doctor' | 'institution', id?: string) => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPatients = async () => {
        try {
            setLoading(true);
            let query = supabase
                .from('profiles')
                .select('*')
                .eq('role', 'patient');

            if (role === 'doctor') {
                // If we need specifically patients assigned to a doctor, we'd need a bridge table or appointment check
                // For now, let's filter by institution if id is provided
                query = query.eq('institution_id', id);
            } else if (role === 'institution') {
                query = query.eq('institution_id', id);
            }

            const { data, error: err } = await query;
            if (err) throw err;

            const transformed: Patient[] = (data || []).map(p => ({
                id: p.id,
                name: p.name || 'Sem nome',
                email: p.email || '',
                phone: p.phone || '',
                institutionId: p.institution_id || '',
                institutionName: 'Rootcare Unit',
                status: 'active',
                treatmentProgress: 0,
                financialStatus: 'regular',
                registrationDate: new Date(p.created_at).toLocaleDateString('pt-BR'),
                avatar: p.avatar_url,
                // ANVISA fields exposure
                cpf: p.cpf,
                birthDate: p.birth_date,
                address: {
                    street: p.address_street,
                    number: p.address_number,
                    complement: p.address_complement,
                    neighborhood: p.address_neighborhood,
                    city: p.address_city,
                    state: p.address_state,
                    zip: p.address_zip
                }
            }));

            setPatients(transformed);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const createPatient = async (patientData: any) => {
        try {
            // 1. Create Auth User (password defaults to cpf or a secure random one)
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: patientData.email,
                password: patientData.password || patientData.cpf, // Usage of CPF as temp password
                options: {
                    data: {
                        name: patientData.name,
                        role: 'patient'
                    }
                }
            });

            if (authError) throw authError;

            // 2. Profile is created via Trigger, but we update the extra fields
            if (authData.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .update({
                        cpf: patientData.cpf,
                        birth_date: patientData.birthDate,
                        phone: patientData.phone,
                        institution_id: patientData.institution_id,
                        address_street: patientData.address_street,
                        address_number: patientData.address_number,
                        address_complement: patientData.address_complement,
                        address_neighborhood: patientData.address_neighborhood,
                        address_city: patientData.address_city,
                        address_state: patientData.address_state,
                        address_zip: patientData.address_zip
                    })
                    .eq('id', authData.user.id);

                if (profileError) throw profileError;

                return authData.user;
            }
        } catch (e: any) {
            setError(e.message);
            throw e;
        }
    };

    const uploadDocument = async (patientId: string, instId: string, type: string, file: File) => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${patientId}/${type}_${Math.random()}.${fileExt}`;
            const filePath = `documents/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('patient-assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('patient-assets')
                .getPublicUrl(filePath);

            const { error: dbError } = await supabase
                .from('patient_documents')
                .insert([{
                    patient_id: patientId,
                    institution_id: instId,
                    type,
                    file_url: publicUrl,
                    file_name: file.name
                }]);

            if (dbError) throw dbError;
        } catch (e: any) {
            setError(e.message);
            throw e;
        }
    };

    useEffect(() => {
        if (id) fetchPatients();
    }, [role, id]);

    return { patients, loading, error, createPatient, uploadDocument, refresh: fetchPatients };
};
