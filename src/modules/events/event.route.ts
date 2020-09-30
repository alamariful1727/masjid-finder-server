import express, { Router } from 'express';
import { joiSchemaValidator } from '../../middlewares/joiSchemaValidator';
import { createEvent, getAllEvents, getAllNearByEvents } from './event.controller';
import { createEventValidation, getAllNearByEventsValidation } from './event.validation';

const router: Router = express.Router();

router.route('/').post(joiSchemaValidator(createEventValidation), createEvent).get(getAllEvents);

router.route('/nearby').get(joiSchemaValidator(getAllNearByEventsValidation), getAllNearByEvents);

export const eventRoutes = router;
