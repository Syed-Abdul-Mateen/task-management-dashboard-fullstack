import React from 'react';
import { Pencil, Trash2, Calendar, AlertCircle } from 'lucide-react';
import api from '../services/api';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const isCompleted = task.status === 'Completed';

  const priorityColors = {
    Low: 'bg-blue-100 text-blue-800',
    Medium: 'bg-warning/20 text-warning',
    High: 'bg-danger/20 text-danger',
  };

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
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all hover:shadow-md ${isCompleted ? 'opacity-70' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleStatusToggle}
            className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
          />
          <h3 className={`text-lg font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.title}
          </h3>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => onUpdate(task, true)} className="text-gray-400 hover:text-primary transition-colors">
            <Pencil size={18} />
          </button>
          <button onClick={handleDelete} className="text-gray-400 hover:text-danger transition-colors">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 ml-8">{task.description}</p>
      
      <div className="flex items-center justify-between mt-4 ml-8">
        <div className="flex space-x-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
        
        {task.due_date && (
          <div className="flex items-center text-xs text-gray-500 space-x-1">
            <Calendar size={14} />
            <span>{new Date(task.due_date).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
