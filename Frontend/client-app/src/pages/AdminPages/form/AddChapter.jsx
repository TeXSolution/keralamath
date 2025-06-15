import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axios/axiosInstance';

const AddChapter = () => {
    const { subjectId } = useParams();
    const navigate = useNavigate();
    const [chapterData, setChapterData] = useState({
        name: '',
        description: ''
    });

    const handleChange = (e) => {
        setChapterData({ ...chapterData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post(`/chapters/create/`, {
                ...chapterData,
                subject: subjectId
            });
            alert('Chapter added successfully');
            navigate(`/admin-dashboard/chapters-list/${subjectId}/`);
        } catch (error) {
            console.error('Error adding chapter:', error);
            alert('Failed to add chapter');
        }
    };

    return (
        <div className="p-8 text-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-2xl">
                <h2 className="text-3xl font-semibold mb-6 text-center">Add New Chapter</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">Chapter Name:</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full p-2 bg-gray-800 rounded mb-4"
                        value={chapterData.name}
                        onChange={handleChange}
                        required
                    />
                    <label className="block mb-2">Description:</label>
                    <textarea
                        name="description"
                        className="w-full p-2 bg-gray-800 rounded mb-4"
                        value={chapterData.description}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg"
                    >
                        Add Chapter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddChapter;
