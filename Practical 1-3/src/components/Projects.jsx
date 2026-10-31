import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import RepoList from './RepoList';
import './Projects.css';

function Projects() {
  // Step 1: Set up state variables for data (repos), loading, and error
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to fetch GitHub API data
  const fetchRepos = () => {
    setLoading(true);
    setError(null);

    // Step 2: Use fetch API with promises/then/catch/finally
    fetch('https://api.github.com/users/riya038/repos?sort=updated')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch repositories (HTTP status ${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => {
        setError(err.message || 'An error occurred while fetching repositories.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Step 2: Use useEffect to trigger fetch on component mount
  useEffect(() => {
    fetchRepos();
  }, []);

  // Filter repository list by name (Supplementary Task)
  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="projects" className="projects-section">
      <div className="section-header">
        <h2 className="section-title">My Projects</h2>
        <div className="title-underline"></div>
      </div>
      
      <p className="projects-subtitle">
        Here are my public GitHub repositories dynamically loaded using the GitHub REST API.
      </p>

      {/* Search Filter Input (Supplementary Task) */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Search repository by name..."
        />
      </div>

      {/* Step 3: Conditionally render based on state */}
      {loading ? (
        <Spinner message="Loading repositories..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchRepos} />
      ) : (
        <RepoList data={filteredRepos} />
      )}
    </section>
  );
}

export default Projects;
