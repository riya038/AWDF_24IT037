# B.Tech React Portfolio Application

**Course**: Advanced Web Development Frameworks (ITUE301)  
**Student Name**: Riya Kalariya  
**Enrollment ID**: 24IT037  


---

## 📌 Comprehensive Practical Summary (Practicals 1, 2 & 3)

This repository contains the complete, integrated React Portfolio application built progressively across **Practical 1**, **Practical 2**, and **Practical 3**.

---

### 🔹 Practical 1: Single-Page Portfolio & Theme State Management
- **Objective**: Build a modular, component-driven React portfolio using Vite and custom CSS variables.
- **Key Features Implemented**:
  - Modular component layout (`Header`, `Home`, `About`, `Skills`, `Experience`, `Contact`, `Footer`).
  - **Light / Dark Mode State**: Managed using `useState()` and `useEffect()` with `localStorage` persistence and root CSS class toggling.
  - **Glassmorphism Design System**: Dark futuristic aesthetic with CSS variables (`--bg-primary`, `--accent-color`, `--card-bg`).

---

### 🔹 Practical 2: Multi-Route Portfolio Navigation (React Router)
- **Objective**: Implement client-side multi-route navigation using `react-router-dom`.
- **Key Features Implemented**:
  - Declarative routing with `<Routes>` and `<Route>` in `App.jsx`.
  - Configured navigation links for `/` (Home), `/projects` (Projects), `/contact` (Contact), and `*` (`NotFound` 404 page).
  - Active route highlighting in the `NavBar` component.
  - Dynamic props passing (`name`, `skillList`, `themeColor`).

---

### 🔹 Practical 3: REST API Integration & Data Rendering
- **Objective**: Consume a public REST API in React and handle asynchronous data with loading and error states.
- **Key Features Implemented**:
  - **GitHub REST API Integration**: Dynamic fetching of public repositories from `https://api.github.com/users/riya038/repos`.
  - **Asynchronous State Architecture**:
    - `repos`: Stores fetched array of repository objects.
    - `loading`: Boolean state for tracking network request progress.
    - `error`: Handles network/API failure messages.
    - `searchTerm`: Real-time state for filtering repositories by name.
  - **Component Breakdown**:
    - `Projects.jsx`: Parent container executing `useEffect()` on mount and managing state.
    - `Spinner.jsx`: Custom CSS animated loading indicator shown while request is pending.
    - `ErrorMessage.jsx`: Error display card with a working **🔄 Retry Button** to re-trigger API fetching.
    - `RepoList.jsx`: Renders repository cards displaying repo name, code link (`html_url`), star count (⭐), description, and language tag.
  - **Search / Filter Input**: Dynamic search box rendered above the repository list.

---

## 📁 Project Directory Structure

```text
My Portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── About.jsx & About.css
│   │   ├── Contact.jsx & Contact.css
│   │   ├── ErrorMessage.jsx & ErrorMessage.css
│   │   ├── Experience.jsx & Experience.css
│   │   ├── Footer.jsx & Footer.css
│   │   ├── Header.jsx & Header.css
│   │   ├── Home.jsx
│   │   ├── NavBar.jsx & NavBar.css
│   │   ├── NotFound.jsx & NotFound.css
│   │   ├── Projects.jsx & Projects.css
│   │   ├── RepoList.jsx & RepoList.css
│   │   ├── Skills.jsx & Skills.css
│   │   └── Spinner.jsx & Spinner.css
│   ├── App.jsx & App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```






