import express from 'express';
import { 
    createMessage,
    getMessages
} from './chatMessage.controller.js';

const router = express.Router();

router.post('/', createMessage);
router.get('/:chatRoomId', getMessages);

export default router;