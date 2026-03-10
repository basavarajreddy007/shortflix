import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import useAuth from '../../hooks/useAuth';


const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { verifyOTP } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    if (!email) {
        navigate('/login');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await verifyOTP(email, otp);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-netflix-black overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-netflix-red/20 to-black z-0" />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative z-10 w-full max-w-[450px] bg-black/80 p-8 md:p-16 rounded-lg text-center"
            >
                <div className="w-16 h-16 bg-netflix-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="w-8 h-8 text-netflix-red" />
                </div>

                <h1 className="text-3xl font-bold mb-2">Verify OTP</h1>
                <p className="text-gray-400 mb-8">We've sent a 6-digit code to <span className="text-white">{email}</span></p>

                {error && <div className="bg-red-500/20 text-red-500 p-3 rounded mb-6 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        maxLength="6"
                        required
                        autoFocus
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="000000"
                        className="w-full bg-[#333] tracking-[1rem] text-center rounded px-4 py-4 text-3xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-netflix-red transition-all"
                    />

                    <button
                        disabled={loading || otp.length < 6}
                        type="submit"
                        className="w-full bg-netflix-red text-white py-4 rounded font-bold text-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {loading ? 'Verifying...' : 'Verify & Sign In'}
                    </button>
                </form>

                <p className="mt-8 text-gray-500">
                    Didn't receive code?{' '}
                    <button className="text-white hover:underline">Resend code</button>
                </p>
            </motion.div>
        </div>
    );
};

export default VerifyOTP;
