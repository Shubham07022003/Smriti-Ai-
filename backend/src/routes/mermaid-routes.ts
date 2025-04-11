import express, { Router } from 'express';
import { updateResourceSummary } from '../controllers/mermaid';

const router: Router = express.Router();

// Update resource summary route
router.get(
  "/", 
  async (req: express.Request, res: express.Response) => {
    await updateResourceSummary(req, res);
  }
);

export default router;