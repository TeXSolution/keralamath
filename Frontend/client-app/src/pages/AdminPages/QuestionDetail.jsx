import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/axiosInstance';

const QuestionDetail = () => {
    const { questionId } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editedQuestion, setEditedQuestion] = useState({
        question_text: '',
        answer_text: '',
        order: ''
    });

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axiosInstance.get(`/questions/${questionId}/`);
                setQuestion(response.data);
                setEditedQuestion(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching question:', error);
                setLoading(false);
            }
        };
        fetchQuestion();
    }, [questionId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const cleanValue = name === 'question_text' ? value.replace(/\?+$/, '') : value;
        setEditedQuestion({ ...editedQuestion, [name]: cleanValue });
    };

    const handleUpdate = async () => {
        try {
            await axiosInstance.put(`/questions/${questionId}/`, editedQuestion);
            alert('Question updated successfully!');
            setQuestion(editedQuestion);
            setEditing(false);
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this question?");
        if (confirmDelete) {
            try {
                await axiosInstance.delete(`/questions/${questionId}/`);
                alert('Question deleted successfully.');
                navigate(-1); // Go back
            } catch (error) {
                console.error('Error deleting question:', error);
            }
        }
    };

    if (loading) {
        return <p className="text-white text-center mt-10">Loading...</p>;
    }

    if (!question) {
        return <p className="text-white text-center mt-10">Question not found.</p>;
    }

    return (
        <div className="p-8 text-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-2xl">
                <h2 className="text-2xl font-semibold mb-6 text-center">Question Details</h2>

                {editing ? (
                    <>
                        <label className="block mb-2 font-medium">Question:</label>
                        <textarea
                            name="question_text"
                            className="w-full p-2 bg-gray-800 rounded mb-4"
                            value={editedQuestion.question_text + '?'}
                            onChange={handleInputChange}
                        />

                        <label className="block mb-2 font-medium">Answer:</label>
                        <textarea
                            name="answer_text"
                            className="w-full p-2 bg-gray-800 rounded mb-4"
                            value={editedQuestion.answer_text}
                            onChange={handleInputChange}
                        />

                        <label className="block mb-2 font-medium">Order:</label>
                        <input
                            type="number"
                            name="order"
                            className="w-full p-2 bg-gray-800 rounded mb-4"
                            value={editedQuestion.order}
                            onChange={handleInputChange}
                        />

                        <div className="flex gap-4">
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditing(false)}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h3 className="text-xl mb-2 font-semibold">{question.question_text}?</h3>
                        <p className="mb-2"><strong>Answer:</strong> {question.answer_text}</p>
                        <p className="mb-4"><strong>Order:</strong> {question.order}</p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setEditing(true)}
                                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuestionDetail;
