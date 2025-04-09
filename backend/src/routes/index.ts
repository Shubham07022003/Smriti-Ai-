import express from 'express';
import folderRoutes from './createfolder-routes';
import getAllFolderRoutes from './getAllFolder-routes';
import getResourcesRoutes from './getResources-routes';


const router = express.Router();

// Mount routes
router.use('/folders', folderRoutes);// POST /api/folders
router.use('/folders', getAllFolderRoutes); // GET /api/folders

router.use('/resources', getResourcesRoutes); // GET /api/resources/:folderId

export default router;