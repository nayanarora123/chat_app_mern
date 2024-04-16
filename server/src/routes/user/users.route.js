import express from 'express';
import { getAllUsers, getUser } from './users.controller.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:userId', getUser);

export default router;