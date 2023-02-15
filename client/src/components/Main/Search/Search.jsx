import React,{useEffect} from 'react';
import { Typography,Box } from '@mui/material';
import SearchCard from './SearchCard';
import { charts } from '../../../utils/Constants';
import { setActiveBody } from '../../../Actions/activeBody';
import { useDispatch } from 'react-redux';


const Search = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setActiveBody("Search"));
  },[]);
  return (
    <Box width='100%' sx={{flex: '1 1 auto',background: 'linear-gradient(0deg, rgba(18,18,18,1) 0%, rgba(20,23,26,1) 100%)',minHeight: '442px',height: '80.45vh',display: 'block',overflowY: 'scroll'}}>
      <Typography variant='h5' sx={{fontFamily:'Hanken Grotesk , sans-serif', margin:'25px 25px 0 30px', fontWeight:'700', color:'#fff'}}>Browse All</Typography>
      <Box sx={{width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
        {charts.map((genre,index) => (
            <SearchCard key={genre.key} title={genre.title} img_src={genre.img_src} color={genre.color} index={index} />
        ))}
      </Box>
    </Box>
  )
}

export default Search