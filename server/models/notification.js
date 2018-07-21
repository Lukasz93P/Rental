const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const notificationSchema=new Schema({

    type:{type:String, required:true},
    message:{type:String, required:true},
    new:{type:Boolean, default:true},
    rental:{type:Schema.Types.ObjectId, ref: 'Rental'},
    booking:{type:Schema.Types.ObjectId, ref: 'Booking'},  

})

module.exports = mongoose.model('Notification', notificationSchema)