import express from 'express';
import multer from 'multer';
import checkRole from '../middleware/auth.js';
import {
    createProvince,
    createDistrict,
    createManifest,
    getProvinces,
    getDistricts,
    getManifests,
    deleteManifest,
    deleteProvince,
    deleteDistrict,
    editManifest

} from '../controller/adminController.js';
const router = express.Router();

const upload = multer();

// Province Routes
router.post('/province', checkRole('admin'), createProvince);
router.delete('/province/:id', checkRole('admin'), deleteProvince);
router.get('/provinces', getProvinces);

// District Routes
router.post('/district', checkRole('admin'), createDistrict);
router.delete('/district/:id', checkRole('admin'), deleteDistrict);
router.get('/districts', getDistricts);

// Manifest Routes
router.post('/manifest', checkRole('admin'), upload.single('file'), createManifest);
router.delete('/manifest/:id', checkRole('admin'), deleteManifest);
router.put('/manifest/:id', checkRole('admin'), upload.single('file'), editManifest);
router.get('/manifests', getManifests);

export default router;

