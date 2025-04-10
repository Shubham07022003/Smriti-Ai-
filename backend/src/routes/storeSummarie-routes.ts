import express, { Router } from 'express';
import { updateResourceSummary } from '../controllers/storesummaries';

const router: Router = express.Router();

// Update resource summary route
router.patch(
  '/:resourceId/summary', 
  async (req: express.Request, res: express.Response) => {
    await updateResourceSummary(req, res);
  }
);

export default router;