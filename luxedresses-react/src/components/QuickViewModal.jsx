import React, { useEffect, useState } from 'react';

export default function QuickViewModal({ product, isOpen, onClose, addToBag }) {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setShowContent(true), 10);
        } else {
            setShowContent(false);
        }
    }, [isOpen]);

    if (!product || !isOpen) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
            <div
                className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
                onClick={onClose}
            ></div>
            <div
                className={`relative bg-white w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row transition-all duration-300 ${showContent ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            >
                <div className="w-full md:w-1/2 aspect-[3/4] md:aspect-auto overflow-hidden">
                    <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                </div>
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-between">
                    <div>
                        <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-amber-800 mb-4">{product.category}</p>
                        <h3 className="text-4xl font-serif mb-6 leading-tight">{product.name}</h3>
                        <p className="text-2xl font-bold text-neutral-900 mb-8 italic font-serif">₹{product.price.toLocaleString()}</p>
                        <p className="text-neutral-500 leading-relaxed text-sm mb-12 italic border-l-4 border-amber-100 pl-6">{product.description}</p>

                        <div className="mb-12">
                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] mb-4 text-neutral-400">Select Bespoke Size</p>
                            <div className="flex flex-wrap gap-4">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => addToBag(product.id, size)}
                                        className="w-14 h-14 border border-neutral-200 flex items-center justify-center text-xs font-bold hover:border-amber-800 hover:text-amber-800 transition-all rounded-lg"
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className="text-[10px] uppercase text-neutral-300 font-bold tracking-widest italic">Free Worldwide Express Shipping & Returns</p>
                </div>
            </div>
        </div>
    );
}
