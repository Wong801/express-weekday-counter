import express from 'express';
import { weekdayController } from '../controllers/weekday';

const router = express.Router();

router.post('/count', weekdayController());

export default router;
