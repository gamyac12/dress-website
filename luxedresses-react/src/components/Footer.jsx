import React from 'react';

export default function Footer({ setCurrentView }) {
    return (
        <footer className="bg-white border-t border-neutral-100 py-32 mt-40">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-4xl font-serif font-bold tracking-tighter mb-6">
                    LUXE<span className="font-light italic text-amber-900">DRESSES</span>
                </h1>
                <p className="text-neutral-400 text-[11px] uppercase tracking-[0.6em] mb-16 italic font-bold">
                    The Pinnacle of Elegance
                </p>
                <div className="flex flex-wrap justify-center gap-16 text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">
                    <span>Our Studio</span>
                    <span onClick={() => setCurrentView('orders')} className="cursor-pointer">
                        Trace Order
                    </span>
                    <span>Private Concierge</span>
                </div>
                <p className="mt-32 text-[9px] text-neutral-300 font-bold tracking-[0.4em] uppercase">
                    © 2024 LUXEDRESSES PRIVATE ATELIER.
                </p>
            </div>
        </footer>
    );
}
