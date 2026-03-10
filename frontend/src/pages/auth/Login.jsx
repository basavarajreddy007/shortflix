import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import useAuth from '../../hooks/useAuth';


const Login = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { loginWithOTP } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await loginWithOTP(email);
            navigate('/verify-otp', { state: { email } });
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-netflix-black overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/bg-cinematic.png"
                    className="w-full h-full object-cover opacity-50"
                    alt="bg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
            </div>


            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative z-10 w-full max-w-[450px] bg-black/75 p-8 md:p-16 rounded-md backdrop-blur-md"
            >
                <h1 className="text-3xl font-bold mb-8">Sign In</h1>

                {error && <div className="bg-orange-500/20 text-orange-500 p-3 rounded mb-6 text-sm italic">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <div className="relative">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                className="w-full bg-[#333] rounded px-4 py-4 text-white placeholder:text-gray-400 focus:outline-none focus:bg-[#444] transition-colors"
                            />
                            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-400">We'll send you an OTP to verify your account.</p>
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-netflix-red text-white py-4 rounded font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 group"
                    >
                        {loading ? 'Sending...' : 'Send OTP'}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-8 flex items-center justify-between text-gray-400 text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-none bg-gray-600 checked:bg-netflix-red" />
                        Remember me
                    </label>
                    <a href="#" className="hover:underline">Need help?</a>
                </div>

                <div className="mt-12">
                    <p className="text-gray-500">
                        New to ShortFlix?{' '}
                        <Link to="/register" className="text-white hover:underline">Sign up now.</Link>
                    </p>
                    <p className="text-xs text-gray-500 mt-4 leading-normal">
                        This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className="text-blue-500 hover:underline cursor-pointer">Learn more.</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
