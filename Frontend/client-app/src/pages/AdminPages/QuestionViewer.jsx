import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/axiosInstance';

const QuestionViewer = () => {
    const { chapterId } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axiosInstance.get(`/chapters/${chapterId}/questions/`);
                setQuestions(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [chapterId]);

    const handleQuestionClick = (questionId) => {
        navigate(`/admin-dashboard/question-details/${questionId}`);
    };

    return (
        <div className="p-8 text-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-3xl">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    All Questions ({questions.length})
                </h2>

                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => navigate(`/admin-dashboard/add-question/${chapterId}`)}
                        className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-600 transition"
                    >
                        + Add Question
                    </button>
                </div>

                {loading ? (
                    <p className="text-gray-400 text-center">Loading questions...</p>
                ) : questions.length === 0 ? (
                    <p className="text-gray-400 text-center">No questions available.</p>
                ) : (
                    <ul className="space-y-6">
                        {questions.map((question, index) => (
                            <li
                                key={question.id}
                                className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition cursor-pointer"
                                onClick={() => handleQuestionClick(question.id)}
                            >
                                <h3 className="text-lg font-medium mb-2">
                                    {index + 1}. {question.question_text}?
                                </h3>
                                {question.options && question.options.length > 0 && (
                                    <ul className="list-disc ml-5 text-sm text-gray-300">
                                        {question.options.map((option, idx) => (
                                            <li key={idx}>{option}</li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default QuestionViewer;
