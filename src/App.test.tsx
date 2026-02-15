import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import * as auth from './lib/auth';

// Mock lib/auth
vi.mock('./lib/auth', () => ({
    getProfile: vi.fn(),
    getInstitutionBySlug: vi.fn(),
    logout: vi.fn(),
}));

// Mock supabase
vi.mock('./lib/supabase', () => ({
    supabase: {
        auth: {
            getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
            onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
        },
    },
}));

describe('App Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders login page by default when not authenticated', async () => {
        vi.spyOn(auth, 'getInstitutionBySlug').mockResolvedValue(null);

        render(<App />);

        // Check for login page elements
        expect(await screen.findByText(/Bem-vindo de volta/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/exemplo@email.com/i)).toBeInTheDocument();
    });

    it('renders institution landing page when on a valid slug path', async () => {
        const mockInst = { id: 'inst_123', name: 'Demo Clinic', role: 'institution', slug: 'demo-clinic' };
        vi.spyOn(auth, 'getInstitutionBySlug').mockResolvedValue(mockInst);

        // Fake window.location.pathname
        Object.defineProperty(window, 'location', {
            value: { pathname: '/demo-clinic' },
            writable: true
        });

        render(<App />);

        expect(await screen.findByText(/Bem-vindo à/i)).toBeInTheDocument();
        expect(screen.getByText(/Demo Clinic/i)).toBeInTheDocument();
    });
});
