const Booking = require ('../models/Booking')
const Rental = require ('../models/Rental')
const User = require ('../models/User')
const {normalizeErrors} = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const moment = require('moment')

exports.booking =(req, res)=>{
    const {startAt,endAt,totalPrice,guests,days,rental}= req.body
    const user=res.locals.user
    const booking= new Booking({startAt,endAt,totalPrice,guests,days})

    Rental.findById(rental._id)
    .populate('bookings'/*NOT SCHEMA NAME BUT NAME OF FIELD IN RENTAL SCHEMA WHICH CONTAINS BOOKINGS*/)
    .populate('user'/*SAME AS ABOVE THATS WHY user not User capitalized like User schema */)
    .exec((error,foundRental)=>{

        if(error)
            return res.status(422).send({error:normalizeErrors(error.errors)}) 
        if(foundRental.user._id.toString()===user._id.toString())
            return res.status(422).send({errors:[{title:'Invalid user', detail:`You can\'t book your own property`}]})

        if(isValidBooking(booking,foundRental)){
            booking.user=user
            booking.rental=foundRental
            booking.save()

            foundRental.bookings.push(booking)
            foundRental.save()
            
            user.bookings.push(booking)
            user.save()
            
            return res.json({'Booking created':true})
        }
        else
            return res.status(422).send({errors:[{title:'Invalid booking', detail:`Booking is not available at choosen dates`}]})

    })

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