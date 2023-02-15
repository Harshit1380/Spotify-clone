import React,{useState} from 'react';
import {Box,Typography,Stack,IconButton} from '@mui/material';
import {PlayArrow,Pause} from '@mui/icons-material';


const PlaylistCard = ({title,subtitle,img_src,artist}) => {
    const [isPlaying,setIsPlaying] = useState(false);

    const handleClick = (e)=>{
        e.preventDefault();
        setIsPlaying(!isPlaying);
    }

  return (
    <Box className='play-card' sx={{borderRadius: '3px', height: '270px',margin: '0 13px',p: 1.5,minWidth:'150px',maxWidth:'230px',flex: '1 1 190px',position: 'relative'}}>
        <Stack direction='column' whiteSpace='initial'>
            <img 
                src= {img_src}
                alt={title}
                style={{width: '100%',height:'190px',borderRadius: artist ? '50%' : '5px'}}
            />
            <Typography fontWeight='bold' color='white' variant='subtitle1' marginLeft='5px' marginTop='15px'>{title}</Typography>
            <Typography color='gray' variant='subtitle2' marginLeft='5px' marginTop='5px'>{subtitle}</Typography>
        </Stack>
        <span style={{position:'absolute' ,top:'180px',left:'140px',display:'block',justifyContent:'end'}}><IconButton p={0} disableRipple sx={{cursor: 'default'}} onClick={handleClick}>{isPlaying ? 
                    <Pause className='library-play-pause-btn' sx={{color: '#000',backgroundColor: '#1ed760',borderRadius: '50%', fontSize: '30px',p: 1}} /> 
                    : <PlayArrow className='library-play-pause-btn' sx={{color: '#000',backgroundColor: '#1ed760',borderRadius: '50%', fontSize: '30px',p: 1}} />
                    }</IconButton></span>
    </Box>
  )
}

export default PlaylistCard