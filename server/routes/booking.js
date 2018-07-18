const express =require ('express');
const router=express.Router();
const {authMiddleware}=require('../controllers/user')
const {booking,getUsersBookings} =require('../controllers/booking');


router.post('',authMiddleware,booking)
router.get('/manage',authMiddleware,getUsersBookings)

module.exports=router;