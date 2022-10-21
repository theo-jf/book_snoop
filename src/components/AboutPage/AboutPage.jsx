import React from 'react';

import './AboutPage.css';

const tech = ['React', 
              'Redux-Saga', 
              'Javascript', 
              'HTML/CSS', 
              'Node', 
              'Express', 
              'Google Maps Places API', 
              'Open Library API', 
              'SQL', 
              'PostgreSQL', 
              'Node-Postgres', 
              'Material UI', 
              'Cloudinary', 
              'bcrypt', 
              'Passport']

export default function AboutPage() {
  return (
    <div className="container">
      <div className="aboutPage">
        <h1>Thanks for visiting!</h1>
        {/* This site was build for a prime solo project, but required a lot of learning on my own etc etc  */}
        <div>
          <h3>Technologies Used</h3>
          <ul className="aboutPageList">
            {tech.map((tech, i) => {
              return (
                <li key={i}>{tech}</li>
              );
            })}
          </ul>
          <h3>Special Thanks To ...</h3>
          <p>The wonderful L'Engle cohort, Matt, and the fantastic staff and students at Prime Digital Academy</p>
        </div>
      </div>
    </div>
  );
}