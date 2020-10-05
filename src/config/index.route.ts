import express, { Router } from 'express';
import { masjidRoutes } from '../modules/masjids/masjid.route';

const router: Router = express.Router();

router.use('/masjids', masjidRoutes);

export const rootRoute = router;
