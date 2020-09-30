import express, { Router } from 'express';
import { joiSchemaValidator } from '../../middlewares/joiSchemaValidator';
import { createEvent, getAllEvent } from './event.controller';
import { createEventValidation } from './event.validation';

const router: Router = express.Router();

router.route('/').post(joiSchemaValidator(createEventValidation), createEvent).get(getAllEvent);

export const eventRoutes = router;
