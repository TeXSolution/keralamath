import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/axiosInstance';

const SubjectCard = ({ subject }) => (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md mb-4 hover:bg-gray-700 cursor-pointer">
        <h3 className="text-xl font-bold text-white mb-1">{subject.name}</h3>
        <p className="text-gray-400 text-sm mb-1">Class Level: {subject.class_level_name}</p>
        <p className="text-gray-300">{subject.description}</p>
    </div>
);

const SubjectListFiltered = () => {
    console.log('workign');
    
    const { board, classLevel } = useParams();
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axiosInstance.get('/subjects/');
                const filtered = response.data.filter(
                    (subject) =>
                        subject.board_type === board &&
                        subject.class_level.toLowerCase() === classLevel
                );
                setSubjects(filtered);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching subjects:', error);
                setLoading(false);
            }
        };
        fetchSubjects();
    }, [board, classLevel]);

    return (
        <div className="p-8 text-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-3xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold capitalize">
                        Subjects for {board.toUpperCase()} - {classLevel === 'plusone' ? 'Plus One' : 'Plus Two'}
                    </h2>
                    <button
                        onClick={() => navigate('/admin-dashboard/subject-select')}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm"
                    >
                        ← Back
                    </button>
                </div>

                {loading ? (
                    <p className="text-gray-400 text-center">Loading...</p>
                ) : subjects.length === 0 ? (
                    <p className="text-gray-400 text-center">No subjects found.</p>
                ) : (
                    subjects.map((subject) => (
                        <SubjectCard key={subject.id} subject={subject} />
                    ))
                )}
            </div>
        </div>
    );
};

export default SubjectListFiltered;
