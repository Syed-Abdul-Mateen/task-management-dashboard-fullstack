import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Search, Filter, CheckCircle2, CircleDashed, ListTodo, CheckSquare } from 'lucide-react';
import api from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterStatus = queryParams.get('status') || '';

  useEffect(() => {
    fetchTasks();
  }, [filterStatus, filterPriority, searchQuery]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      let url = '/tasks?';
      if (filterStatus) url += `status=${filterStatus}&`;
      if (filterPriority) url += `priority=${filterPriority}&`;
      if (searchQuery) url += `search=${searchQuery}`;
      
      const response = await api.get(url);
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (task = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleSaveTask = () => {
    handleCloseModal();
    fetchTasks();
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  // Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = totalTasks - completedTasks;

  const StatCard = ({ title, value, icon, colorClass }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md flex items-center justify-between group">
      <div>
        <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">{title}</h3>
        <p className="text-3xl font-black text-gray-800 group-hover:scale-105 transition-transform origin-left">{value}</p>
      </div>
      <div className={`p-4 rounded-2xl ${colorClass} bg-opacity-10 text-current`}>
        {icon}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50/50 overflow-hidden font-sans">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto relative">
        {/* Subtle background blob */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="p-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-4">
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
              <p className="text-gray-500 mt-2 font-medium">Manage your tasks and track your productivity.</p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center justify-center space-x-2 bg-gradient-primary-glow text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              <Plus size={20} strokeWidth={3} />
              <span className="font-bold">Create Task</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard 
              title="Total Tasks" 
              value={totalTasks} 
              icon={<ListTodo size={28} className="text-primary" />} 
              colorClass="bg-primary text-primary"
            />
            <StatCard 
              title="Completed" 
              value={completedTasks} 
              icon={<CheckCircle2 size={28} className="text-success" />} 
              colorClass="bg-success text-success"
            />
            <StatCard 
              title="In Progress" 
              value={pendingTasks} 
              icon={<CircleDashed size={28} className="text-warning" />} 
              colorClass="bg-warning text-warning"
            />
          </div>

          {/* Filters & Search */}
          <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] mb-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-transparent bg-gray-50 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
            <div className="flex items-center space-x-2 bg-gray-50 rounded-xl px-2">
              <Filter className="text-gray-400 ml-2" size={18} />
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="bg-transparent border-transparent py-3 pr-4 pl-2 focus:outline-none font-medium text-gray-700 cursor-pointer"
              >
                <option value="">All Priorities</option>
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>
          </div>

          {/* Task List */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary"></div>
                <p className="text-gray-400 font-medium animate-pulse">Loading tasks...</p>
              </div>
            </div>
          ) : tasks.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-sm max-w-2xl mx-auto mt-12">
              <div className="bg-primary/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckSquare className="text-primary opacity-80" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">All caught up!</h3>
              <p className="text-gray-500 mb-8 text-lg">
                {searchQuery || filterPriority || filterStatus
                  ? "No tasks match your current filters. Try clearing them."
                  : "You don't have any tasks right now. Enjoy your free time or add a new task."}
              </p>
              {!(searchQuery || filterPriority || filterStatus) && (
                <button
                  onClick={() => handleOpenModal()}
                  className="inline-flex items-center space-x-2 bg-white border-2 border-primary text-primary px-6 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-colors font-bold"
                >
                  <Plus size={20} />
                  <span>Create your first task</span>
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max">
              {tasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={editingTask}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default Dashboard;
