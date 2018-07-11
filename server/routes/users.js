const express =require ('express');
const router=express.Router();
const User=require('../models/User');
const {auth,register} =require('../controllers/user');

router.post('/auth',auth)

router.post('/register',register)

module.exports=router;