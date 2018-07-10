const express =require ('express');
const mongoose=require('mongoose');
const FakeDb = require('./fake-db.js')
const app=express();
const rentalRoutes=require('./routes/rentals')


mongoose.connect('mongodb://test:6974figd@ds247838.mlab.com:47838/rental-base')
.then(()=>{const DB=new FakeDb()
    DB.pushTo();
})

app.use('/api/v1/rentals', rentalRoutes);

const PORT= process.env.PORT || 3001;
app.listen(PORT,console.log("Working good"))