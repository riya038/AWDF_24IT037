import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  CheckSquare,
  LayoutDashboard,
  FolderKanban,
  Mail,
  BarChart3,
  Cpu,
  Zap,
  Split
} from 'lucide-react';

export default function Navbar({ onOpenMetricsModal }) {
  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Brand */}
        <NavLink to="/" className="brand-logo">
          <div className="brand-icon">
            <CheckSquare size={22} className="text-white" />
          </div>
          <div className="brand-text">
            <span className="brand-name">TaskMaster<span className="text-indigo-400">Pro</span></span>
          </div>
        </NavLink>

        {/* Navigation Links */}
        <nav className="nav-menu">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={17} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <CheckSquare size={17} />
            <span>Tasks</span>
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <FolderKanban size={17} />
            <span>Projects</span>
            <span className="lazy-chip">lazy</span>
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Mail size={17} />
            <span>Contact</span>
            <span className="lazy-chip">lazy</span>
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <BarChart3 size={17} />
            <span>Analytics</span>
            <span className="lazy-chip bg-purple-500/20 text-purple-300">lazy+chart</span>
          </NavLink>

          <NavLink
            to="/profiler-demo"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Cpu size={17} />
            <span>Profiler Lab</span>
            <span className="badge-supp">Supp 3</span>
          </NavLink>
        </nav>

        {/* Header Right Actions */}
        <div className="navbar-actions">
          <button className="btn-benchmark" onClick={onOpenMetricsModal}>
            <Split size={15} />
            <span>Before vs After Metrics</span>
          </button>
        </div>
      </div>
    </header>
  );
}
