import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Page, User, CartItem } from '../../types';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardPage from '../../pages/patient/Dashboard';
import PharmacyPage from '../../pages/patient/Pharmacy';
import CartPage from '../../pages/patient/Cart';
import CheckoutPage from '../../pages/patient/Checkout';
import SuccessPage from '../../pages/patient/Success';
import OrdersPage from '../../pages/patient/Orders';
import AppointmentsPage from '../../pages/patient/Appointments';
import ProfessionalsPage from '../../pages/patient/Professionals';
import AddressesPage from '../../pages/patient/Addresses';
import PatientReportsPage from '../../pages/patient/Reports';
import DocumentsPage from '../../pages/patient/Documents';
import ProductDetailsPage from '../../pages/patient/ProductDetails';
import ProfilePage from '../../pages/patient/Profile';

interface PatientDashboardProps {
    user: User;
    onLogout: () => void;
    isDarkMode: boolean;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ user, onLogout, isDarkMode }) => {
    const [activePage, setActivePage] = useState<Page>('dashboard');
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isPharmacyExpanded, setIsPharmacyExpanded] = useState(false);
    const [isDocumentsExpanded, setIsDocumentsExpanded] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const addToCart = (product: any, qty: number = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.name === product.name);
            if (existing) {
                return prev.map(item => item.name === product.name ? { ...item, quantity: item.quantity + qty } : item);
            }
            const priceValue = typeof product.price === 'string'
                ? parseFloat(product.price.replace('R$', '').replace('.', '').replace(',', '.'))
                : product.price;
            return [...prev, {
                name: product.name,
                price: priceValue,
                priceString: typeof product.price === 'string' ? product.price : `R$ ${product.price.toFixed(2)}`,
                image: product.image,
                category: product.category,
                quantity: qty
            }];
        });
        showToast(`${product.name} adicionado ao carrinho!`);
    };

    const updateCartQuantity = (name: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.name === name) {
                const newQty = Math.max(0, item.quantity + delta);
                if (newQty === 0) showToast(`${name} removido do carrinho.`, 'error');
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const clearCart = () => {
        setCart([]);
        showToast('Carrinho limpo.');
    };

    const sidebarItems = [
        { id: 'dashboard', icon: 'grid_view', label: 'Dashboard' },
        { id: 'reports', icon: 'edit_note', label: 'Relatos do Paciente' },
        {
            id: 'pharmacy_hub',
            icon: 'shopping_basket',
            label: 'Farmácia Medicinal',
            hasSubmenu: true,
            isExpanded: isPharmacyExpanded,
            activeIds: ['pharmacy', 'cart', 'orders', 'addresses', 'product_details'],
            onClickSub: () => setIsPharmacyExpanded(!isPharmacyExpanded),
            submenu: [
                { id: 'pharmacy', label: 'Medicamentos' },
                { id: 'cart', label: 'Meu Carrinho' },
                { id: 'orders', label: 'Meus Pedidos' },
                { id: 'addresses', label: 'Meus Endereços' },
            ]
        },
        { id: 'appointments', icon: 'calendar_month', label: 'Consultas' },
        {
            id: 'documents_hub',
            icon: 'folder_shared',
            label: 'Documentação',
            hasSubmenu: true,
            isExpanded: isDocumentsExpanded,
            activeIds: ['documents', 'anvisa'],
            onClickSub: () => setIsDocumentsExpanded(!isDocumentsExpanded),
            submenu: [
                { id: 'documents', label: 'Meus Arquivos' },
                { id: 'anvisa', label: 'Autorização Anvisa' },
            ]
        },
        { id: 'professionals', icon: 'medication', label: 'Profissionais' },
    ];

    const infoCards = [
        { icon: 'verified', label: 'Associação Curativa', title: user.name, subtitle: 'Membro Ativo' },
        { icon: 'description', label: 'Receituário', title: 'Válido até 15/12', subtitle: '2 Itens restantes', variant: 'warning' as const, actionLabel: 'Ver PDF' },
        { icon: 'local_shipping', label: 'Próximo Pedido', title: 'Chega em 3 dias', subtitle: 'Rastrear Entrega', actionLabel: 'Ver Detalhes' },
    ];

    const getTitle = () => {
        switch (activePage) {
            case 'dashboard': return 'Dashboard';
            case 'pharmacy':
            case 'product_details': return 'Farmácia Medicinal';
            case 'cart': return 'Meu Carrinho';
            case 'checkout': return 'Checkout';
            case 'payment_success': return 'Pedido Confirmado';
            case 'orders': return 'Meus Pedidos';
            case 'appointments': return 'Consultas';
            case 'addresses': return 'Meus Endereços';
            case 'reports': return 'Relatos do Paciente';
            case 'documents': return 'Documentação';
            case 'anvisa': return 'Autorização ANVISA';
            case 'profile': return 'Meu Perfil';
            default: return 'Profissionais';
        }
    };

    return (
        <>
            <DashboardLayout
                user={user}
                activePage={activePage}
                onPageChange={(p) => setActivePage(p as Page)}
                onLogout={onLogout}
                sidebarItems={sidebarItems}
                infoCards={infoCards}
                title={getTitle()}
                statusLabel="Status Financeiro"
                statusDetail="Regular"
                onTitleClick={() => setActivePage('dashboard')}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activePage}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activePage === 'dashboard' && <DashboardPage setActivePage={setActivePage} />}
                        {activePage === 'pharmacy' && (
                            <PharmacyPage
                                onProductSelect={(product) => {
                                    setSelectedProduct(product);
                                    setActivePage('product_details');
                                }}
                                onAddToCart={(product) => addToCart(product, 1)}
                                onCartClick={() => setActivePage('cart')}
                                cart={cart}
                                cartSubtotal={cartSubtotal}
                            />
                        )}
                        {activePage === 'cart' && (
                            <CartPage
                                items={cart}
                                onUpdateQuantity={updateCartQuantity}
                                onCheckout={() => setActivePage('checkout')}
                                onBack={() => setActivePage('pharmacy')}
                            />
                        )}
                        {activePage === 'checkout' && (
                            <CheckoutPage
                                total={cartSubtotal}
                                onComplete={() => {
                                    clearCart();
                                    setActivePage('payment_success');
                                }}
                                onBack={() => setActivePage('cart')}
                            />
                        )}
                        {activePage === 'payment_success' && (
                            <SuccessPage onHome={() => setActivePage('dashboard')} />
                        )}
                        {activePage === 'orders' && <OrdersPage />}
                        {activePage === 'appointments' && <AppointmentsPage />}
                        {activePage === 'professionals' && <ProfessionalsPage />}
                        {activePage === 'addresses' && <AddressesPage />}
                        {activePage === 'reports' && <PatientReportsPage />}
                        {activePage === 'documents' && <DocumentsPage activeSubPage="documents" />}
                        {activePage === 'anvisa' && <DocumentsPage activeSubPage="anvisa" />}
                        {activePage === 'profile' && <ProfilePage isDarkMode={isDarkMode} />}
                        {activePage === 'product_details' && selectedProduct && (
                            <ProductDetailsPage
                                product={selectedProduct}
                                onBack={() => setActivePage('pharmacy')}
                                onAddToCart={(product, qty) => addToCart(product, qty)}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </DashboardLayout>

            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className={`fixed bottom-24 lg:bottom-8 right-8 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${toast.type === 'success'
                                ? 'bg-[#0e1b12] dark:bg-primary border-primary/20 text-white dark:text-[#0e1b12]'
                                : 'bg-red-600 border-red-500/20 text-white'
                            }`}
                    >
                        <span className="material-symbols-outlined">
                            {toast.type === 'success' ? 'check_circle' : 'error'}
                        </span>
                        <span className="font-bold text-sm">{toast.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default PatientDashboard;
