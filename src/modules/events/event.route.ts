import express, { Router } from 'express';
import { createEvent, getAllEvent } from './event.controller';

const router: Router = express.Router();

router.route('/').post(createEvent).get(getAllEvent);

export const eventRoutes = router;
