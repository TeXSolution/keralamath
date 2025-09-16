import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const PlusOnePage = () => {
    const [isOpen, setIsOpen] = useState(false);

    

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-6 py-20">
                <h2 className="text-4xl font-bold mb-8 text-center">Plus One Class Resources</h2>

                {/* BUTTON TOGGLE */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center cursor-pointer" onClick={toggleDropdown}>
                        <h3 className="text-2xl font-semibold">Resources</h3>
                        <ChevronDown className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {isOpen && (
                        <div className="mt-4 space-y-2">
                            <a href="#" className="block bg-gray-700 p-2 rounded hover:bg-gray-600">Chapter-wise Solutions</a>
                            <a href="#" className="block bg-gray-700 p-2 rounded hover:bg-gray-600">Previous Year Question Papers</a>
                            <a href="#" className="block bg-gray-700 p-2 rounded hover:bg-gray-600">Mock Tests</a>
                            <a href="#" className="block bg-gray-700 p-2 rounded hover:bg-gray-600">Quizzes</a>
                            <a href="#" className="block bg-gray-700 p-2 rounded hover:bg-gray-600">Performance Analytics</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlusOnePage;
