import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Navbar from '../../../components/Navbar';

const chapters = [
    'Chapter 1: Sets',
    'Chapter 2: Relations and Functions',
    'Chapter 3: Trigonometric Functions',
    'Chapter 4: Principle of Mathematical Induction',
    'Chapter 5: Complex Numbers and Quadratic Equations'
];

const questions = [
    {
        chapter: 'Chapter 1: Sets',
        content: [
            {
                question: 'If A = {x: x is a natural number, x is a prime number less than 30}, Write A in roster form.',
                answer: 'A = {2,3,5,7,11,13,17,19,23,29}'
            },
            {
                question: 'Write the set x: x is a positive integer and x² < 40 in the roster form.',
                answer: 'A = {1,2,3,4,5,6,7}'
            }
        ]
    }
];

const PlusOneChapters = () => {
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [showLevels, setShowLevels] = useState(false);

    const handleChapterClick = (chapter) => {
        setSelectedChapter(chapter);
        setShowLevels(true);
    };

    const handleLevelClick = (level) => {
        console.log(`Selected ${level}`);
        // Navigate to the next component or perform actions based on level
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center py-10">
                <h2 className="text-4xl font-bold mb-6 text-center">Plus One Class Resources</h2>
                <div className="flex justify-center items-center">
                    <div className="space-y-4 w-full max-w-md">
                        {chapters.map((chapter, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-700 mx-auto"
                                 onClick={() => handleChapterClick(chapter)}>
                                {chapter}
                                {selectedChapter === chapter && showLevels && (
                                    <div className="mt-2 space-y-2">
                                        <div className="bg-gray-700 p-2 rounded-lg text-center hover:bg-gray-600 cursor-pointer"
                                             onClick={() => handleLevelClick('Level 1')}>Level 1</div>
                                        <div className="bg-gray-700 p-2 rounded-lg text-center hover:bg-gray-600 cursor-pointer"
                                             onClick={() => handleLevelClick('Level 2')}>Level 2</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlusOneChapters;