import React, { useState, useCallback, useMemo } from 'react';
import {
  Cpu,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Code2,
  FileCode,
  Flame
} from 'lucide-react';
import { TaskCardRaw, TaskCardMemo } from '../components/TaskCard';
import { INITIAL_TASKS } from './Tasks';

export default function ProfilerDemo() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [isOptimized, setIsOptimized] = useState(false);
  const [parentCounter, setParentCounter] = useState(0);
  const [parentSearch, setParentSearch] = useState('');
  const [profilerNotesOpen, setProfilerNotesOpen] = useState(true);

  // Un-optimized callback (re-created on every render)
  const unoptimizedToggle = (id) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Optimized callback (stable reference using useCallback)
  const optimizedToggle = useCallback((id) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="badge-section">
            <Cpu size={14} className="text-amber-400" />
            <span>Supplementary Problem 3: React DevTools Profiler Lab</span>
          </div>
          <h1 className="page-title">Unnecessary Re-render Diagnostics &amp; Fix</h1>
          <p className="page-subtitle">
            Identify, measure, and eliminate redundant child component re-renders using <code>React.memo()</code> and <code>useCallback()</code>.
          </p>
        </div>

        <div className="profiler-mode-switch card-glass">
          <span className="text-xs font-semibold text-slate-300">Active Mode:</span>
          <button
            className={`mode-btn ${!isOptimized ? 'active-danger' : ''}`}
            onClick={() => setIsOptimized(false)}
          >
            <AlertTriangle size={14} />
            Un-optimized (Raw)
          </button>
          <button
            className={`mode-btn ${isOptimized ? 'active-success' : ''}`}
            onClick={() => setIsOptimized(true)}
          >
            <CheckCircle2 size={14} />
            Optimized (React.memo)
          </button>
        </div>
      </div>

      {/* Interactive Trigger Sandbox */}
      <div className="profiler-sandbox card-glass">
        <div className="sandbox-header">
          <h3 className="text-md font-bold text-white flex items-center gap-2">
            <Sliders size={18} className="text-indigo-400" />
            Re-render Trigger Controls (Parent Component State)
          </h3>
          <span className={`status-pill ${isOptimized ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
            {isOptimized ? 'Optimized Mode: Props memoized' : 'Un-optimized: Inline references cascade renders'}
          </span>
        </div>

        <div className="sandbox-controls-grid">
          {/* Action 1: Parent Counter */}
          <div className="sandbox-control-box">
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              1. Mutate Parent State (Counter: <strong>{parentCounter}</strong>)
            </label>
            <button
              className="btn-secondary w-full"
              onClick={() => setParentCounter(c => c + 1)}
            >
              <RefreshCw size={14} />
              Trigger Parent Re-render (+1)
            </button>
          </div>

          {/* Action 2: Rapid Typing */}
          <div className="sandbox-control-box">
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              2. Rapid Parent Typing (Keystrokes trigger parent render)
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Type quickly to watch child render counts..."
              value={parentSearch}
              onChange={(e) => setParentSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Real-time explanation banner */}
        <div className={`explanation-alert ${isOptimized ? 'alert-success' : 'alert-warning'}`}>
          {isOptimized ? (
            <p>
              🎉 <strong>Optimized Mode:</strong> Notice the "Renders:" badge on each task card below <strong>does NOT increment</strong> when you click the parent counter or type into the input! <code>React.memo</code> skipped re-rendering because props &amp; callbacks stayed identical.
            </p>
          ) : (
            <p>
              ⚠️ <strong>Un-optimized Mode:</strong> Every time you type a letter or click the counter, <strong>ALL 6 child task cards re-render</strong> (watch the "Renders: N" badges count up rapidly), causing unnecessary CPU cycles!
            </p>
          )}
        </div>
      </div>

      {/* Task Cards Grid with live render count badges */}
      <div className="tasks-grid mt-6">
        {tasks.map(task => (
          isOptimized ? (
            <TaskCardMemo
              key={task.id}
              task={task}
              onToggleStatus={optimizedToggle}
              isOptimized={true}
            />
          ) : (
            <TaskCardRaw
              key={task.id}
              task={task}
              onToggleStatus={unoptimizedToggle}
              isOptimized={false}
            />
          )
        ))}
      </div>

      {/* DevTools Profiler Analysis Report Box */}
      <div className="profiler-doc-card card-glass mt-8">
        <div className="doc-header flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
            <Flame size={20} className="text-amber-400" />
            React DevTools Profiler Analysis &amp; Documentation
          </h3>
        </div>

        <div className="doc-content-grid">
          <div className="doc-column">
            <h4 className="text-sm font-semibold text-rose-400 mb-2">1. The Problem Identified in Profiler:</h4>
            <ul className="doc-list text-xs text-slate-300">
              <li>• <strong>Why it rendered:</strong> "The parent component rendered" or "Props changed: onToggleStatus".</li>
              <li>• In default React, whenever a parent component updates state (e.g. typing in a search bar), React re-executes all child components recursively.</li>
              <li>• Passing an inline callback <code>(id) =&gt; handleToggle(id)</code> generates a new function memory reference on every render, invalidating shallow prop comparisons.</li>
            </ul>
          </div>

          <div className="doc-column">
            <h4 className="text-sm font-semibold text-emerald-400 mb-2">2. The Solution &amp; Fix:</h4>
            <ul className="doc-list text-xs text-slate-300">
              <li>• <strong>Step 1:</strong> Wrap child component with <code>React.memo(TaskCard)</code> to perform shallow prop comparison before re-rendering.</li>
              <li>• <strong>Step 2:</strong> Wrap event handlers with <code>useCallback(fn, [deps])</code> to preserve reference equality across renders.</li>
              <li>• <strong>Result:</strong> Flamegraph shows grey bars ("Did not render") for untouched children during parent typing, drastically reducing frame drops.</li>
            </ul>
          </div>
        </div>

        {/* Code Diff Visualizer */}
        <div className="code-diff-box mt-4">
          <div className="diff-header">
            <FileCode size={14} className="text-indigo-400" />
            <span>Optimization Code Implementation</span>
          </div>
          <pre className="code-block">
            <code>{`// ❌ BEFORE (Un-optimized): Child re-renders on EVERY parent state update
function TasksParent() {
  const [filter, setFilter] = useState('');
  const handleToggle = (id) => { ... }; // New function reference every render!
  return <TaskCard task={task} onToggle={handleToggle} />;
}

// ✅ AFTER (Optimized with React.memo & useCallback):
const TaskCard = React.memo(function TaskCard({ task, onToggle }) {
  return <div>{task.title}</div>;
});

function TasksParent() {
  const [filter, setFilter] = useState('');
  const handleToggle = useCallback((id) => { ... }, []); // Stable reference!
  return <TaskCard task={task} onToggle={handleToggle} />;
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
