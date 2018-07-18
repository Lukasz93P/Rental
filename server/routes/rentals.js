const express =require ('express');
const router=express.Router();
const Rental=require('../models/Rental')
const Booking=require('../models/Booking')
const User=require('../models/User')
const {authMiddleware}=require('../controllers/user')
const {normalizeErrors} = require('../helpers/mongoose');


router.get('/secret',authMiddleware,(req,res)=>{
    return res.json("SECRETTT");
})

router.get('',(req,res)=>{
    
    let query = {}
    const city=req.query.city
    
    if(city)
        query={city:city.toLowerCase()}
    
    
    Rental.find(query)
        .select('-bookings')// get all Rentals without bookings to avoid fething to much data without purpose
        .exec((err,response)=>{
            if(err){
                return res.status(422).send({error:normalizeErrors(error.errors)})
            } 

            if(city && response.length===0)
                return res.status(422).send({errors:[{title:'Rental not found',detail:`We have not any rentals in ${city}`}]})    
            
            return res.json(response)      

        })

})


router.post('/add',authMiddleware,(req,res)=>{

    const {title, city, street, category, image, bedrooms, shared, description, dailyRate} = req.body
    const user = res.locals.user

    const newRental = new Rental({title, city, street, category, image, bedrooms, shared, description, dailyRate})
    
    newRental.user=user


    newRental.save(function (error, rental) {
        if (error) {console.log('!!!!!!!!>>',normalizeErrors(error.errors))
            return res.status(422).send({error:normalizeErrors(error.errors)})
        }
        return(            
            
            User.update({_id:user._id},
                {$push:{rentals:newRental}}, function(error,response){
        
                    if(error)
                        return res.status(422).send({error:normalizeErrors(error.errors)}) 
            }),
            
            
            res.json(rental)

        )
    });
    

    

})

router.get('/:id',(req,res)=>{
    const rentalId=req.params.id;
    
    Rental.findById(rentalId)
        .populate('bookings', 'startAt endAt -_id'/* NOT SCHEMA NAME BUT NAME OF FIELD IN RENTAL SCHEMA WHICH CONTAINS BOOKINGS*/)
        .populate('user', 'username -_id'/* (username - send username -_id dont send _id) SAME AS ABOVE THATS WHY user not User capitalized like User schema */)
        .exec((err,response)=>{
            if(err){ 
                return res.status(422).send({errors:[{title:'Rental Error',detail:'Rental not found'}]})
            }    
            return res.json(response)

        })

})

module.exports=router;