import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/axiosInstance';
import { BookOpen, ChevronLeft, Layers, FileText } from 'lucide-react';

// Capitalize first letter of string
const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

const SubjectCard = ({ subject, onChapterClick }) => {
    return (
        <div className="p-5 bg-gray-800 rounded-xl shadow-md mb-5 border border-gray-700">
            <div className="pb-2 border-b border-gray-600 mb-3">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                    <span className="tracking-wide">{capitalizeFirstLetter(subject.name)}</span>
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                    Class Level: <span className="font-medium text-gray-300">{subject.class_level?.level}</span> - <span className="uppercase">{subject.class_level?.syllabus}</span>
                </p>
                {subject.description && (
                    <p className="text-gray-300 mt-2 text-sm">{subject.description}</p>
                )}
            </div>

            <div className="pl-2">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2 text-base">
                    <Layers className="w-4 h-4 text-green-400" />
                    Chapters
                </h4>
                {subject.chapters && subject.chapters.length > 0 ? (
                    subject.chapters.map((chapter) => (
                        <div
                            key={chapter.id}
                            className="text-blue-400 hover:underline cursor-pointer mb-1 ml-1 flex items-center gap-2 text-sm"
                            onClick={() => onChapterClick(chapter.id)}
                        >
                            <FileText className="w-4 h-4" />
                            {capitalizeFirstLetter(chapter.name)}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-sm">No chapters available.</p>
                )}
            </div>
        </div>
    );
};

const SubjectListFiltered = () => {
    const { board, classLevel } = useParams();
 

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axiosInstance.get(`/subjects/${board}/${classLevel}/`);
                setSubjects(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching subjects:', error);
                setLoading(false);
            }
        };
        fetchSubjects();
    }, [board, classLevel]);

    const handleChapterClick = (chapterId) => {
        navigate(`/admin-dashboard/chapter/${chapterId}/questions`);
    };

    return (
        <div className="p-8 text-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-3xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold capitalize flex items-center gap-2 text-white">
                        <BookOpen className="w-6 h-6 text-yellow-400" />
                        Subjects for {board?.toUpperCase()} - {classLevel === 'plusone' ? 'Plus One' : 'Plus Two'}
                    </h2>
                    <button
                        onClick={() => navigate('/admin-dashboard/subject-select')}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm flex items-center gap-2"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                    </button>
                </div>

                {loading ? (
                    <p className="text-gray-400 text-center">Loading...</p>
                ) : subjects.length === 0 ? (
                    <p className="text-gray-400 text-center">No subjects found.</p>
                ) : (
                    subjects.map((subject) => (
                        <SubjectCard
                            key={subject.id}
                            subject={subject}
                            onChapterClick={handleChapterClick}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default SubjectListFiltered;
