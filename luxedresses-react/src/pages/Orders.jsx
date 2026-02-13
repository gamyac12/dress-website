import React from 'react';
import { Package, ShieldCheck, AlertCircle, XCircle } from 'lucide-react';
import api from '../services/api';

export default function Orders({ orders, setCurrentView }) {

    const handleCancel = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order? This action cannot be undone.")) return;

        try {
            const token = localStorage.getItem('token');
            await api.cancelOrder(orderId, token);
            alert("Order cancelled successfully.");
            // Refresh orders - simpler to reload or we could update state parent if passed down
            // For now, let's force a reload for simplicity or ask user to refresh
            window.location.reload();
        } catch (err) {
            alert("Failed to cancel order: " + err.message);
        }
    };

    const isCancellable = (order) => {
        if (order.status === 'Cancelled' || order.status === 'Shipped' || order.status === 'Delivered') return false;
        const created = new Date(order.created_at);
        const now = new Date();
        const diffHours = (now - created) / 1000 / 60 / 60;
        return diffHours < 24;
    };

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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                <div>
                    <h2 className="text-4xl font-serif mb-2">Order History</h2>
                    <p className="text-neutral-500 font-light">Track your bespoke selections.</p>
                </div>
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex items-start gap-3 max-w-md">
                    <AlertCircle className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-amber-900 mb-1">Policy Notice</p>
                        <p className="text-xs text-amber-900/80 leading-relaxed">
                            Cancellations are accepted within 24 hours of ordering.
                            <br />
                            <span className="font-bold">No Returns and No Exchanges</span> are permitted to maintain our hygiene and exclusivity standards.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-10">
                {orders.map((order, idx) => (
                    <div key={idx} className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm">
                        <div className="bg-neutral-50 px-8 py-6 flex justify-between items-center border-b border-neutral-100 flex-wrap gap-4">
                            <div className="flex gap-12">
                                <div>
                                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Order ID</p>
                                    <p className="text-sm font-bold font-mono">#{order.id}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Date</p>
                                    <p className="text-sm font-bold">{new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full ${order.status === 'Cancelled' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                                    }`}>
                                    {order.status}
                                </span>
                                {isCancellable(order) && (
                                    <button
                                        onClick={() => handleCancel(order.id)}
                                        className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 flex items-center gap-1 border border-red-100 px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors"
                                    >
                                        <XCircle className="w-3 h-3" /> Cancel Order
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="space-y-6">
                                {(order.items || []).map((item, i) => (
                                    <div key={i} className="flex gap-6 items-center">
                                        <img src={item.product_image || 'placeholder.jpg'} className="w-12 h-16 object-cover rounded shadow-sm" alt={item.product_name} />
                                        <div className="flex-1">
                                            <h5 className="text-sm font-bold">{item.product_name}</h5>
                                            <p className="text-[9px] font-bold uppercase text-neutral-400 mt-1">
                                                Size: {item.size} | Qty: {item.quantity}
                                            </p>
                                        </div>
                                        <p className="font-bold text-sm">₹{(parseFloat(item.price || 0) * (item.quantity || 1)).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 pt-8 border-t border-neutral-50 flex justify-between items-end">
                                <div className="flex items-center gap-2 text-neutral-400 text-xs tracking-widest font-bold uppercase">
                                    <ShieldCheck className="w-4 h-4 text-amber-800" /> Bespoke Handling
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-bold uppercase text-neutral-400 mb-1 tracking-widest">Grand Total</p>
                                    <p className="text-2xl font-serif text-amber-900 font-bold">₹{parseFloat(order.total_price || 0).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
