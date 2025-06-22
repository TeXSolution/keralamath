import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import axiosInstance from '../../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';

const PlusOneChapters = () => {
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [showLevels, setShowLevels] = useState(false);
    const [subjectList, setSubjectList] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

const handleChapterClick = (subjectName) => {
    navigate(`/question-listing`, { state: { subject: subjectName } });
};

    const handleLevelClick = (level) => {
        console.log(`Selected ${level}`);
    };

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axiosInstance.get('/subjects/listing/', {
                    params: {
                        level: 'PlusOne',
                        syllabus: 'Kerala'
                    }
                });
                setSubjectList(response.data);
                
            } catch (error) {
                console.error('Error fetching subjects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="min-h-screen flex flex-col justify-center items-center py-10">
                <h2 className="text-4xl font-bold mb-6 text-center">
                    Plus One Class Resources (Kerala Syllabus)
                </h2>

                <div className="flex justify-center items-center">
                    <div className="space-y-4 w-full max-w-md">
                        {loading ? (
                            <div className="text-center text-gray-400">Loading subjects...</div>
                        ) : subjectList.length === 0 ? (
                            <div className="text-center text-gray-400">No subjects available</div>
                        ) : (
                            subjectList.map((subject, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-700 mx-auto"
                                    onClick={() => handleChapterClick(subject.name)}
                                >
                                    {subject.name}
                                    {selectedChapter === subject.name && showLevels && (
                                        <div className="mt-2 space-y-2">
                                            <div
                                                className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 cursor-pointer"
                                                onClick={() => handleLevelClick('Level 1')}
                                            >
                                                Level 1
                                            </div>
                                            <div
                                                className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 cursor-pointer"
                                                onClick={() => handleLevelClick('Level 2')}
                                            >
                                                Level 2
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlusOneChapters;
