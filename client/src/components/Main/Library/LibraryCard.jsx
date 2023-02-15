import React,{useState} from 'react';
import {Box,Typography,Stack,IconButton} from '@mui/material';
import {Link} from 'react-router-dom';
import {PlayArrow,Pause} from '@mui/icons-material';

const defaultImage = "https://img.freepik.com/premium-vector/favourite-playlist-icon-songs-music-player-playlist-logo-vector-ui-icon-neumorphic-ui-ux-white-user-interface-web-button_399089-2894.jpg?w=2000";
const likedImg = "https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t500x500.jpg";
const LibraryCard = ({playlist,name}) => {
    const [isPlaying,setIsPlaying] = useState(false);

    const handleClick = (e)=>{
        e.preventDefault();
        setIsPlaying(!isPlaying);
    }

  return (
    <Box className='library-card' sx={{borderRadius: '3px', height: {xs:'60px',md:'80px'}, width: '100%',margin: {xs: '5px 12px', sm: '6.5px 12px', md: '8px 12px'}}}>
        <Link to={`${name? "/liked" : `/playlists/${playlist?.key}`}`} >
            <Stack direction='row' sx={{alignItems:'center', justifyContent:'space-between'}}>
                <Stack direction='row' sx={{alignItems:'center'}}>
                    <Box height={{xs: '60px',md: '80px'}} width={{xs: '60px',md: '80px'}} sx={{display: 'flex',flexWrap: 'wrap'}}>
                        {name ? <img 
                            style={{height: '100%',width:'100%',borderRadius: '3px'}}
                            src={likedImg}
                            alt='cover'
                        /> : <>
                        {playlist?.songs?.length ===0 && <img 
                            style={{height: '100%',width:'100%',borderRadius: '3px'}}
                            src={defaultImage}
                            alt='cover'
                        />}
                        {playlist?.songs?.length >=1 && <img 
                            style={{height: '100%',width:'100%',borderRadius: '3px'}}
                            src={playlist?.songs[0]?.images}
                            alt='cover'
                        />}</>}
                    </Box>
                    <Typography fontWeight='bold' color='white' variant='subtitle1' marginLeft='20px'>{name ? "Liked Songs": playlist?.name}</Typography>
                </Stack>
                <span><IconButton p={0} disableRipple sx={{cursor: 'default'}} onClick={handleClick}>{isPlaying ? 
                            <Pause className='library-play-pause-btn' sx={{color: '#000',backgroundColor: '#1ed760',borderRadius: '50%', fontSize: '30px',p: 1}} /> 
                            : <PlayArrow className='library-play-pause-btn' sx={{color: '#000',backgroundColor: '#1ed760',borderRadius: '50%', fontSize: '30px',p: 1}} />
                            }</IconButton></span>
            </Stack>
        </Link>
    </Box>
  )
}

export default LibraryCard