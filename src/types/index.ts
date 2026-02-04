// User Roles
export type UserRole = 'super_admin' | 'doctor' | 'institution' | 'patient';

// User Interface
export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    institutionId?: string;
    specialization?: string; // For doctors
}

// Authentication
export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
}

// Institution
export interface Institution {
    id: string;
    name: string;
    location: string;
    city: string;
    state: string;
    patients: number;
    revenue: number;
    status: 'active' | 'pending' | 'inactive';
    icon: string;
}

// Patient
export interface Patient {
    id: string;
    name: string;
    email: string;
    phone: string;
    institutionId: string;
    institutionName: string;
    doctorId?: string;
    doctorName?: string;
    status: 'active' | 'inactive' | 'pending';
    treatmentProgress: number;
    financialStatus: 'regular' | 'pending' | 'overdue';
    registrationDate: string;
    avatar?: string;
}

// Doctor
export interface Doctor {
    id: string;
    name: string;
    email: string;
    specialization: string;
    patients: number;
    institutionIds: string[];
    avatar?: string;
    rating?: number;
    availability: string[];
}

// Representative
export interface Representative {
    id: string;
    name: string;
    email: string;
    phone: string;
    region: string;
    patients: number;
    revenue: number;
    commission: number;
    performance: number;
    avatar?: string;
    status: 'active' | 'inactive';
}

// Appointment
export interface Appointment {
    id: string;
    patientId: string;
    patientName: string;
    doctorId: string;
    doctorName: string;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    type: 'consultation' | 'follow-up' | 'emergency';
    notes?: string;
}

// Treatment Report
export interface TreatmentReport {
    id: string;
    patientId: string;
    patientName: string;
    doctorId: string;
    date: string;
    symptoms: string[];
    medicationEffectiveness: number; // 1-5
    sideEffects: string;
    mood: number; // 1-5
    sleepQuality: number; // 1-5
    painLevel: number; // 1-10
    notes: string;
    photos?: string[];
    status: 'new' | 'reviewed' | 'follow-up-required';
    doctorFeedback?: string;
    doctorNotes?: string;
}

// Commission
export interface Commission {
    id: string;
    representativeId: string;
    representativeName: string;
    type: 'patient_referral' | 'institution_referral' | 'sales';
    amount: number;
    status: 'pending' | 'paid' | 'cancelled';
    date: string;
    description: string;
}

// Product (Pharmacy)
export interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    oldPrice: number;
    image: string;
    stock: number;
    badge?: string;
    visible: boolean;
    sales: number;
    views: number;
}

// Order
export interface Order {
    id: string;
    patientId: string;
    patientName: string;
    products: {
        productId: string;
        name: string;
        quantity: number;
        price: number;
    }[];
    total: number;
    status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
    date: string;
    shippingAddress: string;
    trackingCode?: string;
}

// Notification
export interface Notification {
    id: string;
    userId: string;
    type: 'appointment' | 'report' | 'order' | 'system';
    title: string;
    message: string;
    date: string;
    read: boolean;
    link?: string;
}

// Page Types
export type SuperAdminPage =
    | 'sa_dashboard'
    | 'sa_institutions'
    | 'sa_patients'
    | 'sa_representatives'
    | 'sa_commissions'
    | 'sa_financial'
    | 'sa_pharmacy'
    | 'sa_settings';

export type DoctorPage =
    | 'doc_dashboard'
    | 'doc_patients'
    | 'doc_appointments'
    | 'doc_reports'
    | 'doc_patient_detail'
    | 'doc_profile';

export type InstitutionPage =
    | 'inst_dashboard'
    | 'inst_patients'
    | 'inst_doctors'
    | 'inst_register_patient'
    | 'inst_reports'
    | 'inst_profile';

export type PatientPage =
    | 'dashboard'
    | 'orders'
    | 'appointments'
    | 'professionals'
    | 'pharmacy'
    | 'product_details'
    | 'cart'
    | 'checkout'
    | 'payment_success'
    | 'addresses'
    | 'reports'
    | 'documents'
    | 'anvisa'
    | 'profile'
    | 'book_appointment'
    | 'treatment_report';

export type Page = SuperAdminPage | DoctorPage | InstitutionPage | PatientPage | 'login';
