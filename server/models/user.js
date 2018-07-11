const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const bcrypt=require('bcrypt-nodejs');
const userSchema=new Schema({
  
    username:{type:String, minlength:[2, 'Usernane too short'],
        maxlength:[32,'Username too long']
    },
    
    email:{type:String,minlength:[6, 'Usernane too short'],
        maxlength:[48,'Username too long'],
        unique:true,
        lowercase:true,
        required: 'You have to enter Your email address',
        match:[/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]
    },
    
    password:{type:String, mminlength:[2, 'Usernane too short'],
        maxlength:[32,'Username too long'],
        required:'Enter Your password',
    },

    rentals:[{type:Schema.Types.ObjectId, ref: 'Rental'}]
})

userSchema.pre('save', function (next){

    const user=this;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt,null, function(err, hash) {
            user.password=hash;
            next();
        });
    });

})

userSchema.methods.isValidPassword=function(password){

   const user = this

   return bcrypt.compareSync(password,this.password)

}

module.exports = mongoose.model('User', userSchema)