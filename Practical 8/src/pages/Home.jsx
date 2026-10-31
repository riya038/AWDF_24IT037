import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Layers,
  ArrowRight,
  TrendingDown,
  Clock,
  ShieldCheck,
  Cpu,
  Split,
  FolderKanban,
  Mail,
  BarChart3,
  CheckCircle2,
  FileCode2,
  Gauge
} from 'lucide-react';

export default function Home({ onOpenMetricsModal }) {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={14} className="text-amber-400" />
          </div>

          <h1 className="hero-title">
            Performance Optimization &amp; <br />
            <span className="gradient-text">Route-Based Lazy Loading</span>
          </h1>

          <p className="hero-description">
            Demonstrating how <code>React.lazy()</code>, dynamic <code>import()</code>, and <code>&lt;Suspense&gt;</code> split a monolithic single-bundle React application into lean, on-demand downloaded chunks.
          </p>

          <div className="hero-cta-group">
            <Link to="/projects" className="btn-primary">
              <FolderKanban size={18} />
              <span>Visit Lazy Route: /projects</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-secondary">
              <Mail size={18} />
              <span>Visit Lazy Route: /contact</span>
            </Link>
            <button className="btn-accent" onClick={onOpenMetricsModal}>
              <Gauge size={18} />
              <span>View Before / After Metrics</span>
            </button>
          </div>
        </div>

        {/* Quick Performance Card */}
        <div className="hero-stat-card card-glass">
          <div className="stat-card-header">
            <span className="stat-card-tag">Optimization Results</span>
            <span className="stat-card-badge text-emerald-400">-62.5% Initial Bundle</span>
          </div>

          <div className="metric-compare-grid">
            <div className="metric-box before">
              <span className="metric-label">Monolithic Bundle (Before)</span>
              <span className="metric-val text-rose-400">386.4 KB</span>
              <span className="metric-sub">Everything loaded upfront</span>
            </div>
            <div className="metric-box after">
              <span className="metric-label">Initial Entry (After Split)</span>
              <span className="metric-val text-emerald-400">144.8 KB</span>
              <span className="metric-sub">Down by 241.6 KB (Gzipped)</span>
            </div>
          </div>

          <div className="stat-features-list">
            <div className="stat-feature-item">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span><strong>Projects chunk:</strong> ~38.2 KB (deferred until /projects)</span>
            </div>
            <div className="stat-feature-item">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span><strong>Contact chunk:</strong> ~24.6 KB (deferred until /contact)</span>
            </div>
            <div className="stat-feature-item">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span><strong>Heavy Chart chunk:</strong> ~78.4 KB (deferred until clicked)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture & Flow Diagram */}
      <section className="section-block">
        <div className="section-header">
          <div className="badge-section">
            <Layers size={14} className="text-indigo-400" />
            <span>Architecture &amp; Mechanism</span>
          </div>
          <h2 className="section-title">Single Bundle vs Code-Split Architecture</h2>
          <p className="section-subtitle">
            How Vite Rollup bundler extracts code into asynchronous chunks triggered via React.lazy().
          </p>
        </div>

        <div className="arch-diagram-grid">
          {/* Before */}
          <div className="arch-card before-arch">
            <div className="arch-header">
              <span className="arch-pill bg-rose-500/20 text-rose-300">Before: Monolithic Bundle</span>
              <span className="text-xs text-muted">High TTI &amp; FCP delay</span>
            </div>
            <div className="arch-box main-large">
              <div className="arch-box-title">main.bundle.js (386 KB)</div>
              <div className="arch-internal-bundle">
                <span className="bundle-tag">[Home]</span>
                <span className="bundle-tag">[Tasks]</span>
                <span className="bundle-tag text-rose-300">[Projects (Heavy)]</span>
                <span className="bundle-tag text-rose-300">[Contact]</span>
                <span className="bundle-tag text-rose-300">[HeavyChart Library]</span>
              </div>
            </div>
            <p className="arch-caption text-rose-300/80">
              ❌ User on slow connection must wait for all 386 KB to download and parse before seeing ANY page.
            </p>
          </div>

          {/* After */}
          <div className="arch-card after-arch">
            <div className="arch-header">
              <span className="arch-pill bg-emerald-500/20 text-emerald-300">After: On-Demand Lazy Chunks</span>
              <span className="text-xs text-muted">Instant First Paint</span>
            </div>
            <div className="arch-box-tree">
              <div className="arch-box entry-small">
                <span className="font-bold text-indigo-300">main.js (144.8 KB)</span>
                <span className="text-xs text-slate-400">Loads first visit</span>
              </div>
              <div className="arch-arrows-group">
                <div className="arch-branch">
                  <span className="branch-arrow">└──►</span>
                  <div className="chunk-box">
                    <strong>Projects.chunk.js (38.2 KB)</strong>
                    <span className="text-xs text-slate-400">Loaded only on /projects</span>
                  </div>
                </div>
                <div className="arch-branch">
                  <span className="branch-arrow">└──►</span>
                  <div className="chunk-box">
                    <strong>Contact.chunk.js (24.6 KB)</strong>
                    <span className="text-xs text-slate-400">Loaded only on /contact</span>
                  </div>
                </div>
                <div className="arch-branch">
                  <span className="branch-arrow">└──►</span>
                  <div className="chunk-box">
                    <strong>HeavyChart.chunk.js (78.4 KB)</strong>
                    <span className="text-xs text-slate-400">Loaded only on /analytics</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="arch-caption text-emerald-300/80">
              ✅ Browser only downloads code for active screen. Remaining chunks download seamlessly in background when navigated.
            </p>
          </div>
        </div>
      </section>

      {/* Practical Requirements & Covered Objectives */}
      <section className="section-block">
        <div className="section-header">
          <div className="badge-section">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Practical Objectives &amp; Supplementary Solutions</span>
          </div>
          <h2 className="section-title">Verified Practical Requirements</h2>
        </div>

        <div className="objectives-grid">
          <div className="objective-card">
            <div className="obj-icon bg-indigo-500/20 text-indigo-400">
              <Split size={20} />
            </div>
            <h3>1. Route-Based Code Splitting</h3>
            <p>
              Applied <code>React.lazy()</code> &amp; <code>&lt;Suspense&gt;</code> to <code>/projects</code> and <code>/contact</code> routes.
            </p>
            <Link to="/projects" className="obj-link">Test /projects chunk →</Link>
          </div>

          <div className="objective-card">
            <div className="obj-icon bg-purple-500/20 text-purple-400">
              <BarChart3 size={20} />
            </div>
            <h3>2. Heavy Third-Party Lazy Chunk</h3>
            <p>
              (Supplementary 1) Component-level lazy loading of <code>HeavyChart</code> data visualizer inside <code>/analytics</code>.
            </p>
            <Link to="/analytics" className="obj-link">Test HeavyChart chunk →</Link>
          </div>

          <div className="objective-card">
            <div className="obj-icon bg-amber-500/20 text-amber-400">
              <Clock size={20} />
            </div>
            <h3>3. Minimum-Delay Fallback (300ms)</h3>
            <p>
              (Supplementary 2) Prevents annoying UI flicker on ultra-fast networks via custom <code>lazyWithMinDelay()</code> wrapper.
            </p>
            <span className="obj-link text-amber-400">Switch via Telemetry Toolbar ↑</span>
          </div>

          <div className="objective-card">
            <div className="obj-icon bg-emerald-500/20 text-emerald-400">
              <Cpu size={20} />
            </div>
            <h3>4. DevTools Profiler &amp; Re-renders</h3>
            <p>
              (Supplementary 3) Interactive lab documenting unnecessary re-render causes and resolution with <code>React.memo</code> &amp; <code>useCallback</code>.
            </p>
            <Link to="/profiler-demo" className="obj-link">Open Profiler Lab →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
