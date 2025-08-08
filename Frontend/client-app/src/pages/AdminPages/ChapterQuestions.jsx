import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pencil, Trash2, Plus } from 'lucide-react';
import axiosInstance from '../../axios/axiosInstance'; 

const ChapterQuestions = () => {
  const { chapterId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axiosInstance.get(`/questions/${chapterId}/`);
        setQuestions(res.data || []);  
        setLoading(false);
      } catch (err) {
        console.error('Error fetching questions', err);
        setLoading(false);
      }
    };
 
    fetchQuestions();
  }, [chapterId]);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Questions</h2>
        <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 flex items-center gap-2">
          <Plus size={18} /> Add Question
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading questions...</p>
      ) : questions.length > 0 ? (
       
      ) : (
        <p className="text-gray-500">No questions found.</p>
      )}
    </div>
  );
};

export default ChapterQuestions;
