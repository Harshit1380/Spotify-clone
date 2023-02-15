import { Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const NotLoggedInPopup = ({title,subtitle,display,height}) => {
  const navigate = useNavigate();

  return (
    <div className='not-logged-in-popup' style={{visibility: display,opacity: display==='hidden' ? 0:1,top: height}}>
        <Typography fontWeight='bold' fontSize='17px' marginBottom='5px'>{title}</Typography>
        <Typography variant='subtitle2'>{subtitle}</Typography>
        <div style={{marginTop:'20px',width: '100%',display: 'flex',justifyContent: 'flex-end'}}>
            <button className='not-now-sidebar-btn' onClick={()=>{}}>Not now</button>
            <button className='log-in-sidebar-btn' onClick={()=> navigate('/login')}>Log in</button>
        </div>
    </div>
  )
}

export default NotLoggedInPopup