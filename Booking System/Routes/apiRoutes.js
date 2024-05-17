 
import express from 'express';
const router = express.Router();
import { viewEvents ,create,viewEventById} from '../Controller/Event.js';
import auth from '../Controller/auth.js'
import verify from  '../middleware/middleware.js'
import {tickitsBooking,userBookings} from '../Controller/EventBooking.js'

// create User 
router.post('/user-register',auth.registration);
router.post('/user-login',auth.login);

// event module
router.post('/event-list',viewEvents);
router.post('/event-create',verify.AuthVerify,create);
router.post('/event',viewEventById);

// booking tickits 
router.post('/book-tickit',verify.AuthVerify,tickitsBooking);
router.post('/my-bookings',verify.AuthVerify,userBookings)



export default router;
