import express from 'express';
import { getAllFolders } from '../controllers/getAllFolder';

const router = express.Router();

// Get all folders route
router.get('/', getAllFolders);

export default router;