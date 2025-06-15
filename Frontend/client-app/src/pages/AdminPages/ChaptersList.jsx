import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios/axiosInstance';
import { Link } from 'react-router-dom';

const ChapterCard = ({ chapter }) => (

<Link to={`/admin-dashboard/question-view/${chapter.id}/`}>
    <div className="p-4 bg-gray-800 rounded-lg shadow-md mb-4 hover:bg-gray-700 cursor-pointer">
        <h3 className="text-xl font-bold text-white mb-2">{chapter.name}</h3>
        <p className="text-gray-300">{chapter.description}</p>
    </div>
</Link>

);

const ChapterList = () => {
    const { subjectId } = useParams();
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subjectName, setSubjectName] = useState('');

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

    return (
        <div className="p-8 text-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-2xl">
                <h2 className="text-3xl font-semibold mb-6 text-center">
                    Chapters of {subjectName || 'Subject'}
                </h2>
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
