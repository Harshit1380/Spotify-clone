import React,{useState,useRef,useEffect} from 'react'
import {Box, Typography, Stack, IconButton} from '@mui/material';
import { Favorite,Pause,SkipNext,SkipPrevious,Shuffle,Repeat,QueueMusic,Lyrics,VolumeUp,VolumeDown, FavoriteBorder, PlayArrow, VolumeOff } from '@mui/icons-material';
import {Link} from 'react-router-dom';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {setSong,setIsPlaying,clearSong } from '../../Actions/activeSong';

const imgCover = 'https://media.istockphoto.com/id/1368381747/photo/vinyl-record-with-bank-label-isolated-on-yellow-background.jpg?b=1&s=170667a&w=0&k=20&c=GuCYq4gS91doCz37ffqSeKXrPI1fQ9bAxdaAArY6WtU=';
const isLiked = false;

const MusicPlayer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ref = useRef(null);

    const activeBody = useSelector((state) => state.activeBody);
    const queue = useSelector((state) => state.queue);
    const activeSong = useSelector((state) => state.activeSong);

    const [volume,setVolume] = useState(0.7);
    const [trackStatus,setTrackStatus] = useState(0);
    const [repeat,setRepeat] = useState(false);

    useEffect(() => {
        if(ref.current){
            if(activeSong.isPlaying){
                ref.current.play();
            }else{
                ref.current.pause();
            }
        }
    },[activeSong]);


    useEffect(() => {
        ref.current.volume = volume;
    }, [volume]);
    
    const handleInputChange = (e) => {
        let target = e.target;
        if(target.name ==="track") {ref.current.currentTime = (target.value/100)*ref.current.duration;}
        else setVolume(target.value);
    }
    const handlePlayPause = (e)=>{
        e.preventDefault();
        if(activeSong?.song)  dispatch(setIsPlaying(!activeSong.isPlaying));
    }
    const handleSongEnded = (e)=>{
        e.preventDefault();
        dispatch(setIsPlaying(false));
        const index = queue.findIndex((song) => song?.key===activeSong.song?.key);
        if(index+1 < queue.length){
            dispatch(setSong(queue[index+1]));
        }else{
            repeat ? dispatch(setSong(queue[0])) : dispatch(clearSong());
        }
        dispatch(setIsPlaying(true));
    }
    const handlePrevious = (e)=>{
        e.preventDefault();
        dispatch(setIsPlaying(false));
        const index = queue.findIndex((song) => song?.key===activeSong.song?.key);
        if(index-1 > 0){
            dispatch(setSong(queue[index-1]));
        }else{
            dispatch(setSong(queue[0]));
        }
        dispatch(setIsPlaying(true));
    }

  return (
    <Box backgroundColor='#181818' flex='0 0 95px'>
        <Stack direction='row' height='85px' margin='5px' marginLeft='15px' justifyContent='space-between'>
            <Stack direction='row' height='100%' alignItems='center' marginTop='5px'>
                <Link to='/playlist/id'>
                    <img 
                        src={activeSong.song ? (activeSong?.song?.track?.images?.coverart || activeSong?.song?.images?.coverart || activeSong?.song?.images):imgCover}
                        alt='song-cover'
                        height='50px'
                        width='50px'
                    />
                </Link>
                <Stack marginLeft='10px' marginRight='20px'>
                    <Typography color='white' variant='subtitle1'>{activeSong.song ? (activeSong?.song?.track?.title || activeSong?.song?.title):"Song Name"}</Typography>
                    <Typography color='white' variant='subtitle2'>{activeSong.song ? (activeSong?.song?.track?.subtitle || activeSong?.song?.subtitle):"Artist Name"}</Typography>
                </Stack>
                <IconButton>
                    {isLiked ? <Favorite sx={{color:'white'}}/> : <FavoriteBorder sx={{color:'white'}}/>}
                </IconButton>
            </Stack>
            <Stack direction='column' width='550px' alignItems='center'>
                <Stack direction='row' height='65%' alignItems='flex-end' spacing={0.5} marginBottom='-10px'>
                    <IconButton disableRipple>
                        <Shuffle sx={{color:'white',fontSize: '22px'}}/>
                    </IconButton>
                    <IconButton disableRipple onClick={handlePrevious}>
                        <SkipPrevious sx={{color:'white',fontSize: '22px'}}/>
                    </IconButton>
                    <IconButton disableRipple onClick={handlePlayPause}>{activeSong.isPlaying ? 
                        <Pause sx={{marginBottom: '-5px',color: '#000',backgroundColor: '#fff',borderRadius: '50%', fontSize: '22px',p: 0.85}} /> 
                        : <PlayArrow sx={{marginBottom: '-5px',color: '#000',backgroundColor: '#fff',borderRadius: '50%', fontSize: '22px',p: 0.85}} />}
                    </IconButton>
                    <IconButton disableRipple onClick={handleSongEnded}>
                        <SkipNext sx={{color:'white',fontSize: '22px'}}/>
                    </IconButton>
                    <IconButton disableRipple onClick={()=> setRepeat(!repeat)}>
                        <Repeat sx={{color:repeat ?'#1ed760':'white',fontSize: '22px'}}/>
                    </IconButton>
                </Stack>
                <Stack direction='row' alignItems='center' width='100%'>
                    <Typography color='white' fontSize='12px'>{trackStatus > 0 ? `${Math.floor(((ref.current.duration)*trackStatus/100)/60)}:${((Math.floor((ref.current.duration)*trackStatus/100))%60)<10 ? '0':''}${(Math.floor((ref.current.duration)*trackStatus/100))%60}`: '00:00'}</Typography>
                    <input value={trackStatus ? trackStatus : 0} name="track" type='range' min={0} max={100} onChange={handleInputChange} style={{height: '4px',width: '90%',margin: '15px 10px',backgroundSize: trackStatus + '% 100%'}} />
                    <Typography color='white' fontSize='12px'>{ref.current && ref.current.src ? `${Math.floor((ref.current.duration)/60)}:${Math.floor((ref.current.duration))%60}`:'00:00'}</Typography>
                </Stack>
            </Stack>
            <audio src={activeSong?.song?.hub?.actions[1]?.uri || activeSong?.song?.track?.hub?.actions[1]?.uri || activeSong?.song?.uri} ref={ref} onEnded={handleSongEnded} onTimeUpdate={(event) => setTrackStatus((event.target.currentTime/event.target.duration)*100)}/>
            <Stack direction='row' width='220px' alignItems='center' gap={0.3} marginRight='10px'>
                <IconButton disableRipple>
                    <Lyrics sx={{color:'white',fontSize:'20px'}}/>
                </IconButton>
                <IconButton disableRipple onClick={()=>{activeBody==="queue" ? navigate('/'):navigate('/queue');}}>
                    <QueueMusic sx={{color:activeBody==="queue"?'#1ed760':'white',fontSize:'20px'}}/>
                </IconButton>
                <IconButton disableRipple onClick={() => setVolume(volume === 0 ? 0.7 : 0)}>
                    {volume <= 1 && volume > 0.5 && <VolumeUp sx={{color:'white',fontSize:'20px'}} />}
                    {volume <= 0.5 && volume > 0 && <VolumeDown sx={{color:'white',fontSize:'20px'}} />}
                    {volume <= 0 && <VolumeOff sx={{color:'white',fontSize:'20px'}} />}
                </IconButton>
                <input step={0.07} type='range' name='volume' value={volume} min={0} max={1} onChange={handleInputChange} style={{height: '4px',width: '100%',margin: '15px 0',backgroundSize: volume*100 + '% 100%'}} />
            </Stack>
        </Stack>
    </Box>
  )
}

export default MusicPlayer;