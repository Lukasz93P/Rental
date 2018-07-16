const express =require ('express');
const router=express.Router();
const Rental=require('../models/Rental')
const {authMiddleware}=require('../controllers/user')

router.get('/secret',authMiddleware,(req,res)=>{
    return res.json("SECRETTT");
})

router.get('',(req,res)=>{

    //Rental.find({},(err,response)=>{res.json(response)})
    
    Rental.find({})
        .select('-bookings')// get all Rentals without bookings to avoid fething to much data without purpose
        .exec((err,response)=>{
            if(err){ 
                return res.status(422).send({errors:[{title:'Rental Error',detail:'Rental not found'}]})
            }    
            return res.json(response)

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