import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, PieChart, Activity, Zap, Layers, RefreshCw } from 'lucide-react';

/**
 * HeavyChart component - Fulfills Supplementary Problem 1:
 * "Lazy load a heavy third-party component (e.g., a chart library) only when a specific page needs it."
 * 
 * Simulates heavy mathematical computation, large rendering dataset, and rich interactive visual charts.
 */
export default function HeavyChart({ category = 'All' }) {
  const [activeTab, setActiveTab] = useState('velocity');
  const [dataPoints, setDataPoints] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);

  // Simulate heavy initial computational work
  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => {
      // Generate large analytical data series
      const sample = Array.from({ length: 12 }, (_, i) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const completed = Math.floor(Math.random() * 45) + 20;
        const target = completed + Math.floor(Math.random() * 20) - 5;
        const velocity = Math.floor((completed / (target || 1)) * 100);
        return {
          month: months[i],
          completed,
          target,
          velocity,
          bugsResolved: Math.floor(Math.random() * 30) + 10,
        };
      });
      setDataPoints(sample);
      setIsCalculating(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [category]);

  const maxCompleted = Math.max(...dataPoints.map(d => d.completed), 60);

  return (
    <div className="heavy-chart-wrapper card-glass">
      <div className="chart-header">
        <div className="chart-title-group">
          <div className="badge-heavy">
            <Zap size={14} className="text-amber-400" />
            <span>Heavy Chunk Component</span>
          </div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <BarChart3 className="text-indigo-400" size={22} />
            Interactive Performance & Velocity Analytics
          </h3>
          <p className="text-sm text-muted">
            Simulates a heavy 150KB chart library (Chart.js / D3 / Recharts) loaded strictly on-demand via dynamic <code>import()</code>.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="chart-tabs">
          <button
            className={`tab-btn ${activeTab === 'velocity' ? 'active' : ''}`}
            onClick={() => setActiveTab('velocity')}
          >
            <TrendingUp size={16} />
            Velocity Trend
          </button>
          <button
            className={`tab-btn ${activeTab === 'completion' ? 'active' : ''}`}
            onClick={() => setActiveTab('completion')}
          >
            <BarChart3 size={16} />
            Sprint Completion
          </button>
          <button
            className={`tab-btn ${activeTab === 'breakdown' ? 'active' : ''}`}
            onClick={() => setActiveTab('breakdown')}
          >
            <PieChart size={16} />
            Task Types
          </button>
        </div>
      </div>

      {isCalculating ? (
        <div className="chart-calculating">
          <RefreshCw className="animate-spin text-indigo-400" size={28} />
          <span>Rendering data visualization matrices...</span>
        </div>
      ) : (
        <div className="chart-body">
          {/* Velocity Trend Spline SVG */}
          {activeTab === 'velocity' && (
            <div className="svg-chart-container">
              <div className="chart-stats-summary">
                <div className="stat-pill">
                  <span className="stat-label">Avg Velocity:</span>
                  <span className="stat-value text-indigo-400">92.4%</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-label">Peak Performance:</span>
                  <span className="stat-value text-emerald-400">114% (Oct)</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-label">Data Points:</span>
                  <span className="stat-value text-amber-400">1,240 events</span>
                </div>
              </div>

              <svg viewBox="0 0 700 240" className="w-full h-56 chart-svg">
                <defs>
                  <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="50%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                {[40, 90, 140, 190].map((y, idx) => (
                  <line key={idx} x1="40" y1={y} x2="680" y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
                ))}

                {/* Area Gradient */}
                {dataPoints.length > 0 && (
                  <path
                    d={`M 50 200 ` + dataPoints.map((d, i) => {
                      const x = 50 + (i * 55);
                      const y = 200 - ((d.velocity / 130) * 160);
                      return `L ${x} ${y}`;
                    }).join(' ') + ` L ${50 + (dataPoints.length - 1) * 55} 200 Z`}
                    fill="url(#velocityGrad)"
                  />
                )}

                {/* Line Path */}
                {dataPoints.length > 0 && (
                  <path
                    d={`M 50 ${200 - ((dataPoints[0]?.velocity / 130) * 160)} ` + dataPoints.map((d, i) => {
                      const x = 50 + (i * 55);
                      const y = 200 - ((d.velocity / 130) * 160);
                      return `L ${x} ${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="url(#lineGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                )}

                {/* Dots & Labels */}
                {dataPoints.map((d, i) => {
                  const x = 50 + (i * 55);
                  const y = 200 - ((d.velocity / 130) * 160);
                  return (
                    <g key={i} className="chart-point-group">
                      <circle cx={x} cy={y} r="5" fill="#6366F1" stroke="#fff" strokeWidth="2" />
                      <text x={x} y="225" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="sans-serif">
                        {d.month}
                      </text>
                      <text x={x} y={y - 10} textAnchor="middle" fill="#E2E8F0" fontSize="10" fontWeight="bold">
                        {d.velocity}%
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          )}

          {/* Sprint Completion Bar Chart */}
          {activeTab === 'completion' && (
            <div className="bar-chart-container">
              <div className="bar-columns-grid">
                {dataPoints.map((d, i) => {
                  const heightPercent = Math.min(100, Math.round((d.completed / maxCompleted) * 100));
                  return (
                    <div key={i} className="bar-column">
                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{ height: `${heightPercent}%` }}
                          title={`Completed: ${d.completed} tasks`}
                        >
                          <span className="bar-tooltip">{d.completed}</span>
                        </div>
                      </div>
                      <span className="bar-month-label">{d.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Task Types Donut Breakdown */}
          {activeTab === 'breakdown' && (
            <div className="donut-grid">
              <div className="donut-visual">
                <svg viewBox="0 0 200 200" className="donut-svg">
                  <circle cx="100" cy="100" r="70" fill="transparent" stroke="#1E293B" strokeWidth="22" />
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="transparent"
                    stroke="#6366F1"
                    strokeWidth="22"
                    strokeDasharray="180 260"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="transparent"
                    stroke="#10B981"
                    strokeWidth="22"
                    strokeDasharray="120 320"
                    strokeDashoffset="-185"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="transparent"
                    stroke="#F59E0B"
                    strokeWidth="22"
                    strokeDasharray="90 350"
                    strokeDashoffset="-310"
                  />
                  <text x="100" y="95" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="bold">482</text>
                  <text x="100" y="115" textAnchor="middle" fill="#94A3B8" fontSize="11">Total Tasks</text>
                </svg>
              </div>

              <div className="breakdown-legend">
                <div className="legend-item">
                  <span className="legend-dot bg-indigo-500"></span>
                  <div className="legend-text">
                    <strong>Frontend & UI Features</strong>
                    <p>218 tasks (45%)</p>
                  </div>
                </div>
                <div className="legend-item">
                  <span className="legend-dot bg-emerald-500"></span>
                  <div className="legend-text">
                    <strong>API & Backend Microservices</strong>
                    <p>154 tasks (32%)</p>
                  </div>
                </div>
                <div className="legend-item">
                  <span className="legend-dot bg-amber-500"></span>
                  <div className="legend-text">
                    <strong>Code Splitting & Optimization</strong>
                    <p>110 tasks (23%)</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
