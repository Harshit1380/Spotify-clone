import React,{useState} from 'react';
import {Box,Typography,Stack,IconButton} from '@mui/material';
import {Link} from 'react-router-dom';


const SearchCard = ({title,img_src,color,index}) => {

  return (
    <Box sx={{backgroundColor: color,borderRadius: '15px', height: '200px', minWidth: '200px',margin: '20px 20px',flex: '1 1 200px'}}>
        <Link to={`/playlists/${index}`} >
          <Box height='100%' width='100%'>
            <Typography fontWeight='bold' color='white' variant='h6' marginLeft='25px' marginTop='25px'>{title.slice(10)}</Typography>
            <img 
                src= {img_src}
                alt={title.slice(10)}
                style={{width: '100px',height: '100px',borderRadius: '5px',transform: 'rotate(30deg)',position: 'relative',left: '130px',top: '50px'}}
            />
          </Box>
        </Link>
    </Box>
  )
}

export default SearchCard