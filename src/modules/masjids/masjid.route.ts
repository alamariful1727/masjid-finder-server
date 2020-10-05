import express, { Router } from 'express';
import { joiSchemaValidator } from '../../middlewares/joiSchemaValidator';
import { createMasjid, getAllMasjids, getAllNearByMasjids } from './masjid.controller';
import { createMasjidValidation, getAllNearByMasjidsValidation } from './masjid.validation';

const router: Router = express.Router();

router.route('/').post(joiSchemaValidator(createMasjidValidation), createMasjid).get(getAllMasjids);

router.route('/nearby').get(joiSchemaValidator(getAllNearByMasjidsValidation), getAllNearByMasjids);

export const masjidRoutes = router;
