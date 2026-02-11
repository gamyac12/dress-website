import React, { useState } from 'react';
import { X } from 'lucide-react';
import api from '../services/api';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isRegister) {
                const data = await api.register(username, email, password);
                // Auto login or just notify? Let's auto login or pass data.
                // The register API returns {user, token} so we can log in directly.
                onLoginSuccess(data.user, data.token);
            } else {
                const data = await api.login(username, password);
                onLoginSuccess(data.user, data.token);
            }
        } catch (err) {
            setError(err.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-md p-12 rounded-3xl shadow-2xl">
                <button onClick={onClose} className="absolute top-6 right-6 text-neutral-300 hover:text-black">
                    <X className="w-6 h-6" />
                </button>
                <div className="text-center mb-12">
                    <h3 className="text-4xl font-serif mb-3 italic">{isRegister ? 'Join Atelier' : 'Welcome Back'}</h3>
                    <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                        {isRegister ? 'Create your couture profile' : 'Enter your couture profile'}
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-4 border border-neutral-200 rounded-xl text-sm outline-none bg-neutral-50"
                        required
                    />

                    {isRegister && (
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-4 border border-neutral-200 rounded-xl text-sm outline-none bg-neutral-50"
                        />
                    )}

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-4 border border-neutral-200 rounded-xl text-sm outline-none bg-neutral-50"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-neutral-900 text-white py-5 font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-amber-900 shadow-lg rounded-full disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : (isRegister ? 'Register' : 'Login')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest hover:text-black"
                    >
                        {isRegister ? 'Already have an account? Login' : 'New Client? Register'}
                    </button>
                </div>
            </div>
        </div>
    );
}
