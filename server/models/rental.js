const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const rentalSchema=new Schema({

    
    title: {type: String, required:'Starting date is required', maxlength:[100,'Title has too much characters reduce it to max. 100']},
    city:{type:String,required:'Ending d',lowercase:true},
    street:{type:String, required:true, minlength:[4, 'Street name too short, min. is 4 characters']},
    category:{type:String,required:true,lowercase:true,},
    image:{type:String,required:true},
    bedrooms:Number,
    shared:Boolean,
    description:{type:String,required:true},
    dailyRate:Number,
    createdAt:{type:Date, default: Date.now},
    user:{type:Schema.Types.ObjectId, ref: 'User'},
    bookings:[{type:Schema.Types.ObjectId, ref: 'Booking'}]
})

module.exports = mongoose.model('Rental', rentalSchema)