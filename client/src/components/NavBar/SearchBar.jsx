import React, { useEffect, useState } from 'react';
import { Paper,IconButton } from '@mui/material';
import {Search,ClearRounded} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm,changeSearchTerm] = useState('');
  useEffect(()=>{
    searchTerm === '' && navigate('/search');
  },[searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchTerm !== '' ? navigate(`/search/${searchTerm}`):navigate('/search');
  }
  return (
    <Paper
      component='form'
      onSubmit={(e) => e.preventDefault()}
      sx={{marginLeft: '20px', borderRadius: '20px', height: '40px', width: '70%',display: 'flex', alignItems: 'center'}}
    >
      <IconButton disableRipple sx={{marginTop: '3px'}} type='submit' onClick={handleSubmit}>
        <Search sx={{color: '#3d3d3d', fontSize: '35px'}} />
      </IconButton>
      <input 
        placeholder='What do you want to listen to?'
        value={searchTerm}
        type='text'
        style={{color: '#3d3d3d',border: 'none',width: '250px',outline: 'none', fontWeight: '500',borderRadius: '20px',height: '30px',alignItems: 'center',marginTop: '3px',paddingLeft: '10px',marginLeft: '-10px',fontSize: '15px'}}
        onChange={(e)=>changeSearchTerm(e.target.value)}
      />
      {!(searchTerm==='') && <IconButton disableRipple sx={{marginTop: '3px'}} type='reset' onClick={()=>changeSearchTerm('')}>
        <ClearRounded sx={{color: '#3d3d3d', fontSize: '35px'}} />
      </IconButton>}
    </Paper>
  )
}

export default SearchBar