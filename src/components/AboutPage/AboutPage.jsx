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

              // I want to add interactivity between the feed and looking up an edition, I want to add zip code specificity for user's feed and addresses lists in map view
              // I want to add a friends list
              // Social feed sorting
              // Search results sorting (only being sorted by backend, publish date sort function)
              // More? 

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