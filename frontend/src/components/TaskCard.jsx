import React from 'react';
import { Pencil, Trash2, Calendar, Clock } from 'lucide-react';
import api from '../services/api';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const isCompleted = task.status === 'Completed';

  const priorityConfig = {
    Low: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
    Medium: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
    High: { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200' },
  };

  const pConfig = priorityConfig[task.priority] || priorityConfig.Medium;

  const handleStatusToggle = async () => {
    try {
      const newStatus = isCompleted ? 'Pending' : 'Completed';
      const response = await api.put(`/tasks/${task.id}`, { status: newStatus });
      onUpdate(response.data);
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${task.id}`);
        onDelete(task.id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  return (
    <div className={`group bg-white rounded-2xl border border-gray-100 p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 relative overflow-hidden ${isCompleted ? 'opacity-60 grayscale-[0.2]' : ''}`}>
      {/* Top accent line based on priority */}
      <div className={`absolute top-0 left-0 w-full h-1 ${pConfig.bg}`}></div>
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start space-x-3 pr-8">
          <div className="pt-1">
            <div 
              onClick={handleStatusToggle}
              className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${isCompleted ? 'bg-primary border-primary' : 'border-gray-300 hover:border-primary'}`}
            >
              {isCompleted && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
            </div>
          </div>
          <h3 className={`text-[1.1rem] font-bold leading-tight ${isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {task.title}
          </h3>
        </div>
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onUpdate(task, true)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors">
            <Pencil size={16} />
          </button>
          <button onClick={handleDelete} className="p-1.5 text-gray-400 hover:text-danger hover:bg-danger/10 rounded-md transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed ml-8">{task.description}</p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 ml-8">
        <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${pConfig.bg} ${pConfig.text} ${pConfig.border}`}>
          {task.priority}
        </span>
        
        {task.due_date && (
          <div className="flex items-center text-xs font-medium text-gray-400 space-x-1.5 bg-gray-50 px-2 py-1 rounded-md">
            <Clock size={14} />
            <span>{new Date(task.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
