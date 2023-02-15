import React, { useState } from 'react'
import {Box,Stack,IconButton, Typography} from '@mui/material';
import { PlayArrow,Pause,MoreHoriz, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Link,useParams } from 'react-router-dom';
import PlaylistSongDetail from './PlaylistSongDetail';
import {useSelector} from 'react-redux';
import { charts } from '../../../utils/Constants';
import { fetchFromAPI } from '../../../api/fetchFromAPI';

const color1 = 'rgb(21,21,80)';
const color4 = 'rgb(18,18,60)';
const color3 = 'rgb(45,45,160)';
const defaultImage = "https://img.freepik.com/premium-vector/favourite-playlist-icon-songs-music-player-playlist-logo-vector-ui-icon-neumorphic-ui-ux-white-user-interface-web-button_399089-2894.jpg?w=2000";


const Playlist = () => {
    const [isPlaying,setIsPlaying] = useState(false);
    const [songs,setSongs] = useState([]);
    const user = useSelector((state)=> state?.activeUser);
    const {id} = useParams();
    let playlist ;
    if(user?.result?.playlists.findIndex((p) => p?.key === id) !==-1){
        playlist = user?.result?.playlists.find((p) => p?.key === id);
        setSongs(playlist?.songs);
    }else{
        const i = parseInt(id);
        playlist = charts[i];
        if(playlist.countryCode){
            fetchFromAPI(`v1/charts/country?country_code=${playlist.countryCode}`)
                .then((data)=> {setSongs(data);});
        }else if(playlist.genre){
            fetchFromAPI(`v1/charts/genre-world?genre_code=${playlist.genre}`)
                .then((data)=> {setSongs(data);});
        }else{
            fetchFromAPI(`v1/charts/world`)
                .then((data)=> {setSongs(data);});
        }
    }

    const handleClick = (e)=>{
        e.preventDefault();
    }
    console.log(songs);
  return (
    <Box sx={{overflowY: 'scroll'}}>
        <Box sx={{background: `linear-gradient(0deg, ${color1} 0%, ${color3} 100%)`,display: 'flex',flexDirection: 'row',alignItems: 'flex-end',padding: '25px 30px',flex: '0 0 250px'}}>
            <Box height={{sm: '196px',md: '236px'}} width={{sm: '196px',md: '236px'}} sx={{display: 'flex',flexWrap: 'wrap',boxShadow: `0px 0px 20px ${color4}`}}>
                {!songs?.length ? <img 
                    style={{flex: '1 1',minHeight:'98px',maxHeight: '118px',minWidth:'98px',maxWidth: '118px'}}
                    src={defaultImage}
                    alt='cover'
                />:<>
                <img 
                    style={{flex: '1 1',minHeight:'98px',maxHeight: '118px',minWidth:'98px',maxWidth: '118px'}}
                    src={songs[0]?.images?.coverart}
                    alt='cover'
                />
                {songs?.length>3 && <img 
                    style={{flex: '1 1',minHeight:'98px',maxHeight: '118px',minWidth:'98px',maxWidth: '118px'}}
                    src={songs[1]?.images?.coverart}
                    alt='cover'
                />}
                {songs?.length>3 && <img 
                    style={{flex: '1 1',minHeight:'98px',maxHeight: '118px',minWidth:'98px',maxWidth: '118px'}}
                    src={songs[1]?.images?.coverart}
                    alt='cover'
                />}
                {songs?.length>3 && <img 
                    style={{flex: '1 1',minHeight:'98px',maxHeight: '118px',minWidth:'98px',maxWidth: '118px'}}
                    src={songs[1]?.images?.coverart}
                    alt='cover'
                />}</>}
            </Box>
            <Box sx={{color: 'white',marginLeft: '20px'}}>
                <Typography variant='subtitle2' sx={{fontWeight: 600}}>PLAYLIST</Typography>
                <Typography sx={{fontWeight: 700,fontSize: '90px'}}>{playlist?.title}</Typography>
                <Box sx={{display: 'flex',flexDirection: 'row'}}>
                    {user && <Link to='/account'><Typography className='link' sx={{color:'white',fontWeight: 'bold',marginRight: '5px'}}>{user?.username}</Typography></Link>}
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
        <Stack sx={{backgroundColor: "#121212",padding: '0 10px',overflow: "visible"}}>
            {songs.map((song,i)=>(
                <PlaylistSongDetail song={song} i={i} />
            ))}
        </Stack>
    </Box>
  )
}

export default Playlist