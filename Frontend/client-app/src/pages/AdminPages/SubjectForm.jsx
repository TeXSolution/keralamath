import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios/axiosInstance';
import { Plus } from 'lucide-react';

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
    const [selectedSyllabus, setSelectedSyllabus] = useState('');

    // Fetch class levels
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get('/classlevels/');
                setClassLevels(res.data);
            } catch (err) {
                console.error('Error fetching class levels:', err);
            }
        };
        fetchData();
    }, []);

    const syllabusOptions = [...new Set(classLevels.map(item => item.syllabus))];

    const filteredClassLevels = classLevels.filter(
        (cls) => cls.syllabus.trim().toLowerCase() === selectedSyllabus.trim().toLowerCase()
    );

    const handleCreateSubject = async () => {
        if (!selectedSyllabus || !className || !subjectName) {
            alert('Please fill all required fields');
            return;
        }

        try {
            await axiosInstance.post('/subjects/', {
                class_level: parseInt(className),
                name: subjectName,
                description: subjectDescription,
            });
            alert('Subject created successfully');
            setSubjectName('');
            setSubjectDescription('');
            setClassName('');
        } catch (err) {
            alert('Error creating subject');
            console.error(err);
        }
    };

    return (
        <div className="p-8 text-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md">
                <h2 className="text-3xl font-semibold mb-6 text-center">Add Subject</h2>

                
                {/* Syllabus Dropdown */}
                <div className="mb-4">
                    <label className="block text-gray-300 mb-1">Select Syllabus</label>
                    <select
                        className="p-3 bg-gray-700 text-white rounded-xl w-full"
                        value={selectedSyllabus}
                        onChange={(e) => {
                            setSelectedSyllabus(e.target.value);
                            setClassName('');  
                        }}
                    >
                        <option value="" disabled>Select Syllabus</option>
                        {syllabusOptions.map((syllabus, i) => (
                            <option key={i} value={syllabus}>{syllabus}</option>
                        ))}
                    </select>
                </div>

                {/* Class Level Dropdown */}
                <div className="mb-4">
                    <label className="block text-gray-300 mb-1">Select Class Level</label>
                    <select
                        className="p-3 bg-gray-700 text-white rounded-xl w-full"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        disabled={!selectedSyllabus}
                    >
                        <option value="" disabled>Select Class Level</option>
                        {filteredClassLevels.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                                {cls.level}
                            </option>
                        ))}
                    </select>
                </div>

                
                {/* Syllabus Dropdown */}
                <div className="mb-4">
                    <label className="block text-gray-300 mb-1">Subject Name</label>
                    <Input
                        placeholder="Enter Subject Name"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                    />
                </div>

                {/* Subject Description */}
                <div className="mb-4">
                    <label className="block text-gray-300 mb-1">Subject Description</label>
                    <Input
                        placeholder="Enter Subject Description"
                        value={subjectDescription}
                        onChange={(e) => setSubjectDescription(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-all rounded-xl text-white w-full flex items-center justify-center gap-2"
                    onClick={handleCreateSubject}
                >
                    <Plus className="w-5 h-5" /> Create Subject
                </button>
            </div>
        </div>
    );
};

export default SubjectForm;
