import express from 'express';
import { getResourceById } from '../controllers/getdata';

const router = express.Router();

// Update resource summary route
router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        await getResourceById(req, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

export default router;