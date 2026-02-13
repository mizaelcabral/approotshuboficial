import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Doctor } from '../types';

export const useDoctors = (institutionId?: string) => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoading(true);
                let query = supabase
                    .from('profiles')
                    .select('*')
                    .eq('role', 'doctor');

                if (institutionId) {
                    query = query.eq('institution_id', institutionId);
                }

                const { data, error: err } = await query;

                if (err) throw err;

                const transformed: Doctor[] = (data || []).map(d => ({
                    id: d.id,
                    name: d.name || 'Sem nome',
                    email: d.email || '',
                    specialization: d.specialization || 'Geral',
                    patients: 0, // Should be fetched from patient count
                    institutionIds: [d.institution_id || ''],
                    avatar: d.avatar_url,
                    rating: 5.0,
                    availability: []
                }));

                setDoctors(transformed);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, [institutionId]);

    return { doctors, loading, error };
};
