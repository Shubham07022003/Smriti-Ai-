import express from 'express';
import folderRoutes from './createfolder-routes';
import getAllFolderRoutes from './getAllFolder-routes';
import getResourcesRoutes from './getResources-routes';
import getdata from './getdata-routes';
import storeSummaryRoutes from './storeSummarie-routes'
import mermaidRoutes from './mermaid-routes';

import { clerkMiddleware } from "@clerk/express";
import { tokenMiddleware } from '../middlewares/tokenMiddleware';
import getUser from './getUser-route'
import storeResources from './storeResources-routes';
import getOneFolderRoutes from './getOneFolder-routes'

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

// this route use for generate summary,mermaid,questions
router.use('/resources', storeSummaryRoutes); // PATCH /api/resources/:resourceId
//router.use('/resources/mermaid', mermaidRoutes); // GET /api/resources/mermaid/:folderId/:resourceId

//for any data -> resources , mermaid , summary , questions
router.use('/resources', getdata); // GET /api/resources/:resourceId


router.use('/folder', getOneFolderRoutes) // get individual folder

router.use('/resources', getResourcesRoutes); // GET /api/resources/:folderId
router.use('/resources',storeResources ); // post /api/resources/:folderId
router.use('/user',getUser)
export default router;