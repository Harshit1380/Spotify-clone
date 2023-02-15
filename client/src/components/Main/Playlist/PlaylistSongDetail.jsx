import React, { useEffect, useState } from 'react';
import {Stack,Typography,IconButton} from '@mui/material';
import { Favorite,FavoriteBorder,MoreHoriz } from '@mui/icons-material';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add, clear, append } from '../../../Actions/queue';
import { setSong } from '../../../Actions/activeSong';
import { likesong, updateUser } from '../../../api/serverApi';
import {setUser} from '../../../Actions/activeUser';
import {ArrowRight} from '@mui/icons-material';

const PlaylistSongDetail = ({song,i,playlist}) => {
    const [isOpen,setIsOpen] = useState(0);
    const [isOpen2,setIsOpen2] = useState(0);
    const [display,setDisplay] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state?.activeUser);
    const activeSong = useSelector((state) => state.activeSong);
    const isLiked = user?.result?.likedSongs.findIndex((s) => s?.key === (song?.key || song?.track?.key));
    window.addEventListener("mousedown",()=>{
        isOpen===1 && setIsOpen(0);
    });
    const handleAdd = async (name) => {
        const songData = {key:song?.key || song?.track?.key,title: song?.title || song?.track?.title,subtitle: song?.subtitle || song?.track?.subtitle,images: song?.track?.images?.coverart || song?.images?.coverart,uri: song?.hub?.actions[1]?.uri || song?.track?.hub?.actions[1]?.uri};
        let playlist = user?.result?.playlists?.find((p) => p.name===name);
        let songs=[...playlist.songs,songData];
        const updatedUser = {result: {...(user?.result),playlists: [...user?.result?.playlists,{...playlist,songs}]},token: user?.token};
        dispatch(setUser(updatedUser));
        await updateUser(updatedUser?.result,navigate);
    };
    const handleLike = async () => {
        const songData = {key:song?.key || song?.track?.key,title: song?.title || song?.track?.title,subtitle: song?.subtitle || song?.track?.subtitle,images: song?.track?.images?.coverart || song?.images?.coverart,uri: song?.hub?.actions[1]?.uri || song?.track?.hub?.actions[1]?.uri};
        let songs = user?.result?.likedSongs;
        if(songs){
            if(songs.findIndex((song) => song?.key === songData?.key)!==-1) {songs = songs.filter((song)=>song?.key !== songData?.key);}
            else songs=[...songs,songData];
        }else{
            songs = [songData];
        }
        const updatedUser = {result: {...(user?.result),likedSongs: songs},token: user?.token};
        dispatch(setUser(updatedUser));
        await likesong(songData,navigate);
    };
    useEffect(()=> {
        localStorage.setItem("profile",JSON.stringify(user));
    },[user]);
    const handleClick = () => {
        if(!playlist){
            dispatch(clear());
            dispatch(add(song));
            dispatch(setSong(song));
        }else{
            dispatch(append(playlist.slice(i)));
            dispatch(setSong(playlist[i]));
        }
    };

  return (
    <Stack key={song?.key} onMouseOver={()=>setDisplay(1)} onMouseLeave={()=>setDisplay(0)} className='playlist-song-detail' direction='row' position="relative" overflow="visible">
        <Stack direction='row'sx={{alignItems:'center'}}>
            {(activeSong.isPlaying || display===1) && <ArrowRight onClick={handleClick} sx={{color: '#a1a2a3',marginRight: '15px',fontSize: '35px',display:display===1 ? 'flex': 'none',cursor: 'pointer'}} /> }
            <Typography onClick={handleClick} sx={{color: '#a1a2a3',marginRight: '15px',width: '30px',alignItems: 'center',display:display===0 ? 'flex': 'none',cursor: 'pointer'}}>{i+1}</Typography>
            <img 
                src={song?.track?.images?.coverart || song?.images?.coverart || song?.images}
                alt = 'cover'
                style={{width: '50px',height: '50px',marginRight: '15px'}}
            />
            <Stack>
                <Typography sx={{color: activeSong?.isPlaying && activeSong?.song?.key === (song?.key || song?.track?.key) ? '#1ed760':'white'}}>{song?.track?.title || song?.title}</Typography>
                <Typography sx={{color: '#a1a2a3'}}>{song?.track?.subtitle || song?.subtitle}</Typography>
            </Stack>
        </Stack>
        <Stack direction='row'>
            <IconButton disableRipple onClick={handleLike}>{isLiked!==-1 ? <Favorite sx={{color: '#1ed760'}} />:<FavoriteBorder sx={{color: '#a1a2a3'}} />}</IconButton>
            <IconButton onClick={()=> setIsOpen(1-isOpen)} disableRipple sx={{marginLeft: '30px',zIndex:1}}><MoreHoriz sx={{color:'#a1a2a3',fontSize: '40px'}}/></IconButton>
        </Stack>
        <div style={{zIndex: 99,overflow: 'visible',position: 'absolute',width: '200px',backgroundColor:'#282828',right: '50px',bottom:'50px',borderRadius: '5px',transition: 'all 0.3s',flexDirection: 'column',opacity: isOpen,display: isOpen===1 ? 'flex':'none'}}>
            <button className='profile-detail-button' onClick={()=>dispatch(add(song))} style={{fontWeight: '600',color: '#dbdbdb',width: '100%',border: 'none',height: '40px'}}>Add to Queue</button>
            <button className='profile-detail-button' onClick={()=>navigate('/account')} style={{fontWeight: '600',color: '#dbdbdb',width: '100%',border: 'none',height: '40px'}}>Song Radio</button>
            <button className='profile-detail-button' onClick={handleLike} style={{fontWeight: '600',color: '#dbdbdb',width: '100%',border: 'none',height: '40px'}}>{user?.result?.likedSongs.findIndex((p)=> p?.key === song?.key)===-1 ? "Save to liked songs":"Remove from liked songs"}</button>
            {user?.result?.playlists.findIndex((p)=> p?.name === playlist?.name)!==-1 &&<button className='profile-detail-button' onClick={()=>navigate('/account')} style={{fontWeight: '600',color: '#dbdbdb',width: '100%',border: 'none',height: '40px'}}>Remove from playlist</button>}
            <button className='profile-detail-button' onMouseLeave={()=>setIsOpen2(0)} onMouseOver={() => setIsOpen2(1)} style={{fontWeight: '600',color: '#dbdbdb',width: '100%',border: 'none',height: '40px'}}><div style={{display: 'flex',flexDirection:'row',justifyContent: 'space-evenly',alignItems:'center'}}><p sx={{justifySelf: 'center'}}>Add to playlist</p><ArrowRight /></div></button>
            <div onMouseLeave={()=>setIsOpen2(0)} onMouseOver={() => setIsOpen2(1)} style={{zIndex: 99,position: 'absolute',width: '200px',backgroundColor:'#282828',left: '-200px',bottom:'0px',borderRadius: '2px',transition: 'all 0.3s',flexDirection: 'column',opacity: isOpen2,display: isOpen2===1 ? 'flex':'none'}}>
                {user?.result?.playlists?.map((playlist) => <button className='profile-detail-button' onClick={()=>handleAdd(playlist?.name)} style={{fontWeight: '600',color: '#dbdbdb',width: '100%',border: 'none',height: '40px'}}>{playlist?.name}</button>)}
                <button className='profile-detail-button' onClick={()=>{}} style={{fontWeight: '600',color: '#dbdbdb',width: '100%',border: 'none',height: '40px'}}>Create new Playtist</button>
            </div>
        </div>
    </Stack>
  )
}

export default PlaylistSongDetail