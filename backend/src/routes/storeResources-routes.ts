import express from 'express';

import { StoreResources } from '../controllers/StoreResources';

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));




router.post('/',  StoreResources);

export default router;

  