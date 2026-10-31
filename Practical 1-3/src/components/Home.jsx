import React from 'react';
import Header from './Header';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';

function Home({ name, themeColor, skillList }) {
  return (
    <>
      <Header name={name} themeColor={themeColor} />
      <About />
      <Skills skillList={skillList} />
      <Experience />
    </>
  );
}

export default Home;
