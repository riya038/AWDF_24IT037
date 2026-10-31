import React, { useState, useEffect, Suspense } from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Layers,
  Sparkles,
  Zap,
  Activity,
  CheckCircle2,
  FileText,
  DownloadCloud
} from 'lucide-react';
import { lazyWithMinDelay, notifyChunkLoaded } from '../utils/lazyWithDelay';
import FallbackSkeleton from '../components/FallbackSkeleton';

// Component-Level Lazy Loading (Fulfills Supplementary Problem 1)
const LazyHeavyChart = lazyWithMinDelay(() => {
  notifyChunkLoaded('HeavyChart.chunk.js');
  return import('../components/HeavyChart');
}, 300);

export default function Analytics() {
  const [showChart, setShowChart] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    notifyChunkLoaded('Analytics.chunk.js');
  }, []);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="badge-lazy-chunk">
            <Sparkles size={14} className="text-amber-400" />
            <span>Supplementary Problem 1: Component-Level Dynamic Import</span>
          </div>
          <h1 className="page-title">Analytics &amp; Resource Telemetry</h1>
          <p className="page-subtitle">
            Demonstrating component-level lazy loading: The heavy <code>HeavyChart</code> component below is bundled as an isolated chunk and fetched asynchronously.
          </p>
        </div>

        <div className="chunk-stat-pill">
          <Layers size={16} className="text-indigo-400" />
          <span>Heavy Chart Chunk: <strong>~78.4 KB</strong> (Deferred)</span>
        </div>
      </div>

      {/* Analytics KPI Stat Cards */}
      <div className="analytics-kpi-grid">
        <div className="kpi-card card-glass">
          <div className="kpi-header">
            <span className="kpi-title">Total Tasks Tracked</span>
            <Activity size={18} className="text-indigo-400" />
          </div>
          <div className="kpi-value">1,482</div>
          <div className="kpi-trend text-emerald-400">
            <TrendingUp size={14} />
            <span>+18.4% from last sprint</span>
          </div>
        </div>

        <div className="kpi-card card-glass">
          <div className="kpi-header">
            <span className="kpi-title">Average Sprint Velocity</span>
            <Zap size={18} className="text-amber-400" />
          </div>
          <div className="kpi-value">92.6%</div>
          <div className="kpi-trend text-emerald-400">
            <TrendingUp size={14} />
            <span>Top 5% team percentile</span>
          </div>
        </div>

        <div className="kpi-card card-glass">
          <div className="kpi-header">
            <span className="kpi-title">Page Chunks Split</span>
            <Layers size={18} className="text-purple-400" />
          </div>
          <div className="kpi-value">4 Chunks</div>
          <div className="kpi-trend text-indigo-300">
            <span>62% initial load reduction</span>
          </div>
        </div>
      </div>

      {/* Lazy Component Section */}
      <div className="lazy-component-showcase">
        <div className="showcase-controls card-glass">
          <div className="showcase-info">
            <h3 className="text-md font-bold text-white flex items-center gap-2">
              <DownloadCloud size={18} className="text-indigo-400" />
              Heavy Component Code Splitting Sandbox
            </h3>
            <p className="text-xs text-muted">
              Toggle component visibility to verify dynamic import triggering in Network tab.
            </p>
          </div>

          <div className="showcase-actions">
            <button
              className={`btn-toggle ${showChart ? 'active' : ''}`}
              onClick={() => setShowChart(!showChart)}
            >
              {showChart ? 'Unmount Heavy Component' : 'Mount & Lazy Load HeavyChart'}
            </button>
          </div>
        </div>

        {/* Suspense Wrapper around Component-level Lazy Chunk */}
        {showChart ? (
          <Suspense fallback={<FallbackSkeleton pageName="HeavyChart (Data Visualization Engine)" />}>
            <LazyHeavyChart category={selectedCategory} />
          </Suspense>
        ) : (
          <div className="unmounted-placeholder card-glass">
            <p className="text-muted">
              <code>&lt;HeavyChart /&gt;</code> is currently unmounted. Click the button above to dynamically import and render it inside <code>&lt;Suspense&gt;</code>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
