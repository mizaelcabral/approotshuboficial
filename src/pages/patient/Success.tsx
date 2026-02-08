import React from 'react';

interface SuccessPageProps {
    onHome: () => void;
}

const SuccessPage = ({ onHome }: SuccessPageProps) => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 text-primary">
            <span className="material-symbols-outlined text-5xl">check_circle</span>
        </div>
        <h2 className="text-3xl font-black mb-2">Pedido Confirmado!</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
            Seu pedido foi recebido e já está sendo processado. Você receberá atualizações por e-mail e pode acompanhar o status em "Meus Pedidos".
        </p>
        <button
            onClick={onHome}
            className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
        >
            Voltar para o Início
        </button>
    </div>
);

export default SuccessPage;
