import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Navbar from '../../components/Navbar';

const PlusOneCBSEPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar/>
            <div className="container mx-auto px-6 py-20">
                <h2 className="text-4xl font-bold mb-8 text-center text-blue-400">CBSE Plus One Syllabus Resources</h2>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center cursor-pointer" onClick={toggleDropdown}>
                        <h3 className="text-2xl font-semibold text-white">Resources</h3>
                        <ChevronDown className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {isOpen && (
                        <div className="mt-4 space-y-2">
                            <a href="#" className="block bg-blue-700 p-2 rounded hover:bg-blue-600">Chapter-wise Solutions</a>
                            <a href="#" className="block bg-blue-700 p-2 rounded hover:bg-blue-600">Previous Year Question Papers</a>
                            <a href="#" className="block bg-blue-700 p-2 rounded hover:bg-blue-600">Mock Tests</a>
                            <a href="#" className="block bg-blue-700 p-2 rounded hover:bg-blue-600">Quizzes</a>
                            <a href="#" className="block bg-blue-700 p-2 rounded hover:bg-blue-600">Performance Analytics</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlusOneCBSEPage;
