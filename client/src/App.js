import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { LikedSongs,Playlist,SideBar, NavBar,Home,MusicPlayer,Search,SearchSong,LogIn,SignUp,ForgotPassword, YourLibrary, Queue } from './components';
import { useDispatch,useSelector } from 'react-redux';
import { toggleCreate, toggleLibrary, toggleLiked } from './Actions/playlist';
import { toggleIsOpen} from './Actions/navbar';
import {setUser} from './Actions/activeUser';

const App = () => {
  const dispatch = useDispatch();
  const display = useSelector((state) => state.sidebarPopUps);
  const navbar = useSelector((state)=>state.navbar);
  useEffect(() => {
    dispatch(setUser(JSON.parse(localStorage.getItem("profile"))));
  },[]);

  const windowClick = () => {
    navbar.isOpen && dispatch(toggleIsOpen());
    display.library === 'visible' && dispatch(toggleLibrary());
    display.create === 'visible' && dispatch(toggleCreate());
    display.liked === 'visible' && dispatch(toggleLiked());
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/login' element={<LogIn/>} />
      <Route exact path='/forgotpassword' element={<ForgotPassword/>} />
      <Route exact path='/signup' element={<SignUp/>} />
      <Route path='/*' element={
      <Stack direction='column' display='flex' height='100vh' minHeight='625px' onClick={windowClick}>
        <Stack direction='row' flex='1 1 auto' display='flex'>
          <SideBar/>
          <Stack direction='column' width='100%' display='flex'>
            <NavBar/>
            <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route path='/search/' element={<Search/>} />
              <Route path='/search/:searchTerm' element={<SearchSong/>} />
              <Route path='/library' element={<YourLibrary/>} />
              <Route exact path='/liked' element={<LikedSongs/>} />
              <Route path='/playlists/:id' element={<Playlist/>} />
              <Route path='/queue' element={<Queue/>} />
            </Routes>
          </Stack>
        </Stack>
        <MusicPlayer/>
      </Stack>
      } />
    </Routes>
    </BrowserRouter>
  )
}

export default App;