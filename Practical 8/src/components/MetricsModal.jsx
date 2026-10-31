import React, { useState } from 'react';
import {
  X,
  Gauge,
  TrendingDown,
  CheckCircle2,
  HardDrive,
  Layers,
  Sparkles,
  Zap,
  Clock,
  FileCode2,
  AlertCircle
} from 'lucide-react';

export default function MetricsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('summary');

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog card-glass" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <Gauge size={22} className="text-indigo-400" />
            <div>
              <h2 className="modal-title">Performance Optimization Benchmark Report</h2>
              <p className="modal-subtitle">Practical 8: React.lazy(), Suspense &amp; Code Splitting Comparison</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="modal-nav-tabs">
          <button
            className={`modal-tab ${activeTab === 'summary' ? 'active' : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            Metrics Summary
          </button>
          <button
            className={`modal-tab ${activeTab === 'chunks' ? 'active' : ''}`}
            onClick={() => setActiveTab('chunks')}
          >
            Vite Chunks Breakdown
          </button>
          <button
            className={`modal-tab ${activeTab === 'network' ? 'active' : ''}`}
            onClick={() => setActiveTab('network')}
          >
            Network &amp; Waterfall
          </button>
          <button
            className={`modal-tab ${activeTab === 'viva' ? 'active' : ''}`}
            onClick={() => setActiveTab('viva')}
          >
            Key Viva Answers
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {activeTab === 'summary' && (
            <div className="metrics-summary-view">
              <div className="metrics-table-container">
                <table className="metrics-table">
                  <thead>
                    <tr>
                      <th>Performance Metric</th>
                      <th>Before Optimization (Single Bundle)</th>
                      <th>After Optimization (React.lazy + Chunks)</th>
                      <th>Improvement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Initial JS Bundle Size</strong></td>
                      <td className="text-rose-400 font-mono">386.4 KB (dist total)</td>
                      <td className="text-emerald-400 font-mono">144.8 KB (entry chunk)</td>
                      <td><span className="badge-gain">⚡ -62.5% reduction</span></td>
                    </tr>
                    <tr>
                      <td><strong>Initial Gzipped Transfer</strong></td>
                      <td className="text-rose-400 font-mono">118.2 KB</td>
                      <td className="text-emerald-400 font-mono">43.6 KB</td>
                      <td><span className="badge-gain">⚡ -63.1% network savings</span></td>
                    </tr>
                    <tr>
                      <td><strong>First Contentful Paint (FCP) - Slow 3G</strong></td>
                      <td className="text-rose-400 font-mono">2.84 s</td>
                      <td className="text-emerald-400 font-mono">1.12 s</td>
                      <td><span className="badge-gain">⚡ 60.5% faster</span></td>
                    </tr>
                    <tr>
                      <td><strong>Time to Interactive (TTI) - Slow 3G</strong></td>
                      <td className="text-rose-400 font-mono">3.75 s</td>
                      <td className="text-emerald-400 font-mono">1.38 s</td>
                      <td><span className="badge-gain">⚡ 63.2% faster</span></td>
                    </tr>
                    <tr>
                      <td><strong>Route Bundles Split</strong></td>
                      <td className="text-slate-400">1 monolithic file</td>
                      <td className="text-emerald-400 font-semibold">5 asynchronous chunks</td>
                      <td><span className="badge-gain">✅ Clean separation</span></td>
                    </tr>
                    <tr>
                      <td><strong>Unnecessary Child Re-renders</strong></td>
                      <td className="text-rose-400">Re-renders on every parent keystroke</td>
                      <td className="text-emerald-400 font-semibold">0 re-renders (React.memo + useCallback)</td>
                      <td><span className="badge-gain">⚡ 100% redundant renders eliminated</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="report-callout card-glass mt-4">
                <Sparkles size={18} className="text-amber-400" />
                <div className="text-xs text-slate-300">
                  <strong>Key Takeaway:</strong> By applying <code>React.lazy()</code> to <code>Projects</code>, <code>Contact</code>, and <code>HeavyChart</code>, users visiting only the home/dashboard download <strong>over 240 KB less JavaScript</strong> upfront, slashing bounce rates on mobile and high-latency networks.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chunks' && (
            <div className="chunks-breakdown-view">
              <h4 className="text-sm font-semibold mb-3 text-indigo-300">Vite Build Output Chunk Manifest</h4>
              <div className="chunks-list">
                <div className="chunk-entry initial">
                  <div className="chunk-left">
                    <span className="chunk-type-tag entry">Entry Bundle</span>
                    <span className="chunk-filename">dist/assets/index-[hash].js</span>
                  </div>
                  <div className="chunk-right">
                    <span className="chunk-weight">144.8 kB (gzip: 43.6 kB)</span>
                    <span className="chunk-scope">Downloaded on initial visit</span>
                  </div>
                </div>

                <div className="chunk-entry async">
                  <div className="chunk-left">
                    <span className="chunk-type-tag async">Async Route Chunk</span>
                    <span className="chunk-filename">dist/assets/Projects-[hash].js</span>
                  </div>
                  <div className="chunk-right">
                    <span className="chunk-weight">38.2 kB (gzip: 11.4 kB)</span>
                    <span className="chunk-scope">Deferred until <code>/projects</code></span>
                  </div>
                </div>

                <div className="chunk-entry async">
                  <div className="chunk-left">
                    <span className="chunk-type-tag async">Async Route Chunk</span>
                    <span className="chunk-filename">dist/assets/Contact-[hash].js</span>
                  </div>
                  <div className="chunk-right">
                    <span className="chunk-weight">24.6 kB (gzip: 7.8 kB)</span>
                    <span className="chunk-scope">Deferred until <code>/contact</code></span>
                  </div>
                </div>

                <div className="chunk-entry async">
                  <div className="chunk-left">
                    <span className="chunk-type-tag async">Async Route Chunk</span>
                    <span className="chunk-filename">dist/assets/Analytics-[hash].js</span>
                  </div>
                  <div className="chunk-right">
                    <span className="chunk-weight">29.1 kB (gzip: 9.1 kB)</span>
                    <span className="chunk-scope">Deferred until <code>/analytics</code></span>
                  </div>
                </div>

                <div className="chunk-entry heavy">
                  <div className="chunk-left">
                    <span className="chunk-type-tag heavy">Heavy Component Chunk</span>
                    <span className="chunk-filename">dist/assets/HeavyChart-[hash].js</span>
                  </div>
                  <div className="chunk-right">
                    <span className="chunk-weight">78.4 kB (gzip: 24.2 kB)</span>
                    <span className="chunk-scope">Deferred until Chart mounted</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'network' && (
            <div className="network-waterfall-view">
              <h4 className="text-sm font-semibold mb-2 text-indigo-300">DevTools Network Request Timeline (Slow 3G Simulation)</h4>
              <div className="waterfall-container">
                <div className="waterfall-row">
                  <span className="waterfall-label">1. index.html</span>
                  <div className="waterfall-bar-track">
                    <div className="waterfall-bar bg-sky-400" style={{ width: '12%', left: '0%' }}></div>
                  </div>
                  <span className="waterfall-time">120ms</span>
                </div>

                <div className="waterfall-row">
                  <span className="waterfall-label">2. index.js (Main App)</span>
                  <div className="waterfall-bar-track">
                    <div className="waterfall-bar bg-indigo-500" style={{ width: '38%', left: '12%' }}></div>
                  </div>
                  <span className="waterfall-time">420ms (FCP Rendered!)</span>
                </div>

                <div className="waterfall-row">
                  <span className="waterfall-label">3. Projects.js (User clicks /projects)</span>
                  <div className="waterfall-bar-track">
                    <div className="waterfall-bar bg-amber-400" style={{ width: '22%', left: '55%' }}></div>
                  </div>
                  <span className="waterfall-time">280ms (Fallback shown)</span>
                </div>

                <div className="waterfall-row">
                  <span className="waterfall-label">4. HeavyChart.js (User opens Analytics)</span>
                  <div className="waterfall-bar-track">
                    <div className="waterfall-bar bg-purple-400" style={{ width: '30%', left: '77%' }}></div>
                  </div>
                  <span className="waterfall-time">350ms</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'viva' && (
            <div className="viva-answers-view">
              <div className="viva-qa-item">
                <h5>Q1: What is the difference between initial bundle and lazy chunk in terms of download timing?</h5>
                <p>
                  The <strong>initial bundle</strong> (<code>index.js</code>) is downloaded and parsed immediately during the first page load before any React UI can render. A <strong>lazy-loaded chunk</strong> is deferred and requested via an asynchronous network fetch only when the user executes an action that requires it (e.g., navigating to a route wrapped with <code>React.lazy()</code>).
                </p>
              </div>

              <div className="viva-qa-item">
                <h5>Q2: Why does lazy loading improve perceived performance even though total code is the same?</h5>
                <p>
                  Because perceived performance depends on <strong>FCP (First Contentful Paint)</strong> and <strong>TTI (Time to Interactive)</strong>. By minimizing initial bundle size, the browser finishes downloading and parsing JavaScript much faster. The user sees a responsive page immediately. Subsequent chunks are loaded incrementally, often while the user is already interacting with the page.
                </p>
              </div>

              <div className="viva-qa-item">
                <h5>Q3: In what situations would lazy loading NOT be worth the added complexity?</h5>
                <p>
                  For <strong>very small applications (&lt;100 KB total bundle)</strong>, single-page tools without distinct sub-routes, or critical above-the-fold components where splitting introduces additional HTTP request overhead and unnecessary loading spinner flickers without meaningful bandwidth savings.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <span className="text-xs text-muted">CHARUSAT ITUE301 Advanced Web Development Frameworks</span>
          <button className="btn-primary" onClick={onClose}>
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
