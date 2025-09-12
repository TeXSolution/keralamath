import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../axios/axiosInstance';
import Navbar from '../../components/Navbar';

const QuestionListing = () => {
    const location = useLocation();
    const { subject } = location.state || {};

   

    // STARTING CALL
    useEffect(() => {
        if (!subject) return;

        const fetchChapters = async () => {
            try {
                const response = await axiosInstance.get('/chapters/user', {
                    params: { subject }
                });
                setChapters(response.data);
                console.log(response.data,'data qustion');
                
            } catch (error) {
                console.error('Error fetching chapters:', error);
            }
        };

        fetchChapters();
    }, [subject]);

    const handleChapterSelect = async (chapterId) => {
        setSelectedChapterId(chapterId);
        try {
            const res = await axiosInstance.get(`/questions/user`, {
                params: { chapter_id: chapterId }
            });
            setQuestions(res.data);
            setExpandedIndex(0);  
        } catch (err) {
            console.error('Error fetching questions:', err);
        }
    };

    const handleNext = () => {
        if (expandedIndex < questions.length - 1) {
            setExpandedIndex(expandedIndex + 1);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="container mx-auto py-10">
                <h2 className="text-3xl font-bold text-center mb-6">Questions for {subject}</h2>

                {chapters.length > 0 && !selectedChapterId && (
                    <div className="text-center space-y-3">
                        {chapters.map((ch) => (
                            <button
                                key={ch.id}
                                onClick={() => handleChapterSelect(ch.id)}
                                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"
                            >
                                {ch.name}
                            </button>
                        ))}
                    </div>
                )}
                {selectedChapterId && (
                    <div className="mt-8 space-y-4">
                        {questions.length === 0 ? (
                            <div className="text-gray-400 text-center">No questions found</div>
                        ) : (
                            <>
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold">Q{expandedIndex + 1}:</h3>
                                    <p className="mt-2">{questions[expandedIndex].question_text}</p>
                                    <p className="mt-2 text-green-400 font-medium">
                                        Answer: {questions[expandedIndex].answer_text}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <button
                                        onClick={handleNext}
                                        disabled={expandedIndex >= questions.length - 1}
                                        className="mt-4 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg"
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};






export default QuestionListing;
