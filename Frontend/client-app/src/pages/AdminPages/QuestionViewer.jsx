import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios/axiosInstance';

const QuestionViewer = () => {
    const { chapterId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axiosInstance.get(`/chapters/${chapterId}/questions/`);
                console.log(response.data,'dataaaa');
                
                setQuestions(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [chapterId]);

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const currentQuestion = questions[currentIndex];

    return (
        <div className="p-8 text-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-2xl">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Question {currentIndex + 1} of {questions.length}
                </h2>
                {loading ? (
                    <p className="text-gray-400 text-center">Loading questions...</p>
                ) : questions.length === 0 ? (
                    <p className="text-gray-400 text-center">No questions available.</p>
                ) : (
                    <div>
                        <h3 className="text-xl text-white mb-2">{currentQuestion.question_text}</h3>
                        {/* Display options if you have */}
                        {currentQuestion.options && currentQuestion.options.length > 0 && (
                            <ul className="text-gray-300 list-disc ml-5">
                                {currentQuestion.options.map((option, index) => (
                                    <li key={index}>{option}</li>
                                ))}
                            </ul>
                        )}
                        {currentIndex < questions.length - 1 && (
                            <button
                                onClick={handleNext}
                                className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white w-full"
                            >
                                Next
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionViewer;
