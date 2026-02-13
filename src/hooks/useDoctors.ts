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

                // Simulation for demo
                if (institutionId && institutionId.startsWith('demo-')) {
                    await new Promise(resolve => setTimeout(resolve, 800));
                    setDoctors([
                        {
                            id: 'demo-doc-1',
                            name: 'Dr. Mizael Cabral',
                            email: 'mizael@demo.com',
                            specialization: 'Clínico Geral',
                            patients: 45,
                            institutionIds: [institutionId],
                            rating: 4.9,
                            availability: []
                        },
                        {
                            id: 'demo-doc-2',
                            name: 'Dra. Ana Silva',
                            email: 'ana@demo.com',
                            specialization: 'Neurologista',
                            patients: 32,
                            institutionIds: [institutionId],
                            rating: 4.8,
                            availability: []
                        }
                    ]);
                    return;
                }

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
                    patients: 0,
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
