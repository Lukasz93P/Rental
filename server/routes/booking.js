const express =require ('express');
const router=express.Router();
const {authMiddleware}=require('../controllers/user')
const {booking,getUsersBookings,cancelBooking} =require('../controllers/booking');


router.post('',authMiddleware,booking)
router.get('/manage',authMiddleware,getUsersBookings)
router.put('/manage/cancel/:id',authMiddleware,cancelBooking)

module.exports=router;