import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/axiosInstance';



const ChapterList = () => {
    const { subjectId } = useParams();
    const navigate = useNavigate();
    const [chapters, setChapters] = useState([]);
  

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const chapterRes = await axiosInstance.get(`/chapters/${subjectId}/`);
                setChapters(chapterRes.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching chapters:', error);
                setLoading(false);
            }
        };

        const fetchSubjectName = async () => {
            try {
                const subjectRes = await axiosInstance.get(`/subjects/${subjectId}/`);
                setSubjectName(subjectRes.data.name);
            } catch (error) {
                console.error('Error fetching subject name:', error);
            }
        };

        fetchChapters();
        fetchSubjectName();
    }, [subjectId]);

    const handleAddChapter = () => {
        navigate(`/admin-dashboard/add-chapter/${subjectId}/`);
    };

    return (
        <div className="p-8 text-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold">
                        Chapters of {subjectName || 'Subject'}
                    </h2>
                    <button
                        onClick={handleAddChapter}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                    >
                        + Add Chapter
                    </button>
                </div>
                {loading ? (
                    <p className="text-gray-400 text-center">Loading...</p>
                ) : chapters.length === 0 ? (
                    <p className="text-gray-400 text-center">No chapters available</p>
                ) : (
                    chapters.map((chapter) => (
                        <ChapterCard key={chapter.id} chapter={chapter} />
                    ))
                )}
            </div>
        </div>
    );
};

export default ChapterList;
