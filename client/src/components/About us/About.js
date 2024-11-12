import React from 'react';
import { Container, Typography, Grid } from '@mui/material';

const About = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
          The Institute is being managed under the presidentship of Hon. Shri. Sharadchandraji Pawar, Ex. Minister for Agriculture, Govt. of India and Ex. Chief Minister of Maharashtra.

The Institute was established in the year 1990 under the auspices of Shivnagar Vidya Prasarak Mandal at Malegaon (Bk) Tal - Baramati, Dist - Pune. It is occupying the sprawling area of 20 hectares with independent RCC structures housing various educational, instructional, laboratory and workshop areas along with allied necessary structures like Boys and Girls hostels, eating houses, Gymnasiums, play fields etc.

The College of Engineering was established in 1990 and has all the necessary infrastructure as per the norms of AICTE New Delhi, Pune University. The first batch obtained the degree of B.E. in 1994.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src="https://via.placeholder.com/400" alt="About Us" style={{ width: '100%' }} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
