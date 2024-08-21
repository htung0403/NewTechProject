import express from 'express';
import { uploadFile, getFiles } from '../controller/file.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/upload', verifyToken, uploadFile);
router.get('/files', verifyToken, getFiles);


export default router;