import React from 'react';
import './About.css';

function About() {
  const cards = [
    {
      title: 'Education',
      description: 'B.Tech in Computer Science and Engineering (5th Sem). Focused on Web Technologies.',
      icon: '🎓'
    },
    {
      title: 'Design Philosophy',
      description: 'Creating modular, performant, and component-based user interfaces with flawless UX.',
      icon: '✨'
    },
    {
      title: 'Current Interests',
      description: 'Exploring React ecosystem, compiler architectures, and edge deployment frameworks.',
      icon: '🚀'
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
        <div className="title-underline"></div>
      </div>
      <div className="about-container">
        <div className="about-main">
          <p className="about-text">
            Hello! I'm a passionate Full-Stack Developer and B.Tech student who enjoys building modern web applications with intuitive user experiences and scalable backend systems.
          </p>
          <p className="about-text">
            I specialize in creating responsive and interactive web solutions using technologies such as React, JavaScript, Node.js, and MongoDB. I enjoy transforming complex problems into simple, elegant, and user-friendly solutions while continuously exploring new technologies and best practices.
          </p>
        </div>
        <div className="about-grid">
          {cards.map((card, index) => (
            <div key={index} className="about-card">
              <div className="card-icon">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-desc">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
