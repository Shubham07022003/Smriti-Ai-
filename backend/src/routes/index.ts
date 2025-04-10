import express from 'express';
import folderRoutes from './createfolder-routes';
import getAllFolderRoutes from './getAllFolder-routes';
import getResourcesRoutes from './getResources-routes';
import storeSummaryRoutes from './storeSummarie-routes';

import { clerkMiddleware } from "@clerk/express";
import { tokenMiddleware } from '../middlewares/tokenMiddleware';
import { getUser } from '../controllers/getUser';

const router = express.Router();
router.use(clerkMiddleware())
router.use(tokenMiddleware)
router.get('/me',(req,res)=>{
    res.json({
        "msg":"hello"
    })
})
router.use('/folders', folderRoutes);// POST /api/folders
router.use('/folders', getAllFolderRoutes); // GET /api/folders
router.use('/resources', storeSummaryRoutes); // PATCH /api/resources/:resourceId/summary



router.use('/resources', getResourcesRoutes); // GET /api/resources/:folderId
router.use('/user',getUser)
export default router;