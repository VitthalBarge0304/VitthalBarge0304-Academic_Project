import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Pagination, Box,Button } from '@mui/material';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

const JobDetails = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const {user} = useSelector((state)=>state.user)
const navigate = useNavigate()
  const fetchJobs = async (pageNum = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`/jobsDetails?page=${pageNum}&limit=6`,{
        withCredentials: true  
      });
      setJobs(response.data.jobs);
      setTotalPages(response.data.totalPages); 
    } catch (error) {
        toast.error('route is for aunthenticate users')
        navigate('/')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleApplyJob = (jobId) => {
    console.log('Applying for job with ID:', jobId);
  };

  const handleDelete = async (jobId) => {
    console.log(jobId,'delete')
  };


  const handleUpdate = (jobId) => {
    console.log(jobId,'edit')
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Job Listings
        </Typography>
        
        {/* Loader or No Data Message */}
        {loading ? (
          <Typography variant="h6" color="textSecondary">
            Loading jobs...
          </Typography>
        ) : jobs.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No jobs available.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {jobs.map((job, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography variant="body2" color="textSecondary">{job.company}</Typography>
                    <Typography variant="body2" color="textSecondary">{job.location}</Typography>
                    <Typography variant="body1">${job.salary} per year</Typography>
                    <Typography variant="body2" color="textSecondary">Experience: {job.experience} years</Typography>
                   {user && user.role === 'admin' ? <>  <Button variant="contained" color="primary" onClick={() => handleUpdate(job._id)} sx={{ mr: 2,mt:2 }}>
            Update Job
          </Button>
          <Button sx={{ mt: 2}}variant="contained" color="error" onClick={() => handleDelete(job._id)}>
            Delete Job
          </Button></>:   <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2}}
                      onClick={() => handleApplyJob(job._id)}
                    >
                      Apply Now
                    </Button>}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default JobDetails;
