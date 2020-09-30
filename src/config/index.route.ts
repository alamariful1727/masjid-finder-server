import express, { Router } from 'express';
import { eventRoutes } from '../modules/events/event.route';

const router: Router = express.Router();

router.use('/events', eventRoutes);

export const rootRoute = router;
