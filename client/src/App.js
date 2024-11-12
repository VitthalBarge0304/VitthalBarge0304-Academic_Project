import React , {useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';
import Home from './components/Home/Home';
import About from './components/About us/About';
import ContactUs from './components/Contact/ContactUs';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import logo_svpm from '../src/assets/logo_svpm.png'; // Adjust the path as needed
import { ToastContainer } from 'react-toastify';
import Header from './components/Nav/Header';
import axios from './utils/axios';
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { loggedInUser } from './redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import JobDetails from './components/Job/JobDetails';

const App = () => {
  const dispatch = useDispatch()
  const {user}  = useSelector((state) => state.user);
  const cookies = document.cookie;

  useEffect(()=>{
    async function fetchUser(){
     await axios.get('/users/getCurrentUser',{ withCredentials: true }).then(res=>{
      dispatch(loggedInUser(res.data.user))
     }).catch(err=>{
      toast.error(err.response?.data?.message || 'Something went wrong');
      console.error('Error fetching profile:', err.response );
     })
    }
    fetchUser();
  },[])
  return (<>
    <Header/>

      <ToastContainer />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element={<JobDetails />} />
        </Routes>
      </div>

    </>);
};
export default App;
