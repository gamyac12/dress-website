import React from 'react';
import { User, Heart, ShoppingBag } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, toggleLoginModal, toggleCart, wishlistCount, cartCount, user, onLogout }) {
    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-100">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <h1
                        onClick={() => setCurrentView('home')}
                        className="text-2xl font-serif font-bold tracking-tighter cursor-pointer hover:text-amber-800 transition-colors"
                    >
                        LUXE<span className="font-light italic text-amber-900">DRESSES</span>
                    </h1>
                    <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                        <span
                            onClick={() => setCurrentView('home')}
                            className={`nav-link hover:text-black cursor-pointer transition-colors border-b-2 border-transparent py-1 ${currentView === 'home' ? 'border-amber-800 text-black' : ''}`}
                        >
                            Collection
                        </span>
                        <span
                            onClick={() => setCurrentView('orders')}
                            className={`nav-link hover:text-black cursor-pointer transition-colors border-b-2 border-transparent py-1 ${currentView === 'orders' ? 'border-amber-800 text-black' : ''}`}
                        >
                            My Orders
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-6 lg:gap-8">
                    {user ? (
                        <button onClick={onLogout} className="flex flex-col items-center group">
                            <User className="w-5 h-5 group-hover:text-amber-800" />
                            <span id="user-label" className="text-[9px] font-bold uppercase mt-1">{user.username}</span>
                        </button>
                    ) : (
                        <button onClick={toggleLoginModal} className="flex flex-col items-center group">
                            <User className="w-5 h-5 group-hover:text-amber-800" />
                            <span id="user-label" className="text-[9px] font-bold uppercase mt-1">Login</span>
                        </button>
                    )}
                    <button onClick={() => setCurrentView('wishlist')} className="flex flex-col items-center group relative">
                        <Heart className="w-5 h-5 group-hover:text-amber-800" />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        )}
                        <span className="text-[9px] font-bold uppercase mt-1">Wishlist</span>
                    </button>
                    <button onClick={toggleCart} className="flex flex-col items-center group relative">
                        <ShoppingBag className="w-5 h-5 group-hover:text-amber-800" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-amber-800 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                        <span className="text-[9px] font-bold uppercase mt-1">Bag</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
