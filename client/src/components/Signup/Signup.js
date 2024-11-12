import React, { useState } from 'react';
import axios from '../../utils/axios'; // Import your axios instance
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { loggedInUser } from '../../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const history = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword:''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('/auth/signup', formData,{ withCredentials: true });
      setMessage(response.data.message);
      toast.success(response.data.message);
      dispatch(loggedInUser({name:formData.name,role:'student',email:formData.email}))
      history('/'); 
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Signup
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
           <TextField
            label="Confirm Password"
            variant="outlined"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Signup
          </Button>
        </form>
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        {message && <Typography variant="body2" color="error" sx={{ mt: 2 }}>{message}</Typography>}
      </Box>
    </Container>
  );
};

export default Signup;
