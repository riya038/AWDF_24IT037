import React, { useState, useEffect } from 'react';
import {
  FolderKanban,
  CheckCircle,
  Clock,
  Users,
  Calendar,
  Layers,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { notifyChunkLoaded } from '../utils/lazyWithDelay';

const SAMPLE_PROJECTS = [
  {
    id: 1,
    name: 'Frontend Performance Refactoring',
    client: 'CHARUSAT DEPSTAR Lab',
    category: 'Optimization',
    progress: 88,
    status: 'In Progress',
    deadline: 'Oct 15, 2026',
    members: ['Alex M.', 'Sarah C.', 'Liam K.'],
    budget: '$12,400',
    tasksTotal: 24,
    tasksDone: 21,
    description: 'Deconstruct monolithic bundle into route-based dynamic chunks with React.lazy and Suspense.'
  },
  {
    id: 2,
    name: 'Enterprise Cloud Migration',
    client: 'FinTech Global Systems',
    category: 'Infrastructure',
    progress: 100,
    status: 'Completed',
    deadline: 'Sept 10, 2026',
    members: ['Elena R.', 'David B.'],
    budget: '$45,000',
    tasksTotal: 38,
    tasksDone: 38,
    description: 'Migrating legacy on-premise compute engines to Kubernetes microservices with zero downtime.'
  },
  {
    id: 3,
    name: 'Real-time WebSocket Collaborative Whiteboard',
    client: 'NextGen EdTech',
    category: 'Full-Stack',
    progress: 65,
    status: 'In Progress',
    deadline: 'Nov 02, 2026',
    members: ['Sarah C.', 'Aisha P.', 'Tom H.'],
    budget: '$28,500',
    tasksTotal: 18,
    tasksDone: 12,
    description: 'Low-latency canvas drawing synchronization with operational transformations and Redis pub/sub.'
  },
  {
    id: 4,
    name: 'AI Agent Diagnostics Portal',
    client: 'HealthCare AI Labs',
    category: 'AI / ML',
    progress: 42,
    status: 'Planning',
    deadline: 'Dec 05, 2026',
    members: ['Alex M.', 'Aisha P.'],
    budget: '$34,000',
    tasksTotal: 30,
    tasksDone: 13,
    description: 'LLM-powered triage diagnostics assistant integrating with HIPAA-compliant medical records.'
  }
];

export default function Projects() {
  const [projects, setProjects] = useState(SAMPLE_PROJECTS);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    // Notify telemetry tracker that the Projects chunk was successfully evaluated
    notifyChunkLoaded('Projects.chunk.js');
  }, []);

  const filteredProjects = projects.filter(p => {
    if (filter === 'All') return true;
    return p.status === filter;
  });

  return (
    <div className="page-container">
      {/* Page Header with Lazy Chunk Banner */}
      <div className="page-header">
        <div>
          <div className="badge-lazy-chunk">
            <Sparkles size={14} className="text-amber-400" />
            <span>Lazy-Loaded Chunk: <code>assets/Projects-[hash].js</code></span>
          </div>
          <h1 className="page-title">Enterprise Projects Portfolio</h1>
          <p className="page-subtitle">
            This entire route component was dynamically split and downloaded only when you navigated to <code>/projects</code>.
          </p>
        </div>

        <div className="chunk-stat-pill">
          <Layers size={16} className="text-indigo-400" />
          <span>Chunk Size: <strong>~38.2 KB</strong> (Deferred from initial bundle)</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="project-filter-bar card-glass">
        <div className="filter-group">
          {['All', 'In Progress', 'Completed', 'Planning'].map((status) => (
            <button
              key={status}
              className={`filter-tab ${filter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="project-quick-stats">
          <span className="text-sm text-slate-300">
            Showing <strong>{filteredProjects.length}</strong> active projects
          </span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((proj) => (
          <div key={proj.id} className="project-card card-glass">
            <div className="project-card-top">
              <div className="project-badge-row">
                <span className="badge-category">{proj.category}</span>
                <span className={`badge-status ${proj.status.toLowerCase().replace(' ', '-')}`}>
                  {proj.status}
                </span>
              </div>
              <h3 className="project-name">{proj.name}</h3>
              <p className="project-client text-xs text-muted">Client: {proj.client}</p>
            </div>

            <p className="project-desc">{proj.description}</p>

            {/* Progress Bar */}
            <div className="project-progress-section">
              <div className="progress-labels">
                <span className="text-xs text-slate-400">Sprint Progress</span>
                <span className="text-xs font-bold text-indigo-300">{proj.progress}%</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${proj.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Meta Footer */}
            <div className="project-footer">
              <div className="project-meta-item">
                <Calendar size={13} className="text-slate-400" />
                <span className="text-xs">{proj.deadline}</span>
              </div>
              <div className="project-meta-item">
                <Users size={13} className="text-slate-400" />
                <span className="text-xs">{proj.members.length} members</span>
              </div>
              <div className="project-budget">
                <span className="text-xs text-emerald-400 font-bold">{proj.budget}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
