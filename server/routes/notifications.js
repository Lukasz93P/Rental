const express =require ('express');
const router=express.Router();
const {authMiddleware}=require('../controllers/user')
const {getUserNotifications} =require('../controllers/notifications');

router.get('',authMiddleware,getUserNotifications)


module.exports=router;