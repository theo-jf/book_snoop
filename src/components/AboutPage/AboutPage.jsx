import React from 'react';

// MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

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
        {/* This site was built for a prime solo project, but required a lot of learning on my own etc etc  */}
        <div>
          <Box display="inline">
            <Box className="photoBox" display="flex" alignContent="center">
              <img className="headshot" src="Prime_Headshot.png" />
              <img className="qrCode" src="LinkedIn_QR_Code.jpg" />
            </Box>
            <Box className="techUsed">
              <h3>Technologies Used</h3>
              <Grid style={{maxWidth: "700px", minHeight: "200px"}} container justifyContent="center" alignItems="center" className="aboutPageList">
                {tech.map((tech, i) => {
                  return (
                    <Grid style={{paddingLeft: "50px"}} xs={12} md={4} lg={4} key={i} item> • {tech}</Grid>
                  );
                })}
              </Grid>
              <h3>Challenges and Future Plans</h3>
              <p className="futureText">The Open Library API, Google Maps API, and Cloudinary were all self-taught technologies, and they happened to pose the greatest challenges
                due to their unique requirements, restrictions, and limitations. In the weeks to come, I hope to individualize social feed and the editions details view by user zip code, while also adding interactivity between the two.
                 I also hope to add a friends list feature, the ability to sort by different parameters in the search view, and increased profile customization.</p>
            </Box>
          </Box>
          <h3>Special Thanks To ...</h3>
          <p>The wonderful L'Engle cohort, Matt, and the fantastic staff and students at Prime Digital Academy</p>
        </div>
      </div>
    </div>
  );
}