const express =require ('express');
const router=express.Router();
const Rental=require('../models/Rental')

router.get('',(req,res)=>{

    Rental.find({},(err,response)=>{res.json(response)})
    

})

router.get('/:id',(req,res)=>{
    const rentalId=req.params.id;
    Rental.findById(rentalId,(err,response)=>{
        if(err){ 
            res.status(422).send({errors:[{title:'Rental Error',detail:'Rental not found'}]})
        }    
        res.json(response)

    })

})

module.exports=router;