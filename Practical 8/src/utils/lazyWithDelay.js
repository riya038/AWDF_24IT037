import { lazy } from 'react';

// Global simulated delay state (in milliseconds)
// Can be updated from the in-app PerformanceToolbar
let currentSimulatedDelay = 0; // Default 0ms, or can be set to 300ms (smooth min-delay) or 1500ms (Slow 3G)

export const setGlobalSimulatedDelay = (delayMs) => {
  currentSimulatedDelay = delayMs;
};

export const getGlobalSimulatedDelay = () => currentSimulatedDelay;

/**
 * Custom lazy loading wrapper that supports:
 * 1. A minimum duration display (e.g. 300ms) to prevent UI flicker
 * 2. Artificial latency injection for demonstrating Suspense fallbacks on fast networks
 * 
 * @param {Function} importFunc - () => import('./path/to/Component')
 * @param {number} minDelay - Minimum time in ms to hold loading state (default: 300ms)
 * @returns {React.LazyExoticComponent}
 */
export function lazyWithMinDelay(importFunc, minDelay = 0) {
  return lazy(() => {
    const delay = Math.max(minDelay, currentSimulatedDelay);
    if (delay <= 0) {
      return importFunc();
    }
    return Promise.all([
      importFunc(),
      new Promise((resolve) => setTimeout(resolve, delay))
    ]).then(([moduleExports]) => moduleExports);
  });
}

/**
 * Event emitter for tracking chunk load events in real-time
 */
const chunkListeners = new Set();

export const notifyChunkLoaded = (chunkName) => {
  chunkListeners.forEach(listener => listener(chunkName));
};

export const subscribeToChunkLoads = (listener) => {
  chunkListeners.add(listener);
  return () => chunkListeners.delete(listener);
};
