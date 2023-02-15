import express from 'express';
import { addPlaylist } from '../controllers/index.js';
import {signin,signup,likeSong,getUser,updateUser} from '../controllers/index.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.get('/',auth,getUser);
router.post('/signin',signin);
router.post('/signup',signup);
router.post('/like',auth,likeSong);
router.post('/playlist',auth,addPlaylist);
router.post('/',updateUser);



export default router;