import React from 'react';
import './Experience.css';

function Experience() {
  const milestones = [
    {
      period: 'Semester 5 (Current)',
      title: 'Advanced Frameworks & Architectures',
      institution: 'Charotar University of Science and Technology',
      details: 'Studying Advanced Web Development Frameworks (React, Vue, Vite, state routing, performance tuning) and databases.'
    },
    {
      period: 'Semester 4',
      title: 'Web Application Development Lab',
      institution: 'Charotar University of Science and Technology',
      details: 'Built full-stack responsive web systems. Formulated skills in HTML5, CSS Grid, vanilla JS DOM controllers, and Node.js backend controllers.'
    },
    {
      period: 'Semester 3',
      title: 'Data Structures & Algorithms',
      institution: 'Charotar University of Science and Technology',
      details: 'Developed analytical and algorithmic problem-solving capabilities. Implemented advanced structures (trees, graphs) and search/sort algorithms.'
    }
  ];

  return (
    <section id="experience" className="experience-section">
      <div className="section-header">
        <h2 className="section-title">Academic Timeline</h2>
        <div className="title-underline"></div>
      </div>
      <p className="experience-subtitle">
        A timeline tracking my academic progression, core technical frameworks learned, and project milestones.
      </p>
      <div className="timeline">
        {milestones.map((milestone, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-period">{milestone.period}</span>
              <h3 className="timeline-title">{milestone.title}</h3>
              <h4 className="timeline-institution">{milestone.institution}</h4>
              <p className="timeline-details">{milestone.details}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
