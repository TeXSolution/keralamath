import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';

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
    }, []);

    const handleAddSubject = () => {
        navigate('/admin-dashboard/sub-form');
    };

    return (
        <div className="p-8 text-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold">Subject List</h2>
                    <button
                        onClick={handleAddSubject}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                    >
                        + Add Subject
                    </button>
                </div>

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
