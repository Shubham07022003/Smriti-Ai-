import express from 'express';
import { getResources } from '../controllers/getResources';

const router = express.Router();

// Get resources route
router.get('/:folderId', getResources);

export default router;