import React, { useRef } from 'react';
import { CheckCircle2, Circle, Clock, Tag, User, AlertCircle } from 'lucide-react';

/**
 * TaskCard Component
 * Displays a single task item.
 * Contains a renderCounter ref to visually indicate whenever this component is re-rendered by React!
 */
export function TaskCardRaw({ task, onToggleStatus, isOptimized = false }) {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  const priorityColors = {
    High: 'badge-priority-high',
    Medium: 'badge-priority-medium',
    Low: 'badge-priority-low',
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-card-header">
        <button
          className="task-checkbox-btn"
          onClick={() => onToggleStatus(task.id)}
          title={task.completed ? 'Mark pending' : 'Mark complete'}
        >
          {task.completed ? (
            <CheckCircle2 className="text-emerald-400" size={20} />
          ) : (
            <Circle className="text-slate-400 hover:text-indigo-400" size={20} />
          )}
        </button>
        <span className={`task-title ${task.completed ? 'line-through text-muted' : ''}`}>
          {task.title}
        </span>
        <span className={`badge ${priorityColors[task.priority] || 'badge-priority-low'}`}>
          {task.priority}
        </span>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-card-footer">
        <div className="task-meta">
          <Tag size={13} />
          <span>{task.category}</span>
        </div>
        <div className="task-meta">
          <Clock size={13} />
          <span>{task.dueDate}</span>
        </div>
        <div className="task-meta">
          <User size={13} />
          <span>{task.assignee}</span>
        </div>

        {/* Live Re-Render Badge for DevTools / Profiler Visualization */}
        <div
          className={`render-counter-badge ${renderCountRef.current > 4 ? 'high-render' : ''}`}
          title="Number of times this component re-rendered since mount"
        >
          Renders: <strong>{renderCountRef.current}</strong>
        </div>
      </div>
    </div>
  );
}

// Memoized version of TaskCard using React.memo
export const TaskCardMemo = React.memo(TaskCardRaw);

// Default export uses raw or memo based on preference
export default TaskCardRaw;
