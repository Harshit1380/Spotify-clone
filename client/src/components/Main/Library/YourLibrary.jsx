import React, { useEffect, useState } from 'react';
import {Box,Stack,Typography,IconButton} from '@mui/material';
import PlaylistCard from '../PlaylistCard';
import { Link } from 'react-router-dom';
import {Pause,PlayArrow} from '@mui/icons-material';
import { setActiveBody } from '../../../Actions/activeBody';
import { useDispatch, useSelector } from 'react-redux';

const YourLibrary = () => {
    const [isPlaying,setIsPlaying] = useState();
    const user = useSelector((state) => state?.activeUser?.result);
    const dispatch = useDispatch();
    const handleClick = (e)=>{
        e.preventDefault();
        setIsPlaying(!isPlaying);
    }

    useEffect(()=>{
        dispatch(setActiveBody("Your Library"));
    },[]);

    return (
    <Box sx={{width:'100%',flex: '1 1 auto',background: 'linear-gradient(0deg, rgba(18,18,18,1) 0%, rgba(20,23,26,1) 100%)',minHeight: '442px',height: '80.45vh',display: 'block',overflowY: 'scroll'}}>
        <Typography variant='h5' fontFamily= 'Hanken Grotesk , sans-serif' margin='25px 25px 25px 30px' fontWeight='700' color='#fff'>Playlists</Typography>
        <Box sx={{display: 'flex',flexWrap: 'wrap',margin: '30px'}}>
            <Box className='like-card' sx={{borderRadius: '10px', height: '270px',p: 1.5,minWidth:'350px',maxWidth:'430px',flex: '1 1 190px'}}>
                <Link to='/liked'>
                    <Stack direction='column' whiteSpace='initial'>
                        <Typography color='white' variant='subtitle1' height='100px' margin='60px 10px 30px 10px'>{user?.likedSongs?.slice(0,5)?.map((song)=>(' '+ song?.subtitle + '-' + song?.title + ' •'))}</Typography>
                        <Typography fontWeight='bold' color='white' variant='h5' marginLeft='5px' marginTop='15px'>Liked Songs</Typography>
                        <Typography color='white' variant='subtitle1' marginLeft='5px' marginTop='5px'>{user?.likedSongs?.length} liked songs</Typography>
                    </Stack>
                    <span style={{position:'relative' ,top:'-70px',left:'370px',display:'block',justifyContent:'end'}}><IconButton p={0} disableRipple sx={{cursor: 'default'}} onClick={handleClick}>{isPlaying ? 
                                <Pause className='library-play-pause-btn' sx={{color: '#000',backgroundColor: '#1ed760',borderRadius: '50%', fontSize: '30px',p: 1}} /> 
                                : <PlayArrow className='library-play-pause-btn' sx={{color: '#000',backgroundColor: '#1ed760',borderRadius: '50%', fontSize: '30px',p: 1}} />
                                }</IconButton></span>
                </Link>
            </Box>
            {user?.playlists.map((playlist) => (
                <PlaylistCard key={playlist.key} title={playlist.title} img_src={playlist.img_src} subtitle={playlist.subtitle} />
            ))}
        </Box>
    </Box>
  )
}

export default YourLibrary