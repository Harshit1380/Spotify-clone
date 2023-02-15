import React, { useState } from 'react';
import {Stack, Typography} from '@mui/material';
import {BlackLogo} from '../../utils/Constants';
import {Link, useNavigate} from 'react-router-dom';

const ForgotPassword = ({users}) => {
    const navigate = useNavigate();
    const [display,setDisplay] = useState('none');
    const [error,setError] = useState();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const ValidateEmail = (input) => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(input.match(mailformat)){return true;}
        else{return false;}
    }
    const handleLogin = (e) => {
        e.preventDefault();
        const isEmail = ValidateEmail(username);
        const result = users.find(item => (isEmail ? item.email===username : item.username===username));
        if(result){
            if(password===confirmPassword){
                const i = users.findIndex(item => (isEmail ? item.email===username : item.username===username));
                users[i].password = password
                navigate('/login');
            }else{
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                setDisplay('block');
                setError('Password and Confirm password does not match!');
            }
        }else{
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setDisplay('block');
            setError('Username does not exist!');
        }
    }

    return (
    <Stack type='form' sx={{alignItems:'center', margin:'40px'}}>
        <Link to='/'><img 
            src = {BlackLogo}
            alt = 'logo'
            width='250px'
            style={{marginBottom: '15px'}}
        /></Link>
        <hr style={{color:'#e2e3e4',width:'100%'}} />
        <Typography sx={{margin:'15px 15px 0 15px',color: '#d31225',backgroundColor:'#fad7d7',border: '1px solid #d31225',padding: '5px 40px',borderRadius:'5px',display: display}} variant='h6'>{error}</Typography>
        <Stack sx={{marginTop:'30px'}}>
            <Typography sx={{fontWeight:'600', margin:'5px 0'}} variant='subtitle1'>Email address or username</Typography>
            <input 
                placeholder='Email address or username'
                value={username}
                type='email'
                onChange={(e)=>setUsername(e.target.value)}
                style={{width: '400px',height:'40px',padding: '0 10px',marginBottom: '15px'}}
            />
            <Typography sx={{fontWeight:'600', margin:'5px 0'}} variant='subtitle1'>Password</Typography>
            <input 
                placeholder='Password'
                value={password}
                type='password'
                onChange={(e)=>setPassword(e.target.value)}
                style={{width: '400px',height:'40px',padding: '0 10px',marginBottom: '15px'}}
            />
            <Typography sx={{fontWeight:'600', margin:'5px 0'}} variant='subtitle1'>Confirm Password</Typography>
            <input 
                placeholder='Confirm Password'
                value={confirmPassword}
                type='password'
                onChange={(e)=>setConfirmPassword(e.target.value)}
                style={{width: '400px',height:'40px',padding: '0 10px',marginBottom: '15px'}}
            />
        </Stack>
        <button className='login-btn' type='submit' onClick={handleLogin}>CHANGE PASSWORD</button>
        <hr style={{color:'#e2e3e4', width:'400px'}} />
    </Stack>
  )
}

export default ForgotPassword