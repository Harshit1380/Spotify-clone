import React from 'react';
import {Avatar, Typography} from '@mui/material';
import {ArrowDropDown,ArrowDropUp} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {toggleIsOpen} from '../../Actions/navbar';
import { setUser } from '../../Actions/activeUser';

const Profileutton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.activeUser.result); 
  const navbar = useSelector((state)=>state.navbar);  

  const handleClick = () =>{
    if(!navbar.isOpen)   dispatch(toggleIsOpen());
  }

  return (
    <div>
      <button onClick={handleClick} className='profile-btn'>
        <span><Avatar alt='profile' src={user?.profile} sx={{height: '27px', width: '27px',marginRight: '5px'}}>{user?.username && user?.username[0]}</Avatar></span>
        <Typography variant='subtitle1' sx={{fontWeight:'600', fontSize:'14px'}}>{user?.username}</Typography>
        <span style={{display: 'flex'}}>{navbar.isOpen ? <ArrowDropUp />:<ArrowDropDown />}</span>
      </button>
      <div style={{zIndex: 99,position: 'absolute',width: '200px',backgroundColor:'#282828',right: '50px',top:'50px',borderRadius: '5px',opacity: navbar.isOpen,display: navbar.isOpen===1 ? 'flex':'none',transition: 'all 0.3s',flexDirection: 'column'}}>
        <button className='profile-detail-button' onClick={()=>{localStorage.clear();dispatch(setUser(null));navigate('/');}} style={{fontWeight: '600',color: '#dbdbdb',width: '100%',border: 'none',height: '40px'}}>Log out</button>
      </div>
    </div>
  );
}

export default Profileutton