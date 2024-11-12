import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SchoolIcon from '@mui/icons-material/School'; // You can use this as your college icon or any relevant one
import logo_svpm from '../../assets/logo_svpm.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { loggedOutUser } from '../../redux/slice/userSlice';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { useNavigate } from 'react-router-dom';

const pages = ['Home', 'About', 'Contact Us']; // Adjust the pages to match your college sections
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const guest = ['signup','login']

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOutUser =async()=>{
    await axios.post('/auth/logout',{},{ withCredentials: true }).then(res=>{
      toast.success(res.data.message)
      navigate('/')
    }).catch(err=>{
      toast.error(err.response?.data?.message || 'Something went wrong');
     })
    dispatch(loggedOutUser())
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box sx={{  display: { xs: 'none' , md:'flex'} }}>
            <img
              src={logo_svpm} 
              alt="School Logo"
              style={{ width: 40, height: 40, marginRight: 10 }}
            />
          </Box>
         
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SVPM
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>{page !== 'Contact Us' ? 
                <Link to={page === 'Home' ? '/' : `/${page.toLowerCase().replace(/\s+/g, '')}`} style={{ textDecoration: 'none' }}>
                <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
              </Link>: <Link to='/contact' style={{ textDecoration: 'none' }}>
                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                  </Link>}
                </MenuItem>
              ))}
              {user && <Link to='/jobs' onClick={handleCloseNavMenu} style={{ textDecoration: 'none' }}>
                    <Typography sx={{ minHeight: '36px',padding:'6px 16px' ,display:'flex',alignItems:'center'}}>Job Lists</Typography>
                  </Link>}
            </Menu>
          </Box>

          {/* Logo for Mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <img
              src={logo_svpm} 
              alt="School Logo"
              style={{ width: 40, height: 40, marginRight: 10 }}
            />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          SVPM
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page !== 'Contact Us' ? 
                <Link to={page === 'Home' ? '/' : `/${page.toLowerCase().replace(/\s+/g, '')}`} style={{ textDecoration: 'none' }}>
                <Typography sx={{ textAlign: 'center',
              fontWeight: 700,
              
              color: 'white',
              textDecoration: 'none' }}>{page}</Typography>
              </Link>: <Link to='/contact' style={{ textDecoration: 'none' }}>
                    <Typography sx={{ textAlign: 'center',
              fontWeight: 700,
              color: 'white',
              textDecoration: 'none' }}>{page}</Typography>
                  </Link>}
                {/* {page} */}
              </Button>
            ))}
                 {user && <Link to='/jobs' style={{ textDecoration: 'none' }}>
                    <Typography sx={{ my:2,textAlign: 'center',color:'white' ,fontWeight:700,padding:'6px 8px'}}>JOB LISTS</Typography>
                  </Link>}
          </Box>
          {user ?   <Box sx={{ flexGrow: 0 }}>
           <span> welcome {user.name} </span>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {setting === 'Logout' ? <div onClick={logOutUser} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography sx={
                 {
                  color: 'inherit',
                  textDecoration: 'none'}
                }>
                  Logout
                  </Typography>
                </div> :<Link to={`/${setting.toLocaleLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography sx={
                 {
                  color: 'inherit',
                  textDecoration: 'none'}
                }>
              {setting}
                  </Typography>
                </Link>}               
                </MenuItem>
              ))}
            </Menu>  
          </Box> : <> <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {guest.map((item) => (
              <Button sx={{ my: 2, color: 'white', display: 'block' }} key={item} color="inherit">
                <Link to={`/${item}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography sx={
                 { 
                  fontWeight: 700,
                 
                  color: 'inherit',
                  textDecoration: 'none'}
                }>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Typography>
                </Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >   
            {guest.map((item) => (
               <MenuItem key={item} onClick={handleCloseUserMenu}>
              <Button key={item} color="inherit">
                <Link to={`/${item}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography sx={
                 { 
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none'}
                }>
                {item.charAt(0).toUpperCase() + item.slice(1)}
                </Typography>
                </Link>
              </Button>
              </MenuItem>
            ))}
             </Menu>
          </Box>
          </>}
        
           
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
