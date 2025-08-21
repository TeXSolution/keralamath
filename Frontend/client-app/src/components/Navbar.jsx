import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate()
    const isLoggedIn = !!localStorage.getItem('access_token');
  
    return (
        <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3" onClick={()=>{navigate('/')}}>
                    <BookOpen className="w-8 h-8 text-blue-400" />
                    <span className="text-2xl font-bold text-white">TexSolution</span>
                </div>
                <div className="hidden md:flex space-x-6">
                    <a href="#features" className="text-gray-300 hover:text-white">Features</a>
                    <a href="#about" className="text-gray-300 hover:text-white">About</a>
                    <a href="#contact" className="text-gray-300 hover:text-white">Contact</a>
                </div>
                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-300 hover:text-white">
                                Login
                            </Link>
                            <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
