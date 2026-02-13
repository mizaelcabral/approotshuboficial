import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    size?: 'medium' | 'large' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, subtitle, children, size = 'medium' }) => {
    const maxWidthClass = {
        medium: 'max-w-xl',
        large: 'max-w-3xl',
        xl: 'max-w-5xl'
    }[size];
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 bg-background-dark/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className={`bg-white dark:bg-[#112116] rounded-3xl p-8 ${maxWidthClass} w-full border border-gray-200 dark:border-white/10 shadow-2xl relative overflow-hidden`}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />

                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div>
                                <h3 className="text-2xl font-black">{title}</h3>
                                {subtitle && <p className="text-sm text-text-subtle font-bold">{subtitle}</p>}
                            </div>
                            <button onClick={onClose} className="size-10 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all flex items-center justify-center border border-transparent hover:border-red-500/20">
                                <span className="material-symbols-outlined font-black">close</span>
                            </button>
                        </div>

                        <div className="relative z-10">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
