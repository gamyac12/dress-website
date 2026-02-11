import React from 'react';
import { Heart, ChevronRight } from 'lucide-react';

export default function Home({ DRESSES, openQuickView, toggleWishlist, wishlist }) {
    return (
        <>
            <header className="relative h-[65vh] overflow-hidden bg-neutral-900">
                <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
                    alt=""
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                    <h2 className="text-[10px] uppercase tracking-[0.6em] mb-6 font-bold opacity-70">
                        Hand-Picked Collections
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-serif mb-10 leading-tight">
                        Masterpieces in <br /><span className="italic font-light">Long Frocks</span>
                    </h1>
                    <button
                        onClick={() => document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })}
                        className="bg-white text-neutral-900 px-12 py-5 font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-neutral-100 transition-all flex items-center gap-3"
                    >
                        Shop the Edit <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </header>
            <main id="catalog" className="max-w-7xl mx-auto px-4 py-24 fade-in">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
                    <h3 className="text-4xl font-serif italic">Our Signature Gowns</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {DRESSES.map(dress => (
                        <div key={dress.id} className="group flex flex-col bg-white">
                            <div
                                className="relative aspect-[3/4] overflow-hidden bg-neutral-100 cursor-pointer"
                                onClick={() => openQuickView(dress.id)}
                            >
                                <img
                                    src={dress.image}
                                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                                    alt={dress.name}
                                />
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleWishlist(dress.id); }}
                                    className="absolute top-4 right-4 p-2.5 bg-white/90 rounded-full"
                                >
                                    <Heart
                                        className={`w-4 h-4 ${wishlist.find(i => i.id === dress.id) ? 'fill-red-500 text-red-500' : 'text-neutral-400'}`}
                                    />
                                </button>
                                <div className="absolute bottom-4 left-4 right-4 bg-white/95 py-4 text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all text-center">
                                    Quick View
                                </div>
                            </div>
                            <div className="pt-6 text-center">
                                <p className="text-[9px] uppercase tracking-widest text-neutral-400 mb-2 font-bold">
                                    {dress.category}
                                </p>
                                <h4 className="font-serif text-lg mb-1">{dress.name}</h4>
                                <p className="font-bold text-amber-900 tracking-wide">
                                    ₹{dress.price.toLocaleString('en-IN')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
