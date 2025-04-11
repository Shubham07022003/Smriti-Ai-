import express, { Router } from 'express';
import { updateResourceSummary } from '../controllers/stotremermaid copy';

const router: Router = express.Router();

// Update resource summary route
router.patch(
  "/", 
  async (req: express.Request, res: express.Response) => {
    await updateResourceSummary(req, res);
  }
);

export default router;