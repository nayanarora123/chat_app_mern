import express from 'express';
import { 
    createChatRoom, 
    getChatRoomOfUser 
} from './chatRoom.controller.js';

const router = express.Router();

router.post('/', createChatRoom);
router.get('/:userId', getChatRoomOfUser);

export default router;