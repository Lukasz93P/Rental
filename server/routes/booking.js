const express =require ('express');
const router=express.Router();
const {authMiddleware}=require('../controllers/user')
const {booking} =require('../controllers/booking');


router.post('',authMiddleware,booking)

module.exports=router;