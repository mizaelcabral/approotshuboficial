import { supabase } from './supabase';
import { User, UserRole } from '../types';

export const getProfile = async (userId: string): Promise<User | null> => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error || !data) return null;
    return data as User;
};

export const getInstitutionBySlug = async (slug: string): Promise<User | null> => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('slug', slug)
        .eq('role', 'institution')
        .single();

    if (error || !data) return null;
    return data as User;
};

export const logout = async () => {
    await supabase.auth.signOut();
};
