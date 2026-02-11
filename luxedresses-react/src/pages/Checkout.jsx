import React from 'react';
import { CheckCircle, ShieldCheck, Lock } from 'lucide-react';

export default function Checkout({ cart, paymentStep, setPaymentStep, handlePayment, setCurrentView, setOrders }) {
    const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

    if (paymentStep === 2) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-24 text-center fade-in">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10 border border-green-100">
                    <CheckCircle className="w-14 h-14 text-green-600" />
                </div>
                <h2 className="text-4xl font-serif mb-6 italic">A Luxury Choice.</h2>
                <p className="text-neutral-500 mb-14 max-w-sm mx-auto font-light text-lg leading-relaxed">
                    Your order is being meticulously prepared. You will receive bespoke tracking shortly.
                </p>
                <div className="flex flex-col gap-6 max-w-xs mx-auto">
                    <button
                        onClick={() => setCurrentView('orders')}
                        className="w-full bg-neutral-900 text-white py-5 font-bold uppercase tracking-[0.25em] text-[11px] rounded-full"
                    >
                        View Order Details
                    </button>
                    <button
                        onClick={() => { setPaymentStep(0); setCurrentView('home'); }}
                        className="w-full text-neutral-400 font-bold uppercase tracking-widest text-[10px] hover:text-amber-800 underline underline-offset-8"
                    >
                        Return to Studio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-24 fade-in">
            <div className="flex items-center justify-center gap-10 mb-20">
                <div className={`flex items-center gap-3 ${paymentStep === 0 ? 'text-amber-800' : 'text-neutral-400'}`}>
                    <span className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold ${paymentStep === 0 ? 'bg-amber-800 border-amber-800 text-white' : 'border-neutral-200'}`}>
                        1
                    </span>
                    <span className="text-[11px] uppercase font-bold tracking-[0.3em]">Address</span>
                </div>
                <div className="w-12 h-[2px] bg-neutral-200"></div>
                <div className={`flex items-center gap-3 ${paymentStep === 1 ? 'text-amber-800' : 'text-neutral-400'}`}>
                    <span className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold ${paymentStep === 1 ? 'bg-amber-800 border-amber-800 text-white' : 'border-neutral-200'}`}>
                        2
                    </span>
                    <span className="text-[11px] uppercase font-bold tracking-[0.3em]">Pay</span>
                </div>
            </div>

            {paymentStep === 0 ? (
                <div className="bg-white p-14 border border-neutral-100 rounded-3xl shadow-sm">
                    <h3 className="text-3xl font-serif mb-12 italic">Where should we deliver?</h3>
                    <div className="space-y-6">
                        <input placeholder="Full Name" className="w-full p-4.5 border border-neutral-200 rounded-xl text-sm outline-none bg-neutral-50" />
                        <div className="grid grid-cols-2 gap-6">
                            <input placeholder="Phone" className="p-4.5 border border-neutral-200 rounded-xl text-sm outline-none bg-neutral-50" />
                            <input placeholder="Pin Code" className="p-4.5 border border-neutral-200 rounded-xl text-sm outline-none bg-neutral-50" />
                        </div>
                        <textarea placeholder="Street Address" className="w-full p-4.5 border border-neutral-200 rounded-xl text-sm h-32 outline-none bg-neutral-50"></textarea>
                    </div>
                    <button
                        onClick={() => setPaymentStep(1)}
                        className="w-full mt-12 bg-amber-800 text-white py-6 font-bold uppercase tracking-[0.3em] text-[12px] rounded-full"
                    >
                        Continue to Payment
                    </button>
                </div>
            ) : (
                <div className="bg-white p-14 border border-neutral-100 rounded-3xl shadow-sm">
                    <div className="flex justify-between items-center mb-12 pb-6 border-b border-neutral-100">
                        <h3 className="text-3xl font-serif italic">Secure Payment</h3>
                        <ShieldCheck className="text-green-600 w-6 h-6" />
                    </div>
                    <div className="p-8 bg-neutral-900 text-white rounded-2xl mb-12">
                        <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-2">Payable Amount</p>
                        <p className="text-3xl font-serif text-amber-400 font-bold">₹{total.toLocaleString()}</p>
                    </div>
                    <div className="space-y-6">
                        <input placeholder="Card Number" className="w-full p-4.5 border border-neutral-200 rounded-xl text-sm bg-neutral-50" />
                        <div className="grid grid-cols-2 gap-6">
                            <input placeholder="MM/YY" className="p-4.5 border border-neutral-200 rounded-xl text-sm bg-neutral-50" />
                            <input placeholder="CVV" type="password" className="p-4.5 border border-neutral-200 rounded-xl text-sm bg-neutral-50" />
                        </div>
                    </div>
                    <button
                        onClick={handlePayment}
                        className="w-full mt-12 bg-amber-800 text-white py-6 font-bold uppercase tracking-[0.3em] text-[12px] rounded-full flex justify-center gap-3"
                    >
                        <Lock className="w-4 h-4" /> Securely Pay ₹{total.toLocaleString()}
                    </button>
                </div>
            )}
        </div>
    );
}
