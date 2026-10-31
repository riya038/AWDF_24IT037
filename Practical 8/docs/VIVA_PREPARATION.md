# Practical 8: Comprehensive Viva & Theory Preparation Guide
**Course:** ITUE301 - Advanced Web Development Frameworks  
**Topic:** Performance Optimization and Lazy Loading in React  
**Department:** Computer Science & Engineering / Information Technology  
**Institution:** Charotar University of Science and Technology (CHARUSAT)

---

## Part 1: Core Key Questions from Practical Assignment

### Q1. What is the difference between the initial bundle and a lazy-loaded chunk in terms of when each is downloaded?
**Answer:**
- **Initial Bundle (`main.js` / `index.js`):**
  - **When it is downloaded:** Immediately upon the user's first visit to any URL in the web application (during the critical initial page load).
  - **What it contains:** Essential application code needed to render the application shell (e.g., root entry point, React runtime, React Router, navigation header, and default home view).
  - **Impact:** Directly affects **First Contentful Paint (FCP)** and **Time to Interactive (TTI)**.
- **Lazy-Loaded Chunk (`Projects.[hash].js`, `Contact.[hash].js`):**
  - **When it is downloaded:** Deferred asynchronously until the exact moment the user triggers an action that requires it (e.g., clicking on the `/projects` or `/contact` route link, or clicking to open a heavy modal/chart).
  - **What it contains:** Isolated component code, sub-routes, and third-party libraries specific to that view.
  - **Impact:** Keeps initial load fast without preventing access to heavy features later.

---

### Q2. Why does lazy loading improve perceived performance even though the total amount of code downloaded eventually stays the same?
**Answer:**
1. **Critical Rendering Path Optimization:** Perceived performance is heavily dictated by how fast the user sees meaningful content (**FCP**) and can interact with buttons and links (**TTI**).
2. **Elimination of Unused Upfront Code:** A user visiting an app may only look at the Dashboard or Home page and leave. Forcing them to download code for Settings, Admin Panels, Contact, and Analytics is wasteful.
3. **Bandwidth & CPU Decoupling:** Browsers not only have to *download* JavaScript files over the network, but they must also *parse*, *compile*, and *execute* them on the main thread. Splitting code into chunks spreads this CPU execution cost throughout the session rather than causing a massive CPU blocking spike on initial load.
4. **Seamless Background Transitions:** While the user is browsing the home page, subsequent chunks can be prefetched or loaded with smooth skeleton fallbacks in fractions of a second, feeling instantaneous.

---

### Q3. In what situations would lazy loading NOT be worth the added complexity?
**Answer:**
1. **Very Small Applications:** If the entire bundled application is under ~100–150 kB, code splitting adds unnecessary Rollup chunk overhead and extra HTTP round-trip requests without perceptible speed improvements.
2. **Above-the-Fold Critical Components:** Components that are essential for the primary landing view (like Header, Navigation, and Main Landing Hero) should NEVER be lazy-loaded, as it introduces flash of unstyled content or delayed rendering.
3. **Poor Fallback Management:** If developers don't implement smooth loading fallbacks, users on intermittent networks experience jarring layout shifts and flashing spinners.
4. **Offline-First or High-Reliability Critical Workflows:** In apps where network drops are frequent (e.g., field survey apps), lazy chunk requests can fail mid-session if an Error Boundary is missing.

---

## Part 2: Troubleshooting & Common Mistakes

| Symptom / Error | Likely Cause | Solution & Fix |
| :--- | :--- | :--- |
| **`Element type is invalid: expected a string... but got: object`** | The lazy-loaded component does not have a default export (it uses named export). | Ensure the file uses `export default ComponentName`, or if named, wrap it: `lazy(() => import('./Component').then(m => ({ default: m.ComponentName })))`. |
| **Fallback UI never appears during testing** | Local network / Vite HMR is near-instant (< 5ms). | Enable **Network Throttling** (Slow 3G or Fast 3G) in DevTools Network tab, or use our `lazyWithMinDelay(..., 300)` helper. |
| **No separate chunk files generated after `npm run build`** | A static `import Component from './Component'` is still present at the top of the file alongside the dynamic import. | Remove top-level static imports and strictly use `const Component = lazy(() => import('./Component'))`. |
| **Suspense fallback shows for the entire application, resetting the Navbar** | `<Suspense>` wraps the whole `<App />` tree instead of only wrapping the `<Routes>` or route elements. | Move `<Suspense>` inside the layout so the Navbar remains visible while only the page outlet switches to fallback skeleton. |

---

## Part 3: Deep-Dive Optimization Concepts

### 1. What is `<Suspense>` and how does it coordinate with Promises?
`Suspense` is a React boundary component that catches any "thrown Promise" inside its child component tree. When a component wrapped in `React.lazy()` executes, it throws its dynamic `import()` Promise. The nearest `<Suspense>` ancestor catches this Promise and renders the `fallback` prop until the Promise resolves, at which point React re-renders the resolved component seamlessly.

### 2. How does `React.memo` differ from `useMemo` and `useCallback`?
- **`React.memo`**: A Higher-Order Component (HOC) that wraps a component to prevent re-renders if its incoming props are shallowly equal to previous props.
- **`useMemo`**: A React Hook that caches the **result of a calculation** between re-renders (`const sorted = useMemo(() => heavySort(list), [list])`).
- **`useCallback`**: A React Hook that caches a **function definition reference** between re-renders (`const handleSave = useCallback(() => save(), [])`), ensuring props passed to `React.memo` components remain stable.

### 3. What is the role of Rollup / Bundlers in Dynamic Imports?
When the bundler (Vite / Rollup / Webpack) encounters an ES `import('path')` call, it automatically creates an asynchronous chunk boundary. It outputs a separate file in `dist/assets/` and injects runtime code that dynamically fetches the script via DOM `<script type="module">` or `fetch()` when the code is executed.
