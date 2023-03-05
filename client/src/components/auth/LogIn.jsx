import React, { useEffect, useState } from 'react';
import {Stack, Typography,Box } from '@mui/material';
import {BlackLogo} from '../../utils/Constants';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../../Actions/activeUser';

const LogIn = () => {
    const navigate = useNavigate();
    const [display,setDisplay] = useState('none');
    const [user,setuser] = useState({email: "",password: ""});
    const dispatch = useDispatch();

    useEffect(()=>{
        // if(localStorage.getItem("profile")) navigate('/');
        localStorage.clear();
    },[]);
    const handleSubmit = async (e) => {
        if(user.email && user.password){
            e.preventDefault();
            dispatch(signIn(user));
            console.log("login");
            navigate('/');
        }
    }
  return (
    <Stack sx={{alignItems:'center', margin:'40px'}}>
        <Link to='/'><img 
            src = {BlackLogo}
            alt = 'logo'
            width='150px'
            style={{marginBottom: '15px'}}
        /></Link>
        <Typography sx={{margin:'15px 15px 0 15px',color: '#d31225',backgroundColor:'#fad7d7',border: '1px solid #d31225',padding: '5px 40px',borderRadius:'5px',display: display}} variant='h6'>Error</Typography>
        <form action='' style={{marginTop:'30px',display: 'flex',flexDirection: 'column'}} onSubmit={handleSubmit}>
            <Typography type="label" sx={{fontWeight:'600',margin:'5px 0'}} variant='subtitle1'>What's your email?</Typography>
            <input 
                placeholder='Email your email.'
                value={user.email}
                type='email'
                onChange={(e)=>setuser({...user,email: e.target.value})}
                required
                style={{width: '400px',height:'40px',padding: '0 10px',marginBottom: '15px'}}
            />
            <Typography sx={{fontWeight:'600',margin:'5px 0'}} variant='subtitle1'>Password</Typography>
            <input 
                placeholder='Password'
                value={user.password}
                type='password'
                required
                onChange={(e)=>setuser({...user,password: e.target.value})}
                style={{width: '400px',height:'40px',padding: '0 10px',marginBottom: '15px'}}
            />
            
            <button type='submit' className='login-btn signup-page-btn' onClick={handleSubmit}>LOG IN</button>
        </form>
        <hr style={{color:'#e2e3e4', width:'400px'}} />
        <Typography variant='subtitle2' sx={{fontWeight:'500', color:'#514536', marginTop:'30px', display:'flex', alignItems:'center'}}>
            Don't have an account? 
            <Link to='/signup'><Typography variant='subtitle2' sx={{fontWeight:'500', marginLeft:'5px',textDecoration: 'underline',color: '#1ed760'}}>Sign Up</Typography></Link> 
        </Typography>
    </Stack>
  )
}

export default LogIn