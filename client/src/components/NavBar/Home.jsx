import React, { useEffect } from 'react';
import { Typography,Grid,Box,Stack } from '@mui/material';
import {LibraryCard,PlaylistCard} from '../..'; 
import {Link} from 'react-router-dom';
import { charts } from '../../../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import {setActiveBody} from '../../../Actions/activeBody';

const date = new Date().toJSON().slice(11,16);
const time = (parseInt(date.slice(3,5))+30)/60 + parseInt(date.slice(0,2)) + 5;


const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.activeUser?.result);
  useEffect(() => {
    dispatch(setActiveBody("Home"));
  },[]);

  return (
    <Box sx={{width:'100%',flex: '1 1 auto',background: 'linear-gradient(0deg, rgba(18,18,18,1) 0%, rgba(20,23,26,1) 100%)',minHeight: '442px',height: '80.45vh',display: 'block',overflowY: 'scroll'}}>
      {user && <Typography variant='h4' sx={{fontFamily: 'Hanken Grotesk , sans-serif', margin:'25px 25px 0 30px', fontWeight:'700', color:'#fff'}}>Good {time<12 ? 'Morning' : time<18 ? 'Afternoon' : 'Evening'}</Typography>}
      {user && 
      <Grid container sx={{spacing:0, marginTop: '15px', marginLeft:'15px', width:'97%'}}>
        {user?.playlists.map((playlist) => (
          <Grid item xs={12} sm={6} md={4} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <LibraryCard playlist={playlist} />
          </Grid>))}
      </Grid>}
      <Stack direction='row' justifyContent='space-between'>
        <Link to='/search/'><Typography variant='h5' sx={{fontFamily: 'Hanken Grotesk , sans-serif', margin:'25px 25px 0 30px', fontWeight:'700', color:'#fff'}} className='link'>Charts</Typography></Link>
        <Link to='/search/'><Typography variant='subtitle2' sx={{fontFamily: 'Hanken Grotesk , sans-serif', margin:'25px 25px 0 30px', fontWeight:'700', color:'#b3b3b3'}} className='link'>SHOW ALL</Typography></Link>
      </Stack>
      <Stack direction='row' sx={{marginLeft:'35px', marginTop:'30px'}}>
        {charts.slice(0,5).map((genre,index) => (
          <Link to={`/playlists/${index}`} ><PlaylistCard key={genre.key} subtitle={genre.subtitle} title ={genre.title} img_src={genre.img_src} /> </Link>
        ))}
      </Stack>
    </Box>
  )
}

export default Home