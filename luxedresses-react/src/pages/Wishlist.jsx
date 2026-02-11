import React from 'react';
import { Heart } from 'lucide-react';

export default function Wishlist({ wishlist, setCurrentView, openQuickView }) {
    if (wishlist.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-32 text-center fade-in">
                <Heart className="w-16 h-16 mx-auto text-neutral-100 mb-8" />
                <p className="text-neutral-400 italic text-lg mb-10">Your luxury wishlist is currently empty.</p>
                <button
                    onClick={() => setCurrentView('home')}
                    className="bg-neutral-900 text-white px-12 py-4 font-bold uppercase tracking-widest text-[11px]"
                >
                    Discover Collection
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-24 fade-in">
            <h2 className="text-4xl font-serif mb-16 text-center italic">My Private Curation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-12">
                {wishlist.map(item => (
                    <div key={item.id} className="bg-white p-3 border border-neutral-100 shadow-sm">
                        <img src={item.image} className="w-full aspect-[3/4] object-cover mb-4" alt={item.name} />
                        <h5 className="font-serif text-center text-md mb-2">{item.name}</h5>
                        <button
                            onClick={() => openQuickView(item.id)}
                            className="w-full bg-neutral-900 text-white py-3.5 text-[10px] font-bold uppercase tracking-widest"
                        >
                            Select Size
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
