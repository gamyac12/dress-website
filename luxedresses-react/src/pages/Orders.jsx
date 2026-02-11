import React from 'react';
import { Package, ShieldCheck } from 'lucide-react';

export default function Orders({ orders, setCurrentView }) {
    if (orders.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-32 text-center fade-in">
                <Package className="w-16 h-16 mx-auto text-neutral-100 mb-8" />
                <h4 className="text-xl font-serif mb-2">No Past Orders</h4>
                <p className="text-neutral-400 mb-10 font-light">Your wardrobe is waiting for its first luxury addition.</p>
                <button
                    onClick={() => setCurrentView('home')}
                    className="bg-neutral-900 text-white px-12 py-4 font-bold uppercase tracking-widest text-[10px]"
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-24 fade-in">
            <h2 className="text-4xl font-serif mb-16">Order History</h2>
            <div className="space-y-10">
                {orders.map((order, idx) => (
                    <div key={idx} className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm">
                        <div className="bg-neutral-50 px-8 py-6 flex justify-between items-center border-b border-neutral-100">
                            <div className="flex gap-12">
                                <div>
                                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Order ID</p>
                                    <p className="text-sm font-bold font-mono">#{order.id}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Date</p>
                                    <p className="text-sm font-bold">{order.date}</p>
                                </div>
                            </div>
                            <span className="px-4 py-1.5 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                {order.status}
                            </span>
                        </div>
                        <div className="p-8">
                            <div className="space-y-6">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex gap-6 items-center">
                                        <img src={item.image} className="w-12 h-16 object-cover rounded shadow-sm" alt={item.name} />
                                        <div className="flex-1">
                                            <h5 className="text-sm font-bold">{item.name}</h5>
                                            <p className="text-[9px] font-bold uppercase text-neutral-400 mt-1">
                                                Size: {item.size} | Qty: {item.qty}
                                            </p>
                                        </div>
                                        <p className="font-bold text-sm">₹{(item.price * item.qty).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 pt-8 border-t border-neutral-50 flex justify-between items-end">
                                <div className="flex items-center gap-2 text-neutral-400 text-xs tracking-widest font-bold uppercase">
                                    <ShieldCheck className="w-4 h-4 text-amber-800" /> Bespoke Handling
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-bold uppercase text-neutral-400 mb-1 tracking-widest">Grand Total</p>
                                    <p className="text-2xl font-serif text-amber-900 font-bold">₹{order.total.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
