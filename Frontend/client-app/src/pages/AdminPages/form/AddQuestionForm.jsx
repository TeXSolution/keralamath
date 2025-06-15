import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../axios/axiosInstance';

const AddQuestionForm = () => {
    const { chapterId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        question_text: '',
        answer_text: '',
        order: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/questions/create/', {
                ...formData,
                chapter: chapterId
            });
            alert('Question added successfully');
            navigate(`/admin-dashboard/question-view/${chapterId}`);
        } catch (error) {
            console.error('Error adding question:', error);
            alert('Failed to add question');
        }
    };

    return (
        <div className="p-8 text-white min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-xl"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center">Add New Question</h2>

                <div className="mb-4">
                    <label className="block text-sm mb-1">Question Text</label>
                    <textarea
                        name="question_text"
                        value={formData.question_text}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm mb-1">Answer Text</label>
                    <textarea
                        name="answer_text"
                        value={formData.answer_text}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm mb-1">Order</label>
                    <input
                        type="number"
                        name="order"
                        value={formData.order}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-600 transition w-full"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddQuestionForm;
