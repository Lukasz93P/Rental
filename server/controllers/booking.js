const Booking = require ('../models/Booking')
const Rental = require ('../models/Rental')
const User = require ('../models/User')
const {normalizeErrors} = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const moment = require('moment')
const mongoose =require('mongoose');

exports.booking =(req, res)=>{
    const {startAt,endAt,totalPrice,guests,days,rental}= req.body
    const user=res.locals.user
    const booking= new Booking({startAt,endAt,totalPrice,guests,days})

    Rental.findById(mongoose.Types.ObjectId(rental._id))
    .populate('bookings'/*NOT SCHEMA NAME BUT NAME OF FIELD IN RENTAL SCHEMA WHICH CONTAINS BOOKINGS*/)
    .populate('user'/*SAME AS ABOVE THATS WHY user not User capitalized like User schema */)
    .exec((error,foundRental)=>{
        if(error)
            return res.status(422).send({errors:normalizeErrors(error.errors)}) 
        if(foundRental.user._id.toString()===user._id.toString())
            return res.status(422).send({errors:[{title:'Invalid user', detail:`You can\'t book your own property`}]}) 
        if(isValidBooking(booking,foundRental)){
            booking.user=user
            booking.rental=foundRental
            booking.save(error=>{
                if(error)
                    return res.status(422).send({errors:normalizeErrors(error.errors)}) 
                }
            )

            foundRental.bookings.push(booking)
            foundRental.save(error=>{
                if(error)
                    return res.status(422).send({errors:normalizeErrors(error.errors)}) 
                }
            )

            User.update({_id:user._id},
                {$push:{bookings:booking}}, function(error,response){}
            )
           
            
            return res.json({startAt:booking.startAt, endAt:booking.endAt})
        }
        else
            return res.status(422).send({errors:[{title:'Invalid booking', detail:`Booking is not available at choosen dates`}]})

    })

}

exports.getUsersBookings =(req,res)=>{

    const user=res.locals.user

        Booking.where({user})
        .populate('rental'/* (username - send username -_id dont send _id) SAME AS ABOVE THATS WHY user not User capitalized like User schema */)
        .exec((err,response)=>{
            if(err){ 
                return res.status(422).send({errors:normalizeErrors(error.errors)}) 
            } 

            if(response)    
                return res.json(response)
            return res.json({message:'You have no bookings'})
        })

}

exports.getRentalBookings =(req,res)=>{

    rentalId=req.params.id
    
    if(rentalId){
       

        Booking.where({rental_id:rentalID})
        .populate('rental'/* (username - send username -_id dont send _id) SAME AS ABOVE THATS WHY user not User capitalized like User schema */)
        .exec((err,response)=>{
            if(err){ 
                return res.status(422).send({errors:normalizeErrors(error.errors)}) 
            } 

            if(response)    
                return res.json(response)
            return res.json({message:'You have no bookings'})
        })
    }
    return res.status(422).send({errors:[{title:'No bookings', detail:`Rental has no bookings`}]})


}



const isValidBooking=(requestedBooking,rental)=>{

    let isValid=true
    
    if(rental.bookings && rental.bookings.length>0){

        isValid=rental.bookings.every(booking=>{

            return (( moment(booking.startAt) < moment(requestedBooking.startAt) && moment(booking.endAt) < moment(requestedBooking.startAt))|| (moment(requestedBooking.endAt)<moment(booking.endAt) && moment(requestedBooking.endAt) <moment(booking.startAt)))
        })

    }

    return isValid;
}

