import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PlaylistSongDetail from '../Playlist/PlaylistSongDetail';
import { Typography,Stack } from '@mui/material';
import { setActiveBody } from '../../../Actions/activeBody';

const Queue = () => {
    const data = useSelector((state) => state.queue);
    const activeSong = useSelector((state)=>state.activeSong);

    const dispatch = useDispatch();
    const index = data.findIndex((p) => p === activeSong.song);

  useEffect(()=> {
    dispatch(setActiveBody("queue"));
  },[]);

  return (
    <Stack sx={{width:'100%',flex: '1 1 auto',background: 'linear-gradient(0deg, rgba(18,18,18,1) 0%, rgba(20,23,26,1) 100%)',minHeight: '442px',height: '80.45vh',display: 'block',overflowY: 'scroll'}}>
        <Typography variant='h5' sx={{fontFamily: 'Hanken Grotesk , sans-serif', margin:'25px 25px 0 30px', fontWeight:'700', color:'#fff'}}>Queue</Typography>
        {data.length ===0 ? 
        <Typography variant='h6' sx={{fontFamily: 'Hanken Grotesk , sans-serif', margin:'20px auto', fontWeight:'700', color:'#838383'}}>Nothing in Queue</Typography>
        :data.length ===1 ? <>
            <Typography variant='h6' sx={{fontFamily: 'Hanken Grotesk , sans-serif', margin:'20px 25px 0 30px', fontWeight:'700', color:'#838383'}}>Now Playing</Typography>
            <PlaylistSongDetail song={data[index]} i={0} />
        </> : <>
            <Typography variant='h6' sx={{fontFamily: 'Hanken Grotesk , sans-serif', margin:'20px 25px 0 30px', fontWeight:'700', color:'#838383'}}>Now Playing</Typography>
            <PlaylistSongDetail song={data[index]} i={0} />
            <Typography variant='h6' sx={{fontFamily: 'Hanken Grotesk , sans-serif', margin:'20px 25px 0 30px', fontWeight:'700', color:'#838383'}}>Next Up</Typography>
            {data.slice(index+1).map((song,i)=>(
                <PlaylistSongDetail song={song} i={i+1} />
            ))}
        </>}
    </Stack>
  )
}

export default Queue;