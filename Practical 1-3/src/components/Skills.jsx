import React from 'react';
import './Skills.css';

function Skills({ skillList }) {
  // Map standard skills to icons for visual enhancement
  const getSkillIcon = (skillName) => {
    const iconMap = {
      'HTML': '🌐',
      'CSS': '🎨',
      'JavaScript': '⚡',
      'React': '⚛️',
      'Vite': '⚡',
      'Node.js': '🟢',
      'Git': '📁',
      'SQL': '🗄️',
      'Tailwind CSS': '🎐',
      'TypeScript': '📘',
      'Python': '🐍',
      'UI/UX Design': '📐'
    };
    return iconMap[skillName] || '🚀';
  };

  return (
    <section id="skills" className="skills-section">
      <div className="section-header">
        <h2 className="section-title">My Skills</h2>
        <div className="title-underline"></div>
      </div>
      <p className="skills-description">
        Here are some of the key technical technologies and frameworks I have worked with to build projects.
      </p>
      <div className="skills-grid">
        {skillList.map((skill) => (
          <div key={skill} className="skill-badge" aria-label={`Skill: ${skill}`}>
            <span className="skill-icon">{getSkillIcon(skill)}</span>
            <span className="skill-name">{skill}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
