import React from 'react';
import { Container, Typography, Grid } from '@mui/material';

import clg_photo from '../../assets/clg_photo.jpg'


const Home = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        SVPM Malegaon Placement cell
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
        <img src={clg_photo} alt="College" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            Find your dream job today! Our platform connects students with employers to make the job search process easy and efficient.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
