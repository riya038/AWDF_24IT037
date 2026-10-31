import React from 'react';
import './RepoList.css';

function RepoList({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="no-repos-box">
        <p>No repositories found.</p>
      </div>
    );
  }

  return (
    <div className="projects-grid">
      {data.map((repo) => (
        <div key={repo.id} className="project-card">
          <div className="project-card-header">
            <span className="project-folder-icon">📁</span>
            <div className="project-links">
              <a
                href={repo.html_url}
                className="project-link highlighted"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Repo 🔗
              </a>
            </div>
          </div>

          <h3 className="project-card-title">{repo.name}</h3>

          <p className="project-card-desc">
            {repo.description || 'No description provided for this repository.'}
          </p>

          <div className="repo-meta-footer">
            <span className="stat-item" title="Star Count">
              ⭐ {repo.stargazers_count}
            </span>
            {repo.language && (
              <span className="project-tag">{repo.language}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RepoList;
