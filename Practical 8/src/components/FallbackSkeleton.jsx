import React from 'react';
import { Loader2, Sparkles, Box, ShieldCheck } from 'lucide-react';

export default function FallbackSkeleton({ pageName = 'Page Component', message = 'Loading lazy chunk...' }) {
  return (
    <div className="skeleton-container" role="status" aria-live="polite">
      {/* Top Banner Loader */}
      <div className="skeleton-header-badge">
        <div className="spinner-wrapper">
          <Loader2 className="spinner-icon animate-spin" size={20} />
        </div>
        <div>
          <h3 className="skeleton-title">
            <Sparkles size={16} className="text-amber-400" />
            <span>Dynamic Code Splitting in Progress: <strong>{pageName}</strong></span>
          </h3>
          <p className="skeleton-subtitle">
            React.lazy() is fetching the separate JavaScript chunk from the server on-demand...
          </p>
        </div>
      </div>

      {/* Animated Skeleton Layout */}
      <div className="skeleton-grid">
        {/* Skeleton Top Metrics */}
        <div className="skeleton-card skeleton-metrics">
          <div className="shimmer skeleton-line skeleton-title-bar"></div>
          <div className="skeleton-stat-row">
            <div className="shimmer skeleton-box"></div>
            <div className="shimmer skeleton-box"></div>
            <div className="shimmer skeleton-box"></div>
          </div>
        </div>

        {/* Skeleton Content Cards */}
        <div className="skeleton-row">
          <div className="skeleton-card flex-2">
            <div className="shimmer skeleton-line w-40"></div>
            <div className="shimmer skeleton-line w-full mb-2"></div>
            <div className="shimmer skeleton-line w-80 mb-4"></div>
            <div className="shimmer skeleton-block-tall"></div>
          </div>
          <div className="skeleton-card flex-1">
            <div className="shimmer skeleton-line w-30"></div>
            <div className="shimmer skeleton-line w-full mb-2"></div>
            <div className="shimmer skeleton-circle-center"></div>
            <div className="shimmer skeleton-line w-70 mt-4"></div>
          </div>
        </div>
      </div>

      <div className="skeleton-footer-hint">
        <ShieldCheck size={16} className="text-emerald-400" />
        <span>Meaningful Fallback UI rendered via <code>&lt;Suspense fallback=&#123;...&#125;&gt;</code>. Prevents main bundle bloat!</span>
      </div>
    </div>
  );
}
