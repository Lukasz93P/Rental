const express =require ('express');
const mongoose=require('mongoose');
const FakeDb = require('./fake-db.js')
const rentalRoutes=require('./routes/rentals')
const usersRoutes=require('./routes/users')
const bodyParser=require('body-parser')
const app=express();


mongoose.connect('mongodb://test:6974figd@ds247838.mlab.com:47838/rental-base')
.then(()=>{const DB=new FakeDb()
    //DB.pushTo();
})

app.use(bodyParser.json());
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', usersRoutes);


const PORT= process.env.PORT || 3001;
app.listen(PORT,console.log("Working good"))