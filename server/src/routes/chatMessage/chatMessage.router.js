import express from 'express';
import { 
    createMessage,
    getMessages,
    deleteMessage
} from './chatMessage.controller.js';

const router = express.Router();

router.post('/', createMessage);
router.get('/:chatRoomId', getMessages);
router.delete('/:chatMessageId/:deleteMethod', deleteMessage);

export default router;