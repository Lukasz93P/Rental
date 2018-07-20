const express =require ('express');
const router=express.Router();
const Rental=require('../models/Rental')
const Booking=require('../models/Booking')
const User=require('../models/User')
const {authMiddleware}=require('../controllers/user')
const {normalizeErrors} = require('../helpers/mongoose');
const mongoose=require('mongoose');

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
        .sort({createdAt: -1})
        .exec((err,response)=>{
            if(err){
                return res.status(422).send({errors:normalizeErrors(error.errors)})
            } 

            if(city && response.length===0)
                return res.status(422).send({errors:[{title:'Rental not found',detail:`We have not any rentals in ${city}`}]})    
            
            return res.json(response)      

        })

})

router.delete('/:id',authMiddleware,(req,res)=>{

    rentalId=req.params.id
    const user=res.locals.user
    Rental.findById(rentalId)
    .populate('user _id username')
    .populate({path:'bookings',
    select:'startAt',
    match:{startAt:{$gt:new Date()}}
    })
    .exec((err,foundRental)=>{

        if(err)
            return res.status(422).send({err:normalizeErrors(err.errors)})

        if(foundRental.user._id.toString()!==user._id.toString())
            return res.status(422).send({errors:[{title:'Invalid User',detail:'You can not delete rental which is not Yours'}]})    

        if(foundRental.bookings.length>0)
            return res.status(422).send({errors:[{title:'Active bookings',detail:'You can not delete rental with active bookings'}]})    

        Rental.deleteOne({ _id: foundRental._id}, function (err) {
            if (err) 
                return res.status(422).send({errors:normalizeErrors(err.errors)})
            
            return res.json({message:"Rental deleted"})
        });


    })



})


router.post('/add',authMiddleware,(req,res)=>{

    const {title, city, street, category, image, bedrooms, shared, description, dailyRate} = req.body
    const user = res.locals.user

    const newRental = new Rental({title, city, street, category, image, bedrooms, shared, description, dailyRate})
    
    newRental.user=user

    const saveRental=()=>{

        return new Promise((resolve,reject)=>{
            newRental.save(function (error, rental){
                if (error) 
                    reject(error)
                else
                    resolve (rental)
            })
            
        })


    }

    const updateUser=()=>{

        return new Promise((resolve,reject)=>{
            
            User.update({_id:user._id},
                {$push:{rentals:newRental}}, function(error,response){    
                    console.log('>>>>>>UPDATING USER')
                    if(error)
                        reject(error)
                    else
                        return resolve(response)
            })
        })
    }

    async function  doEverythingHere() {
        
        try{var savedRental=await saveRental()}
        catch(error){
            return res.status(422).send({errors:normalizeErrors(error.errors)})
        }

        try{await updateUser()}
        catch(error){
            return res.status(422).send({errors:normalizeErrors(error.errors)}) 
        }

        return res.json(savedRental)
    };

    doEverythingHere()



    /*newRental.save(function (error, rental) {
        if (error) 
            return res.status(422).send({errors:normalizeErrors(error.errors)})
        User.update({_id:user._id},
            {$push:{rentals:newRental}}, function(error,response){    
                if(error)
                    return res.status(422).send({errors:normalizeErrors(error.errors)}) 
      
        return(                  
            res.json(rental)
        )
    });
    })*/

})



router.get('/manage',authMiddleware, (req,res)=>{

    const user=res.locals.user
  
    Rental.where({user})
        .populate('bookings'/* (username - send username -_id dont send _id) SAME AS ABOVE THATS WHY user not User capitalized like User schema */)
        .exec((err,response)=>{
            if(err){ 
                return res.status(422).send({errors:[{title:'Rental Error',detail:'Rental not found'}]})
            } 

            if(response)    
                return res.json(response)
            return res.json({message:'You have no rentals'})
        })
    

        

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