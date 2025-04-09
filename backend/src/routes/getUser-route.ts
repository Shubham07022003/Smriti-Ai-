import express from 'express';
import { getUser } from '../controllers/getUser';


const router = express.Router();

// Get resources route
router.get('/', getUser);

export default router;