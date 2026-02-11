import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PaymentOverlay({ show }) {
    if (!show) return null;

    return (
        <div id="payment-overlay" className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-8">
                <h1 className="text-xl font-serif font-bold tracking-tighter mb-2 italic text-amber-900">LUXEDRESSES</h1>
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Secure Gateway</p>
            </div>
            <div className="relative mb-8">
                <div className="w-16 h-16 border-4 border-amber-800 border-t-transparent rounded-full animate-spin"></div>
                <ShieldCheck className="w-6 h-6 text-amber-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h2 className="text-xl font-medium mb-2 font-serif">Verifying Transaction...</h2>
            <p className="text-neutral-500 text-sm max-w-xs leading-relaxed">Securing your luxury selection with your bank. Do not refresh.</p>
        </div>
    );
}
