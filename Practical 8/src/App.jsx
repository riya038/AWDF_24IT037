import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import PerformanceToolbar from './components/PerformanceToolbar';
import FallbackSkeleton from './components/FallbackSkeleton';
import MetricsModal from './components/MetricsModal';
import { lazyWithMinDelay } from './utils/lazyWithDelay';

// Eagerly loaded routes (Core shell and dashboard)
import Home from './pages/Home';
import Tasks from './pages/Tasks';

// Route-Based Code Splitting via React.lazy() & dynamic import()
// (Steps 3 & 4 from Practical 8 Lab Guide)
const Projects = lazyWithMinDelay(() => import('./pages/Projects'), 200);
const Contact = lazyWithMinDelay(() => import('./pages/Contact'), 200);
const Analytics = lazyWithMinDelay(() => import('./pages/Analytics'), 200);
const ProfilerDemo = lazyWithMinDelay(() => import('./pages/ProfilerDemo'), 200);

export default function App() {
  const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-layout">
        {/* Top Telemetry & Throttling Simulator */}
        <PerformanceToolbar onOpenMetricsModal={() => setIsMetricsModalOpen(true)} />

        {/* Navigation Bar */}
        <Navbar onOpenMetricsModal={() => setIsMetricsModalOpen(true)} />

        {/* Main Content Area with Suspense and Fallback UI */}
        <main className="main-content">
          <Suspense fallback={<FallbackSkeleton pageName="Dynamic Route Chunk" />}>
            <Routes>
              {/* Eagerly Loaded Routes */}
              <Route path="/" element={<Home onOpenMetricsModal={() => setIsMetricsModalOpen(true)} />} />
              <Route path="/tasks" element={<Tasks />} />

              {/* Lazy-Loaded Routes (Practical 8 Core Requirement) */}
              <Route
                path="/projects"
                element={
                  <Suspense fallback={<FallbackSkeleton pageName="Projects Portfolio (/projects)" />}>
                    <Projects />
                  </Suspense>
                }
              />
              <Route
                path="/contact"
                element={
                  <Suspense fallback={<FallbackSkeleton pageName="Contact & Support (/contact)" />}>
                    <Contact />
                  </Suspense>
                }
              />
              <Route
                path="/analytics"
                element={
                  <Suspense fallback={<FallbackSkeleton pageName="Analytics Dashboard (/analytics)" />}>
                    <Analytics />
                  </Suspense>
                }
              />
              <Route
                path="/profiler-demo"
                element={
                  <Suspense fallback={<FallbackSkeleton pageName="React DevTools Profiler Lab" />}>
                    <ProfilerDemo />
                  </Suspense>
                }
              />

              {/* Fallback redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-left">
              <span className="font-semibold text-slate-200">TaskMaster Pro</span> — Practical 8: Performance Optimization &amp; Lazy Loading
            </div>
            <div className="footer-right">
              <span>CHAROTAR UNIVERSITY OF SCIENCE AND TECHNOLOGY • ITUE301</span>
            </div>
          </div>
        </footer>

        {/* Benchmark & Metrics Modal */}
        <MetricsModal
          isOpen={isMetricsModalOpen}
          onClose={() => setIsMetricsModalOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}
