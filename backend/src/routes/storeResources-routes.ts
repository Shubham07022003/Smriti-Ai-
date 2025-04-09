import express from 'express';
import multer from 'multer';
import { StoreResources } from '../controllers/StoreResources';

const router = express.Router();


const upload = multer({ dest: 'public/temp' });

router.post('/resource', (req, res, next) => {
  const contentType = req.headers['content-type'];

 
  if (contentType?.includes('multipart/form-data')) {
    upload.single('file')(req, res, (err: any) => {
      if (err) return res.status(400).json({ message: err.message });
      next();
    });
  } else {
    next();
  }
}, StoreResources);

export default router;

  