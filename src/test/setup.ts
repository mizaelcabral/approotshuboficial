import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Supabase environment variables
vi.stubEnv('VITE_SUPABASE_URL', 'https://mock.supabase.co');
vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'mock-key');

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});
