import {combineReducers} from 'redux';
import sidebarPopUps from './sidebarPopUps';
import activeBody from './activeBody';
import navbar from './navbar';
import queue from './queue';
import activeSong from './activeSong';
import activeUser from './activeUser';

export default combineReducers({
    sidebarPopUps, activeBody, navbar, queue, activeSong, activeUser
});