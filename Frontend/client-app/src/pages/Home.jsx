import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Users, Award, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';

const Landing = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('access_token');
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
    };



    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />
            {/* Hero Section */}
            <div className="container mx-auto px-6 py-5 text-center">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
                    Transform Your Learning Experience
                </h1>
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                    Join thousands of students achieving their goals through our innovative learning platform.
                </p>
             
            </div>


            {/* Plus One and Plus Two Classes - Centered */}
            <div className="container mx-auto px-6 py-20 flex justify-center space-x-12">
                {/* Plus One Class Card */}
                <div className="text-center">
                    <div className="bg-green-600/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                        <Award className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">Plus One Class</h3>
                    <p className="text-gray-300">Explore our Plus One curriculum and get ahead in your academics.</p>
                    <div className="flex justify-center gap-4 mt-4">
                        <Link
                            to="/plusone/kerala-syllabus"
                            className="px-6 py-2 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                        >
                            Kerala Syllabus
                        </Link>
                        <Link
                            to="/plusone/cbse"
                            className="px-6 py-2 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                        >
                            CBSE
                        </Link>
                    </div>
                </div>

                {/* Plus Two Class Card */}
                <div className="text-center">
                    <div className="bg-purple-600/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                        <Award className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">Plus Two Class</h3>
                    <p className="text-gray-300">Prepare for your future with our advanced Plus Two curriculum.</p>
                    <div className="flex justify-center gap-4 mt-4">
                        <Link
                            to="/plustwo/kerala-syllabus"
                            className="px-6 py-2 text-lg font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                        >
                            Kerala Syllabus
                        </Link>
                        <Link
                            to="/plustwo/cbse"
                            className="px-6 py-2 text-lg font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                        >
                            CBSE
                        </Link>
                    </div>
                </div>
            </div>



            <div className="container mx-auto px-6 py-20" id="features">
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="text-center">
                        <div className="bg-blue-600/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-4">Expert-Led Courses</h3>
                        <p className="text-gray-300">Learn from industry experts and gain practical knowledge.</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-blue-600/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                            <Users className="w-8 h-8 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-4">Community Learning</h3>
                        <p className="text-gray-300">Connect with peers and learn together in a collaborative environment.</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-blue-600/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                            <Award className="w-8 h-8 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-4">Certified Programs</h3>
                        <p className="text-gray-300">Earn recognized certificates upon course completion.</p>
                    </div>
                </div>
            </div>
        </div>
    );



    


}


export default Landing;