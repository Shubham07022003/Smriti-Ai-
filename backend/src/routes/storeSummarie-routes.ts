import express from 'express';
import { updateResourceSummary } from '../controllers/storedatawithout folder';

const router = express.Router();

// Update resource summary route
router.patch('/', async (req: express.Request, res: express.Response) => {
    try {
        await updateResourceSummary(req, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

export default router;