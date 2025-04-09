import express from 'express';
import { createFolder } from '../controllers/createfolder';

const router = express.Router();

// Create folder route
router.post('/', createFolder);

export default router;