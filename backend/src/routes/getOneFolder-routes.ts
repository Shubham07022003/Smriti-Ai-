import express from 'express';
import { getOneFolder } from '../controllers/getFolder';


const router = express.Router();

// Get all folders route
router.get('/:folderId', getOneFolder);

export default router;