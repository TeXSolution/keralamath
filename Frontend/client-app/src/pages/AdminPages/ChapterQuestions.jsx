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
        <ul className="space-y-3">
          {questions.map((q, index) => (
            <li key={q.id} className="p-4 bg-gray-100 rounded flex justify-between items-center">
              <div>
                <strong className="text-gray-800">Q{index + 1}:</strong> {q.text}
              </div>
              <div className="flex gap-3">
                <button className="text-blue-600 hover:text-blue-800">
                  <Pencil size={18} />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No questions found.</p>
      )}
    </div>
  );
};

export default ChapterQuestions;
