import React, { useEffect } from 'react';
import { Box,Stack,Typography,IconButton } from '@mui/material';
import { ArrowBackIosRounded,ArrowForwardIosRounded } from '@mui/icons-material';
import SearchBar from './SearchBar';
import ProfileButton from './ProfileButton';
import { useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {changeLibraryType} from '../../Actions/navbar';
import { getUser } from '../../Actions/activeUser';
// const col = '#101010';
const col = 'rgb(45,45,160)';

const NavBar = () => {
  const navigate = useNavigate();
  const navbar = useSelector((state) => state.navbar);
  const activeBody = useSelector((state) => state.activeBody);
  const user = useSelector((state) => state?.activeUser?.result);
  const handleGoBack = () => {navigate(-1);}
  const handleGoForward = () => {navigate(1);}
  const dispatch = useDispatch();
  useEffect(() => {
    if(!JSON.parse(localStorage.getItem("profile"))){
      localStorage.clear();
    }else{
      dispatch(getUser());
    }
  },[]);
  return (
    <Box backgroundColor={col} sx={{flex:'0 0 60px', alignContent:'center', position:'sticky',overflow: 'visible'}}>
      <Stack direction='row' sx={{display:'flex', justifyContent:'space-between', height:'100%'}}>
        <Stack direction='row' sx={{alignItems:'center', marginLeft:'15px'}}>
          <IconButton onClick={handleGoBack} sx={{color: '#fcfcfc',backgroundColor: '#000',cursor: 'pointer',height: '30px',width: '30px',marginRight: '20px',marginLeft: '20px'}} disableRipple>
            <ArrowBackIosRounded fontSize='30px' />
          </IconButton>
          <IconButton onClick={handleGoForward} sx={{color: '#fcfcfc',backgroundColor: '#000',cursor: 'pointer',height: '30px',width: '30px'}} disableRipple>
            <ArrowForwardIosRounded fontSize='medium' />
          </IconButton>
          {activeBody==='Search' && <SearchBar/>}
          {(activeBody==='Your Library' && user) &&   
              <Stack direction='row' sx={{marginLeft: '40px'}} alignItems= 'center'>
                <button onClick={()=>{changeLibraryType('playlists');navigate('/library');}} className='library-btn' style={{backgroundColor: navbar.libraryType==='playlists' ? '#454545':'#000',border: 'none'}}>Playlists</button>
                <button onClick={()=>{changeLibraryType('tracks');navigate('/liked');}} className='library-btn' style={{backgroundColor: navbar.libraryType==='tracks' ? '#454545':'#000',border: 'none'}}>Tracks</button>
              </Stack>}
        </Stack>
        <Stack direction='row' sx={{alignItems: 'center',pr: 3,mr: '25px'}}>
          {(user && !(activeBody === 'Search' || activeBody === 'Your Library')) && <button className='upgrade'>
            <Typography sx={{color:'#fff', fontWeight:'600', fontSize:'14px'}}>Upgrade</Typography>
          </button>}
          {user && <ProfileButton />}
          {!user && 
            <button className='sign-up' onClick={()=>navigate('/signup')}>
              <Typography fontWeight='bold' variant='body1'>Sign Up</Typography>
            </button>
          }
          {!user && 
            <button className='log-in' onClick={()=>navigate('/login')}>
              <Typography fontWeight='bold' variant='body1'>Log In</Typography>
            </button>
          }
        </Stack>
      </Stack>
    </Box>
  )
}

export default NavBar