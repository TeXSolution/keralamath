import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios/axiosInstance';
import { Plus } from 'lucide-react';

const Card = ({ children }) => (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md mb-4">
        {children}
    </div>
);




const Input = ({ placeholder, value, onChange }) => (
    <input
        className="p-2 bg-gray-700 text-white rounded-md w-full mb-2"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
);

const SubjectForm = () => {
    const [subjectName, setSubjectName] = useState('');
    const [subjectDescription, setSubjectDescription] = useState('');
    const [classLevels, setClassLevels] = useState([]);
    const [className, setClassName] = useState('');

    // Fetch class levels from backend
    useEffect(() => {
        const fetchClassLevels = async () => {
            try {
                const response = await axiosInstance.get('/classlevels/');
                setClassLevels(response.data);
                console.log(response.data,'data');
                
            } catch (error) {
                console.error('Error fetching class levels:', error);
            }
        };
        fetchClassLevels();
    }, []);

    const handleCreateSubject = async () => {
        try {
            const response = await axiosInstance.post('/subjects/', {
                class_level: className,
                name: subjectName,
                description: subjectDescription,
            });
            alert('Subject created successfully');
            console.log(response.data);
        } catch (error) {
            alert('Error creating subject');
            console.error('Error creating subject:', error);
        }
    };



    
    return (
        <div className="p-8 text-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md">
                <h2 className="text-3xl font-semibold mb-6 text-center">Add subjects</h2>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-1">Select Class Level</label>
                    <select
                        className="p-3 bg-gray-700 text-white rounded-xl w-full mb-2 outline-none focus:ring-2 focus:ring-blue-500"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                    >
                        <option value="" disabled>Select Class Level</option>
                        {classLevels.map((level) => (
                            <option key={level.id} value={level.id}>{level.level}</option>







                            
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-1">Subject Name</label>
                    <Input
                        placeholder="Enter Subject Name"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-1">Subject Description</label>
                    <Input
                        placeholder="Enter Subject Description"
                        value={subjectDescription}
                        onChange={(e) => setSubjectDescription(e.target.value)}
                    />
                </div>
                <button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-all rounded-2xl text-white w-full flex items-center justify-center gap-2"
                    onClick={handleCreateSubject}
                >
                    <Plus className="w-5 h-5" /> Create Subject
                </button>
            </div>
        </div>
    );
    
};




export default SubjectForm;
