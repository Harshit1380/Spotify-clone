import React, { useState, useEffect } from 'react';
import {Stack, Typography,Box } from '@mui/material';
import {BlackLogo} from '../../utils/Constants';
import {Link, useNavigate} from 'react-router-dom';
import { signup } from '../../api/serverApi';
import { signUp } from '../../Actions/activeUser';
import { useDispatch } from 'react-redux';

const SignUp = () => {
    const navigate = useNavigate();
    const [display,setDisplay] = useState('none');
    const [user,setUser] = useState({email: "",password: "",confirmPassword: "",username: "",gender: ""});
    const dispatch = useDispatch();
    useEffect(()=>{
        if(localStorage.getItem("profile")) navigate('/');
    },[]);
    const handleSubmit = async (e) => {
        if(user.email && user.password && user.confirmPassword && user.username){
            e.preventDefault();
            dispatch(signUp(user));
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
        <Typography sx={{fontWeight:'700' ,margin:'15px'}} variant='h5'>Sign up for free to start listening.</Typography>
        <Typography sx={{margin:'15px 15px 0 15px',color: '#d31225',backgroundColor:'#fad7d7',border: '1px solid #d31225',padding: '5px 40px',borderRadius:'5px',display: display}} variant='h6'>Error</Typography>
        <form action='' style={{marginTop:'30px',display: 'flex',flexDirection: 'column'}} onSubmit={handleSubmit}>
            <Typography type="label" for="email" sx={{fontWeight:'600',margin:'5px 0'}} variant='subtitle1'>What's your email?</Typography>
            <input 
                placeholder='Email your email.'
                value={user.email}
                type='email'
                onChange={(e)=>setUser({...user,email: e.target.value})}
                required
                style={{width: '400px',height:'40px',padding: '0 10px',marginBottom: '15px'}}
            />
            <Typography sx={{fontWeight:'600',margin:'5px 0'}} variant='subtitle1'>Password</Typography>
            <input 
                placeholder='Password'
                value={user.password}
                type='password'
                required
                onChange={(e)=>setUser({...user,password: e.target.value})}
                style={{width: '400px',height:'40px',padding: '0 10px',marginBottom: '15px'}}
            />
            <Typography sx={{fontWeight:'600',margin:'5px 0'}} variant='subtitle1'>Confirm your password</Typography>
            <input 
                placeholder='Email your password again'
                value={user.confirmPassword}
                type='password'
                required
                onChange={(e)=>setUser({...user,confirmPassword: e.target.value})}
                style={{width: '400px',height:'40px',padding: '0 10px',marginBottom: '15px'}}
            />
            <Typography sx={{fontWeight:'600',margin:'5px 0'}} variant='subtitle1'>What should we call you?</Typography>
            <input 
                placeholder='Enter a profile name.'
                value={user.username}
                type='text'
                required
                onChange={(e)=>setUser({...user,username: e.target.value})}
                style={{width: '400px',height:'40px',padding: '0 10px',marginBottom: '15px'}}
            />
            <Typography variant='subtitle2' sx={{fontWeight:'500', color:'#514536', marginTop:'-5px'}}>This appears on your profile.</Typography>
            <Typography sx={{fontWeight:'600', margin:'5px 0', marginTop:'20px'}} variant='subtitle1'>What's your gender?</Typography>
            <Box sx={{display:'flex', marginBottom:'40px'}}>
                <Box>
                    <input type='radio' onChange={(e) => setUser({...user,gender: e.target.value})} id='male' name='gender' value='Male' />
                    <label for='male' style={{marginLeft: '10px',marginRight: '50px'}}>Male</label>
                </Box>
                <Box>
                    <input id='female' onChange={(e) => setUser({...user,gender: e.target.value})}  type='radio' name='gender' value='Female' />
                    <label for='female' style={{marginLeft: '10px'}}>Female</label>
                </Box>
            </Box>
            <button type='submit' className='login-btn signup-page-btn' onClick={handleSubmit}>SIGN UP</button>
        </form>
        <hr style={{color:'#e2e3e4', width:'400px'}} />
        <Typography variant='subtitle2' sx={{fontWeight:'500', color:'#514536', marginTop:'30px', display:'flex', alignItems:'center'}}>
            Have an account? 
            <Link to='/login'><Typography variant='subtitle2' sx={{fontWeight:'500', marginLeft:'5px',textDecoration: 'underline',color: '#1ed760'}}>Log in</Typography></Link> 
        </Typography>
    </Stack>
  )
}

export default SignUp