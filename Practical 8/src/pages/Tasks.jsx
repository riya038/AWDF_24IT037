import React, { useState } from 'react';
import { Plus, Search, Filter, CheckCircle2, ListTodo, Sparkles } from 'lucide-react';
import { TaskCardRaw } from '../components/TaskCard';

export const INITIAL_TASKS = [
  {
    id: 1,
    title: 'Implement React.lazy() on Project routes',
    description: 'Convert static page imports to dynamic imports with React.lazy to split route bundles.',
    category: 'Architecture',
    priority: 'High',
    dueDate: '2026-09-25',
    assignee: 'Alex Morgan',
    completed: true,
  },
  {
    id: 2,
    title: 'Create Skeleton Suspense Fallback UI',
    description: 'Design and build smooth glassmorphic shimmer skeleton screen for seamless chunk transitions.',
    category: 'Frontend',
    priority: 'High',
    dueDate: '2026-09-26',
    assignee: 'Sarah Connor',
    completed: true,
  },
  {
    id: 3,
    title: 'Benchmark Vite build before & after code splitting',
    description: 'Record terminal dist sizes and DevTools network transfer sizes across routes.',
    category: 'Performance',
    priority: 'Medium',
    dueDate: '2026-09-28',
    assignee: 'Dev Team',
    completed: true,
  },
  {
    id: 4,
    title: 'Add component-level lazy loading for HeavyChart',
    description: 'Ensure analytics and D3/SVG chart libraries are only downloaded when user opens Analytics tab.',
    category: 'Optimization',
    priority: 'Medium',
    dueDate: '2026-09-29',
    assignee: 'Alex Morgan',
    completed: false,
  },
  {
    id: 5,
    title: 'Verify 300ms minimum delay to eliminate layout flash',
    description: 'Test lazyWithMinDelay utility on fast broadband networks.',
    category: 'QA & Testing',
    priority: 'Low',
    dueDate: '2026-10-01',
    assignee: 'Liam Chen',
    completed: false,
  },
  {
    id: 6,
    title: 'Record React DevTools Profiler flamegraph',
    description: 'Document unnecessary component re-renders and fix with React.memo & useCallback hooks.',
    category: 'Profiling',
    priority: 'High',
    dueDate: '2026-10-02',
    assignee: 'Sarah Connor',
    completed: false,
  }
];

export default function Tasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');

  const handleToggle = (id) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      description: 'Newly created sprint task for performance optimization practical.',
      category: 'General',
      priority: newTaskPriority,
      dueDate: new Date().toISOString().split('T')[0],
      assignee: 'Current Student',
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <div className="badge-section">
            <ListTodo size={14} className="text-indigo-400" />
            <span>Task Management Board</span>
          </div>
          <h1 className="page-title">Active Engineering Tasks</h1>
          <p className="page-subtitle">
            Core application tasks list loaded with the initial main bundle.
          </p>
        </div>

        <div className="task-progress-badge">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span>Completed: <strong>{completedCount} / {tasks.length}</strong> ({Math.round((completedCount / tasks.length) * 100)}%)</span>
        </div>
      </div>

      {/* Task Creation & Filters */}
      <div className="task-toolbar card-glass">
        <form onSubmit={handleAddTask} className="task-create-form">
          <input
            type="text"
            className="input-field flex-grow"
            placeholder="Add new task for performance evaluation..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <select
            className="select-field"
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <button type="submit" className="btn-primary">
            <Plus size={16} />
            <span>Add Task</span>
          </button>
        </form>

        <div className="task-filters-row">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="priority-filters">
            <span className="text-xs text-muted flex items-center gap-1">
              <Filter size={13} /> Filter:
            </span>
            {['All', 'High', 'Medium', 'Low'].map((p) => (
              <button
                key={p}
                className={`filter-pill ${priorityFilter === p ? 'active' : ''}`}
                onClick={() => setPriorityFilter(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task Cards Grid */}
      <div className="tasks-grid">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCardRaw
              key={task.id}
              task={task}
              onToggleStatus={handleToggle}
            />
          ))
        ) : (
          <div className="empty-state card-glass">
            <Sparkles size={32} className="text-indigo-400 mb-2" />
            <h3>No matching tasks found</h3>
            <p className="text-muted">Try adjusting your search keyword or priority filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
