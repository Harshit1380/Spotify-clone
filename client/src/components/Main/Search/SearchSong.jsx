import React,{useState,useEffect} from 'react';
import { Typography,Box,Stack,IconButton } from '@mui/material';
import {PlaylistCard} from '../..';
import { fetchFromAPI } from '../../../api/fetchFromAPI';
import { useParams } from 'react-router-dom';
import {Pause,PlayArrow} from '@mui/icons-material';
import { setActiveBody } from '../../../Actions/activeBody';
import PlaylistSongDetail from '../Playlist/PlaylistSongDetail';

const SearchSong = () => {
    const {searchTerm} = useParams();
    const [songs,setSongs] = useState([]);
    const [artists,setArtists] = useState([]);
    const [isPlaying,setIsPlaying] = useState(false);
    const handleClick = (e)=>{
        e.preventDefault();
        setIsPlaying(!isPlaying);
    }
    useEffect(()=>{
        setActiveBody('Search');
    },[]);
    useEffect(()=>{
        fetchFromAPI(`search?q=${searchTerm}`)
            .then((data) => {
                setArtists(data?.artists?.hits);
                setSongs(data?.data);
            });
    },[searchTerm])
    
    if(!artists || !songs) return (
        <Box sx={{width:'100%', display:'flex', justifyContent:'center', background: 'linear-gradient(0deg, rgba(18,18,18,1) 0%, rgba(20,23,26,1) 100%)',minHeight: '442px',height: '80.45vh'}}>
            <Typography variant='h4' sx={{marginTop:'30px', color:'#c2c2c2', alignText:'center', fontFamily: 'Hanken Grotesk , sans-serif', fontWeight:'bold'}}>No Results Found</Typography>
        </Box>
    );

  return (
    <Box width='100%' sx={{background: 'linear-gradient(0deg, rgba(18,18,18,1) 0%, rgba(20,23,26,1) 100%)',minHeight: '442px',height: '80.45vh',display: 'block',overflowY: 'scroll'}}>
      <Stack direction={{sm: 'column' , md: 'row'}} sx={{justifyContent:'space-evenly'}}>
        <Box sx={{flex:'1 1 300px', maxWidth:'520px', marginRight:'80px'}}>
            <Typography variant='h5' sx={{fontFamily: 'Hanken Grotesk , sans-serif', margin:'25px 25px 0 30px', fontWeight:'700', color:'#fff'}}>Top Artist result</Typography>
            <Box className='play-card' sx={{width:'90%', height:'225px', borderRadius:'15px', margin:'15px 50px'}}>
                <img 
                    src={artists[0]?.artist?.avatar}
                    alt={artists[0]?.artist?.name}
                    style={{borderRadius: '50%',height: '100px', width: '100px',margin: '15px 15px 10px 15px'}}
                />
                <Stack direction='row' sx={{justifyContent:'space-between'}}>
                <Box>
                <Typography variant='h4' sx={{marginLeft:'15px', fontFamily: 'Hanken Grotesk , sans-serif', fontWeight:'700', color:'#fff'}}>{artists[0]?.artist?.name}</Typography>
                <Typography variant='subtitle2' sx={{backgroundColor:'#131313', width:'50px', padding:'3px 15px', borderRadius:'20px', color:'#f9f9f9', marginTop:'10px', marginLeft:'20px', fontFamily: 'Hanken Grotesk , sans-serif', fontWeight:'700'}}>ARTIST</Typography>
                </Box>
                <span style={{display:'block',justifyContent:'end',marginRight: '25px'}}><IconButton p={0} disableRipple sx={{cursor: 'default'}} onClick={handleClick}>{isPlaying ? 
                        <Pause className='library-play-pause-btn' sx={{color: '#000',backgroundColor: '#1ed760',borderRadius: '50%', fontSize: '30px',p: 1}} /> 
                        : <PlayArrow className='library-play-pause-btn' sx={{color: '#000',backgroundColor: '#1ed760',borderRadius: '50%', fontSize: '30px',p: 1}} />
                        }</IconButton></span>
                </Stack>
            </Box>
        </Box>
        <Box sx={{flex:'1 1 300px', maxWidth:'520px', marginRight:'80px'}}>
            <Typography variant='h5' sx={{fontFamily: 'Hanken Grotesk , sans-serif', margin:'25px 25px 0 30px', fontWeight:'700', color:'#fff'}}>Top Song result</Typography>
            <Box className='play-card' sx={{width:'90%', height:'225px', borderRadius:'15px', margin:'15px 50px'}}>
                <img 
                    src={songs[0]?.track?.images?.coverart}
                    alt={songs[0]?.track?.title}
                    style={{borderRadius: '50%',height: '100px', width: '100px',margin: '15px 15px 10px 15px'}}
                />
                <Stack direction='row' sx={{justifyContent:'space-between'}}>
                <Box>
                <Typography variant='h4' sx={{marginLeft:'15px', fontFamily: 'Hanken Grotesk , sans-serif', fontWeight:'700', color:'#fff'}}>{songs[0]?.track?.title}</Typography>
                <Stack direction='row' sx={{alignItems:'center', marginLeft:'15px'}}><Typography variant='subtitle2' sx={{color:'gray', marginLeft:'5px', marginTop:'13px'}}>{songs[0]?.track?.subtitle}</Typography>
                <Typography sx={{backgroundColor:'#131313', width:'50px', padding:'3px 15px', borderRadius:'20px', color:'#f9f9f9', marginTop:'10px', marginLeft:'20px', variant:'subtitle2', fontFamily: 'Hanken Grotesk , sans-serif', fontWeight:'700'}}>SONG</Typography></Stack>
                </Box>
                <span style={{display:'block',justifyContent:'end',marginRight: '25px'}}><IconButton p={0} disableRipple sx={{cursor: 'default'}} onClick={handleClick}>{isPlaying ? 
                        <Pause className='library-play-pause-btn' sx={{color: '#000',backgroundColor: '#1ed760',borderRadius: '50%', fontSize: '30px',p: 1}} /> 
                        : <PlayArrow className='library-play-pause-btn' sx={{color: '#000',backgroundColor: '#1ed760',borderRadius: '50%', fontSize: '30px',p: 1}} />
                        }</IconButton></span>
                </Stack>
            </Box>
        </Box>
      </Stack>
      <Box sx={{flex:'1 1 300px'}}>
          <Typography variant='h5' sx={{fontFamily: 'Hanken Grotesk , sans-serif', margin:'25px 25px 20px 30px', fontWeight:'700', color:'#fff'}}>Songs</Typography>
          <Stack sx={{backgroundColor: "#121212",padding: '0 10px'}}>
                {songs.slice(0,10).map((song,i)=>(
                    <PlaylistSongDetail song={song?.track} i={i} />
                ))}
            </Stack>
      </Box>
      <Typography variant='h5' sx={{fontFamily: 'Hanken Grotesk , sans-serif', margin:'25px 25px 0 30px', fontWeight:'700', color:'#fff'}}>Artists</Typography>
      <Stack sx={{direction:'row', marginLeft:'35px', marginTop:'30px', flexWrap:'wrap', height:'300px'}}>
        {artists.slice(0,5).map((artist) => (
          <PlaylistCard key={artist?.artist?.adamid} subtitle='Artist' title ={artist?.artist?.name} img_src={artist?.artist?.avatar} artist={true} />
        ))}
      </Stack>
    </Box>
  )
}

export default SearchSong