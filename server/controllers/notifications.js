const Booking = require ('../models/Booking')
const Rental = require ('../models/Rental')
const User = require ('../models/User')
const {normalizeErrors} = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const moment = require('moment')
const mongoose =require('mongoose');
const Notification=require('../models/notification')

exports.getUserNotifications=(req, res)=>{

    const user=res.locals.user;
    
    User.findById(user._id)
    .populate({path:'notifications',
    populate:[{path:'rental',model:'Rental'}, {path:'booking', model:'Booking'}]
    })
    .exec((error,response)=>{
        if(error)
            return res.status(422).send({errors:normalizeErrors(error.errors)})
        if(response)
            return res.json(response)
        return res.status(422).send({errors:[{title:'No notifications', detail:`You have no notifications`}]})

    })



}

exports.notificationNotLongerNew=(req,res)=>{

    const notificationId = req.params.id
    Notification.findByIdAndUpdate(notificationId, {$set:{new:false}}, function(error,updatedNotification){
        if(error){
            return res.status(422).send({errors:normalizeErrors(error.errors)})}
        if(updatedNotification)
            return res.json(updatedNotification) 

    })

}