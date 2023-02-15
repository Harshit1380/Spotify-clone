import React, { useEffect, useState } from 'react'
import {Box,Stack,IconButton, Typography} from '@mui/material';
import { PlayArrow,Pause,MoreHoriz, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import PlaylistSongDetail from '../Playlist/PlaylistSongDetail';
import {useDispatch, useSelector} from 'react-redux';
import { setActiveBody } from '../../../Actions/activeBody';

const color1 = 'rgb(21,21,80)';
const color4 = 'rgb(18,18,60)';
const color3 = 'rgb(45,45,160)';

const LikedSongs = () => {
    const user = useSelector((state) => state?.activeUser?.result);
    const songs = user?.likedSongs;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isPlaying,setIsPlaying] = useState(false);
    const handleClick = (e)=>{
        e.preventDefault();
    }
    useEffect(() => {
        dispatch(setActiveBody("Liked Songs"));
        if(!user) navigate("/");
      },[]);

    if(!songs) return (
        <Box sx={{width:'100%', display:'flex', justifyContent:'center', background: 'linear-gradient(0deg, rgba(18,18,18,1) 0%, rgba(20,23,26,1) 100%)',minHeight: '442px',height: '80.45vh'}}>
            <Typography variant='h4' sx={{marginTop:'30px', color:'#c2c2c2', alignText:'center', fontFamily: 'Hanken Grotesk , sans-serif', fontWeight:'bold'}}>No Results Found</Typography>
        </Box>
    );
  return (
    <Box sx={{overflowY: 'scroll'}}>
        <Box sx={{background: `linear-gradient(0deg, ${color1} 0%, ${color3} 100%)`,display: 'flex',flexDirection: 'row',alignItems: 'flex-end',padding: '25px 30px',flex: '0 0 250px'}}>
            <Box height={{sm: '196px',md: '236px'}} width={{sm: '196px',md: '236px'}} sx={{display: 'flex',flexWrap: 'wrap',boxShadow: `0px 0px 20px ${color4}`}}>
                <img 
                    style={{flex: '1 1',minHeight:'98px',maxHeight: '118px',minWidth:'98px',maxWidth: '118px'}}
                    src={songs[0]?.track?.images?.coverart || songs[0]?.images}
                    alt='cover'
                />
                {songs.length>3 && <img 
                    style={{flex: '1 1',minHeight:'98px',maxHeight: '118px',minWidth:'98px',maxWidth: '118px'}}
                    src={songs[1]?.track?.images?.coverart || songs[1]?.images}
                    alt='cover'
                />}
                {songs.length>3 && <img 
                    style={{flex: '1 1',minHeight:'98px',maxHeight: '118px',minWidth:'98px',maxWidth: '118px'}}
                    src={songs[2]?.track?.images?.coverart || songs[2]?.images}
                    alt='cover'
                />}
                {songs.length>3 && <img 
                    style={{flex: '1 1',minHeight:'98px',maxHeight: '118px',minWidth:'98px',maxWidth: '118px'}}
                    src={songs[3]?.track?.images?.coverart || songs[3]?.images}
                    alt='cover'
                />}
            </Box>
            <Box sx={{color: 'white',marginLeft: '20px'}}>
                <Typography variant='subtitle2' sx={{fontWeight: 600}}>PLAYLIST</Typography>
                <Typography sx={{fontWeight: 700,fontSize: '90px'}}>Liked Songs</Typography>
                <Box sx={{display: 'flex',flexDirection: 'row'}}>
                    {user && <Link to='/account'><Typography className='link' sx={{color:'white',fontWeight: 'bold',marginRight: '5px'}}>{user.username}</Typography></Link>}
                    <Typography>{' • '+songs.length+' '}songs</Typography>
                </Box>
            </Box>
        </Box>
        <Box sx={{background: `linear-gradient(180deg, ${color4} 5%, #121212 100%)`}}>
            <Box sx={{padding: '20px',height: '50px'}}>
                <span><IconButton p={0} disableRipple sx={{cursor: 'default'}} onClick={handleClick}>{isPlaying ? 
                    <Pause className='library-play-pause-btn' sx={{color: '#000',backgroundColor: '#1ed760',borderRadius: '50%', fontSize: '40px',p: 1}} /> 
                    : <PlayArrow className='library-play-pause-btn' sx={{color: '#000',backgroundColor: '#1ed760',borderRadius: '50%', fontSize: '40px',p: 1}} />
                    }</IconButton>
                </span>
                <IconButton sx={{marginLeft: '30px'}}><MoreHoriz sx={{color:'#a1a2a3',fontSize: '40px'}}/></IconButton>
            </Box>
            <Stack direction='row' sx={{marginLeft: '50px',marginTop: '20px',position: 'sticky'}}>
                <Typography sx={{color: '#a1a2a3',marginRight: '30px'}}>#</Typography>
                <Typography sx={{color: '#a1a2a3'}}>TITLE</Typography>
            </Stack>
            <hr style={{width: '95%',size: '1px',border: '0.5px solid #212224',alignSelf: 'center',marginBottom: '10px',margin: '0 auto'}} />
        </Box>
        <Stack sx={{backgroundColor: "#121212",padding: '0 10px',overflow: 'visible'}}>
            {songs.map((song,i)=>(
                <PlaylistSongDetail key={song?.key} song={song} i={i} playlist={songs} />
            ))}
        </Stack>
    </Box>
  )
}

export default LikedSongs