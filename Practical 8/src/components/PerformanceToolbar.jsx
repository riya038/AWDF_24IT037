import React, { useState, useEffect } from 'react';
import { Gauge, Wifi, Zap, Clock, Info, Check, Layers, HardDrive } from 'lucide-react';
import { setGlobalSimulatedDelay, getGlobalSimulatedDelay, subscribeToChunkLoads } from '../utils/lazyWithDelay';

export default function PerformanceToolbar({ onOpenMetricsModal }) {
  const [currentDelay, setCurrentDelay] = useState(getGlobalSimulatedDelay());
  const [loadedChunks, setLoadedChunks] = useState(new Set(['Main Entry', 'React Vendor', 'Home Page']));

  useEffect(() => {
    const unsubscribe = subscribeToChunkLoads((chunkName) => {
      setLoadedChunks((prev) => new Set([...prev, chunkName]));
    });
    return unsubscribe;
  }, []);

  const handleDelayChange = (ms) => {
    setCurrentDelay(ms);
    setGlobalSimulatedDelay(ms);
  };

  return (
    <div className="perf-toolbar">
      <div className="perf-toolbar-container">
        {/* Left Side: Optimization Title */}
        <div className="perf-title-group">
          <div className="perf-pulse-dot"></div>
          <span className="perf-badge-label">
            <Gauge size={14} className="text-indigo-400" />
            <span>Practical 8 Telemetry</span>
          </span>
          <span className="perf-mode-tag">React.lazy() & Suspense Active</span>
        </div>

        {/* Middle: Latency Simulation / Min Delay Switcher */}
        <div className="perf-delay-controls">
          <span className="perf-control-label">
            <Wifi size={13} /> Throttling Simulation:
          </span>
          <div className="button-group">
            <button
              className={`perf-btn ${currentDelay === 0 ? 'active' : ''}`}
              onClick={() => handleDelayChange(0)}
              title="Instant loading on fast connection"
            >
              <Zap size={13} /> Fast / 0ms
            </button>
            <button
              className={`perf-btn ${currentDelay === 300 ? 'active' : ''}`}
              onClick={() => handleDelayChange(300)}
              title="Minimum 300ms Delay to avoid flickering (Supplementary Problem 2)"
            >
              <Clock size={13} /> 300ms Min-Delay
            </button>
            <button
              className={`perf-btn ${currentDelay === 1500 ? 'active' : ''}`}
              onClick={() => handleDelayChange(1500)}
              title="Simulates Slow 3G network to clearly see FallbackSkeleton UI"
            >
              <Wifi size={13} /> Slow 3G (1.5s)
            </button>
          </div>
        </div>

        {/* Right Side: Loaded Chunks Indicator */}
        <div className="perf-chunks-monitor">
          <span className="perf-control-label">
            <Layers size={13} /> Loaded Chunks ({loadedChunks.size}):
          </span>
          <div className="chunk-chips-list">
            {Array.from(loadedChunks).map((chunk, idx) => (
              <span key={idx} className="chunk-chip">
                <Check size={11} className="text-emerald-400" />
                {chunk}
              </span>
            ))}
          </div>
          {onOpenMetricsModal && (
            <button className="perf-metrics-btn" onClick={onOpenMetricsModal}>
              <HardDrive size={13} />
              <span>Metrics & Report</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
