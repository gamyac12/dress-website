import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ isOpen, toggleCart, cart, removeFromCart, changeQty, goToCheckout }) {
    const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

    return (
        <>
            <div
                className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleCart}
            ></div>
            <div
                className={`fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[101] shadow-2xl transition-transform duration-500 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-8 border-b border-neutral-100 flex items-center justify-between">
                    <h3 className="font-bold uppercase tracking-[0.3em] text-xs">Your Bag</h3>
                    <button onClick={toggleCart}><X className="w-6 h-6" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                    {cart.length === 0 ? (
                        <div className="text-center py-32 opacity-20">
                            <ShoppingBag className="w-16 h-16 mx-auto mb-6" />
                            <p className="italic tracking-widest uppercase">The bag is empty.</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={`${item.id}-${item.size}`} className="flex gap-6 pb-8 border-b border-neutral-50 fade-in">
                                <img src={item.image} className="w-24 h-32 object-cover rounded-lg shadow-md" alt={item.name} />
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-serif text-md font-bold text-neutral-800">{item.name}</h4>
                                            <button onClick={() => removeFromCart(item.id, item.size)} className="text-neutral-300 hover:text-red-500">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="inline-block mt-3 text-[9px] font-bold uppercase tracking-widest bg-neutral-100 px-2 py-1 rounded">
                                            Size: {item.size}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center border border-neutral-200 rounded">
                                            <button onClick={() => changeQty(item.id, item.size, -1)} className="px-3 py-1.5 hover:bg-neutral-50">
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="px-4 text-xs font-bold">{item.qty}</span>
                                            <button onClick={() => changeQty(item.id, item.size, 1)} className="px-3 py-1.5 hover:bg-neutral-50">
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <p className="font-bold text-amber-900 font-serif">₹{(item.price * item.qty).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {cart.length > 0 && (
                    <div className="p-8 bg-neutral-50 border-t border-neutral-100">
                        <div className="flex justify-between mb-8">
                            <span className="font-bold uppercase text-[10px] tracking-[0.2em] text-neutral-400 italic">Total Value</span>
                            <span className="font-bold text-2xl font-serif text-amber-900">₹{total.toLocaleString()}</span>
                        </div>
                        <button
                            onClick={goToCheckout}
                            className="w-full bg-amber-800 text-white py-5 font-bold uppercase tracking-[0.3em] text-[11px] rounded-full shadow-xl"
                        >
                            Secure Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
