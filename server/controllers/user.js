const User = require ('../models/User')
const {normalizeErrors} = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const {SECRET}=require('./secret');

exports.auth =(req, res)=>{

    const {email,password}=req.body
    
    if(!email || !password)
        return res.status(422).send({errors:[{title: 'Data missing', detail:'Missing username or email '}]})

    User.findOne({email},(error,foundedUser)=>{

        if(error)
            return res.status(422).send({errors:normalizeErrors(error)})
        if(!foundedUser)
            return res.status(422).send({errors:[{title:'Invalid user', detail:'Account does not exists'}]})
        if(foundedUser.isValidPassword(password))
            return res.json(jwt.sign({
                userId:foundedUser._id,
                username:foundedUser.username
                }, SECRET, { expiresIn:'1h'}))              
        else
            return res.status(422).send({errors:[{title:'Wrong password', detail:'Your password is not the same'}]})


    })
}

exports.register = (req,res)=>{

    const {username,email,password,passwordconfirmation} = req.body;
    if(!username || !email)
        return res.status(422).send({errors:[{title: 'Data missing', detail:'Missing username or email '}]})
    if(password !== passwordconfirmation)
        return res.status(422).send({errors:[{title:'Different passwords', detail:'Password and password confirmation are different'}]})
    
    User.findOne({email}, (error, mailInUse)=>{
        if(error){
            return res.status(422).send({errors:normalizeErrors(error.errors)})}
        if(mailInUse)
            return res.status(422).send({errors:[{title:"User already exists", detail:"Mail is in use"}]})
    
        const user=new User({username,email,password});
        user.save(error=>{
        if(error){
            return res.status(422).send({errors:normalizeErrors(error.errors)})
        }
        else return res.json({'registerd':true})
        })  
    
    })
    
  
}

exports.authMiddleware=function (req,res, next){

    const token=req.headers.authorization;
    if(token){

        const user=parseToken(token)
        
        User.findById(user.userId,(error,foundUser)=>{
            if(error)
                return res.status(422).send({errors:normalizeErrors(error.errors)})
            if(foundUser){
                res.locals.user=foundUser;
                next();
            }
            else 
                authorizationError(res)

        })

    }
    else    
        authorizationError(res)

}

function authorizationError(res){
    return res.status(401).send({errors:[{title:'Not authorized', detail:'Loggin needed'}]})
}


function parseToken(token){


    token=token.split(' ')[1];

    return jwt.verify(token, SECRET);

}