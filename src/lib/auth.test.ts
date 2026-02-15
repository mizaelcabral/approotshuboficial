import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getProfile, getInstitutionBySlug } from './auth';
import { supabase } from './supabase';

vi.mock('./supabase', () => ({
    supabase: {
        from: vi.fn(() => ({
            select: vi.fn(() => ({
                eq: vi.fn(() => ({
                    eq: vi.fn(() => ({
                        single: vi.fn()
                    })),
                    single: vi.fn()
                }))
            }))
        })),
        auth: {
            signOut: vi.fn()
        }
    }
}));

describe('Auth Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getProfile', () => {
        it('should return profile for a valid user ID', async () => {
            const mockProfile = { id: '123', name: 'Test User', role: 'patient' };

            const singleMock = vi.fn().mockResolvedValue({ data: mockProfile, error: null });
            (supabase.from as any).mockReturnValue({
                select: () => ({ eq: () => ({ single: singleMock }) })
            });

            const profile = await getProfile('123');
            expect(profile).toEqual(mockProfile);
        });

        it('should return null if there is an error', async () => {
            const singleMock = vi.fn().mockResolvedValue({ data: null, error: { message: 'Error' } });
            (supabase.from as any).mockReturnValue({
                select: () => ({ eq: () => ({ single: singleMock }) })
            });

            const profile = await getProfile('invalid');
            expect(profile).toBeNull();
        });
    });

    describe('getInstitutionBySlug', () => {
        it('should return institution profile for a valid slug', async () => {
            const mockInst = { id: 'inst_1', name: 'Clinic A', role: 'institution', slug: 'clinic-a' };

            const singleMock = vi.fn().mockResolvedValue({ data: mockInst, error: null });
            (supabase.from as any).mockReturnValue({
                select: () => ({
                    eq: () => ({
                        eq: () => ({ single: singleMock })
                    })
                })
            });

            const institution = await getInstitutionBySlug('clinic-a');
            expect(institution).toEqual(mockInst);
        });
    });
});
