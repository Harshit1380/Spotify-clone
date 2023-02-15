import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../utils/Constants';
import { Home, Search, AddBoxRounded, PlaylistPlayRounded, Favorite } from '@mui/icons-material';
import {NotLoggedInPopup} from '..';
import {useSelector,useDispatch} from 'react-redux';
import { toggleCreate, toggleLibrary, toggleLiked } from '../../Actions/playlist';
import uuid from 'react-native-uuid';
import {addPlaylist} from '../../api/serverApi';
import {setUser} from '../../Actions/activeUser';

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const display = useSelector((state) => state.sidebarPopUps);
  const user = useSelector((state) => state?.activeUser);
  const activeBody = useSelector((state) => state.activeBody);
  const handleAddPlaylist = async () => {
    const playlist = {name: `My Playlist #${user?.result.playlists.length+1}`,key: uuid.v4(),songs: []};
    const playlists = [...user?.result.playlists,playlist];
    const updatedUser = {result: {...(user?.result),playlists},token: user?.token};
    dispatch(setUser(updatedUser));
    await addPlaylist(playlist,navigate);
    navigate(`/playlist/${playlist.key}`);
  }

  const Btn = ({type,icon: Icon}) => {
    const handleClick = () => {
      if(user){
        if(type==='Home') navigate('/');
        else if(type==='Search') navigate('/search');
        else if(type==='Your Library') navigate('/library');
        else if(type==='Liked Songs') navigate('/liked');
        else if(type==='Add Playlist'){
          handleAddPlaylist();
        }
      }
      else{
        if(type==='Home'){
          navigate('/');
        }else if(type === 'Search') navigate('/search');
        else{
          if(type==='Your Library'){dispatch(toggleLibrary())}
          else if(type==='Add Playlist'){dispatch(toggleCreate())}
          else if(type==='Liked Songs'){dispatch(toggleLiked())}
        }
      }
    }

    return(
      <button className='sidebar-btn' onClick={handleClick} style={{color: activeBody===type && 'white'}}>
          <span style={{marginRight: '13px', color: 'gray'}}>
            <Icon sx={{color: activeBody===type && 'white',fontSize: '30px'}} />
          </span>
          <span><Typography sx={{fontWeight: 'bold', fontSize: '14px'}}>{type}</Typography></span>
      </button>
    )
  }




  return (
    <Box sx={{backgroundColor:'#000', height:'100%', minHeight:'470px', p:2, pr:0.4, width:'260px', display:{xs: 'none', sm:'flex'}}}>
      <Stack direction='column' sx={{p:1, pr:0, width:'100%'}}>
        <Link to='/'>
          <img 
            src={Logo}
            alt='logo'
            style={{height:'40px', alignItems:'center', justifyContent:'center'}}
          />
        </Link>
        <Stack direction='column' sx={{margin: '25px 0',minHeight: '115px'}}>
          <Btn type='Home' icon={Home} link='/' />
          <Btn type='Search' icon={Search} link='/search/:' />
          <Btn type='Your Library' icon={PlaylistPlayRounded} />
          <NotLoggedInPopup display={display.library} height='157px' title='Enjoy Your Library' subtitle='Log in to see saved songs, artists and playlists in Your Library.' />
        </Stack>
        <Stack direction='column' sx={{borderBottom: user && '1px solid #3e3e3e', minHeight: '80px'}}>
          <Btn type='Add Playlist' icon={AddBoxRounded} />
          <NotLoggedInPopup display={display.create} height='230px' title='Create a playlist' subtitle='Log in to create and share playlists.' />
          <Btn type='Liked Songs' icon={Favorite} />
          <NotLoggedInPopup display={display.liked} height='260px' title='Enjoy Your Liked Songs' subtitle="Log in to see all your songs you've liked in one easy playlist." />
        </Stack>
        {user && <Box className='playlists-box' sx={{overflowY: 'auto',margin: 0,width:'100%',marginRight: '-10px',p: 0}}>
            <Box backgroundColor='#000' sx={{p: '1px 0'}}>
              <Stack direction='column' sx={{margin:'20px 0px', marginRight:'10px'}}>
                {user?.result?.playlists?.map((playlist) => (
                  <button key={playlist?.key} className='sidebar-btn' onClick={()=>navigate(`/playlists/${playlist?.key}`)} style={{color: activeBody===playlist?.key && 'white'}}>
                    <span><Typography>{playlist?.name}</Typography></span>
                  </button>
                ))}
              </Stack>
            </Box>
          </Box>}
      </Stack>
    </Box>
  )
}

export default SideBar