const express =require ('express');
const router=express.Router();
const {authMiddleware}=require('../controllers/user')
const {getUserNotifications,notificationNotLongerNew} =require('../controllers/notifications');

router.get('',authMiddleware,getUserNotifications)
router.put('/makenotnew/:id',authMiddleware,notificationNotLongerNew)


module.exports=router;