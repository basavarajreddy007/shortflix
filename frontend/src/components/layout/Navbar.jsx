import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, LogOut, Menu, X, Plus } from 'lucide-react';
import useAuth from '../../hooks/useAuth';


const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-netflix-black shadow-2xl' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
                {/* Logo & Main Nav */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-2xl md:text-3xl font-black text-netflix-red tracking-tighter">
                        SHORTFLIX
                    </Link>
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <Link to="/trending" className="hover:text-white transition-colors">Trending</Link>
                        <Link to="/ai-writer" className="hover:text-white transition-colors">AI Writer</Link>
                        <Link to="/ai-analyzer" className="hover:text-white transition-colors">AI Analysis</Link>
                    </div>
                </div>

                {/* Icons & Profile */}
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="hidden sm:flex items-center relative group">
                        <Search className="w-5 h-5 text-gray-300 group-hover:text-white cursor-pointer" />
                        <input
                            type="text"
                            placeholder="Titles, people, genres"
                            className="w-0 group-hover:w-48 transition-all duration-500 bg-transparent border-b border-white outline-none px-2 text-sm placeholder:text-gray-500"
                        />
                    </div>

                    <Bell className="w-5 h-5 text-gray-300 cursor-pointer hover:text-white" />

                    {user ? (
                        <div className="relative group">
                            <div className="w-8 h-8 rounded bg-netflix-red flex items-center justify-center cursor-pointer overflow-hidden transform group-hover:scale-110 transition-transform">
                                <User className="w-5 h-5 text-white" />
                            </div>

                            <div className="absolute right-0 top-full pt-4 hidden group-hover:block">
                                <div className="w-48 bg-black/95 border border-white/10 rounded overflow-hidden shadow-2xl backdrop-blur-xl">
                                    <div className="p-4 border-b border-white/10">
                                        <p className="text-sm font-bold truncate">{user.username}</p>
                                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                    </div>
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Profile</Link>
                                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Creator Dashboard</Link>
                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2"
                                    >
                                        <LogOut className="w-4 h-4" /> Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-netflix-red text-white px-4 py-1.5 rounded text-sm font-bold hover:bg-red-700 transition-colors"
                        >
                            Sign In
                        </Link>
                    )}

                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
                        {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden glass fixed inset-0 top-16 md:top-20 z-40 p-6 flex flex-col gap-6 text-lg font-bold">
                    <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                    <Link to="/trending" onClick={() => setMobileMenuOpen(false)}>Trending</Link>
                    <Link to="/ai-writer" onClick={() => setMobileMenuOpen(false)}>AI Writer</Link>
                    <Link to="/ai-analyzer" onClick={() => setMobileMenuOpen(false)}>AI Analysis</Link>
                    {user && <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
