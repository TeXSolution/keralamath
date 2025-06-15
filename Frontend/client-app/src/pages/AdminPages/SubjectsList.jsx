import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios/axiosInstance';
import { Link } from 'react-router-dom';

const SubjectCard = ({ subject }) => (

<Link to={`/admin-dashboard/chapters-list/${subject.id}/`}>
    <div className="p-4 bg-gray-800 rounded-lg shadow-md mb-4 hover:bg-gray-700 cursor-pointer">
        <h3 className="text-xl font-bold text-white mb-1">{subject.name}</h3>
        <p className="text-gray-400 text-sm mb-1">Class Level: {subject.class_level_name}</p>
        <p className="text-gray-300">{subject.description}</p>
    </div>
</Link>
);

const SubjectList = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axiosInstance.get('/subjects/');
                setSubjects(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching subjects:', error);
                setLoading(false);
            }
        };
        fetchSubjects();
    }, []);

    return (
        <div className="p-8 text-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-2xl">
                <h2 className="text-3xl font-semibold mb-6 text-center">Subject List</h2>
                {loading ? (
                    <p className="text-gray-400 text-center">Loading...</p>
                ) : subjects.length === 0 ? (
                    <p className="text-gray-400 text-center">No subjects available</p>
                ) : (
                    subjects.map(subject => (
                        <SubjectCard key={subject.id} subject={subject} />
                    ))
                )}
            </div>
        </div>
    );
};

export default SubjectList;
