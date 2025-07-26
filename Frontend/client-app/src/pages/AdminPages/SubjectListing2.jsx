import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubjectList = () => {
    const [selectedBoard, setSelectedBoard] = useState(null);
    const navigate = useNavigate();

    const handleBoardClick = (board) => {
        setSelectedBoard(board); // 'cbse' or 'kerala'
    };

    const handleClassClick = (className) => {
        // Navigate to the new route with selected board and class
        navigate(`/admin-dashboard/subjects-list/${selectedBoard}/${className}`);
    };

    const classLevels = ['plusone', 'plustwo'];

    return (
        <div className="p-8 text-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-2xl">
                <h2 className="text-3xl font-semibold text-center mb-6">Select Board</h2>

                {!selectedBoard ? (
                    <div className="flex justify-center gap-6">
                        <button
                            onClick={() => handleBoardClick('cbse')}
                            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                        >
                            CBSE
                        </button>
                        <button
                            onClick={() => handleBoardClick('kerala')}
                            className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition"
                        >
                            Kerala
                        </button>
                    </div>
                ) : (
                    <>
                        <h3 className="text-xl font-semibold text-center mb-4">
                            Select Class for {selectedBoard.toUpperCase()}
                        </h3>
                        <div className="flex justify-center gap-6">
                            {classLevels.map((className) => (
                                <button
                                    key={className}
                                    onClick={() => handleClassClick(className)}
                                    className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                                >
                                    {className === 'plusone' ? 'Plus One' : 'Plus Two'}
                                </button>
                            ))}
                        </div>
                        <div className="text-center mt-6">
                            <button
                                onClick={() => setSelectedBoard(null)}
                                className="text-sm text-blue-400 underline"
                            >
                                ← Go Back
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SubjectList;
