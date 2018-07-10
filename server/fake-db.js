const Rental =require("./models/Rental")

class FakeDb{
    
    
    constructor(){
        this.rentals=
    [{
    id: 1,
    title: "Central Apartment",
    city: "New York",
    street: "Times Sqaure",
    category: "apartment",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 3,
    shared:false,
    description: "Very nice apartment",
    dailyRate: 34,
    shared: false,
    createdAt: "2017-03-29"
  },
  {
    id: 2,
    title: "Central Apartment 2",
    city: "San Francisco",
    street: "Main street",
    category: "condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    shared:true,
    description: "Very nice apartment",
    dailyRate: 12,
    shared: true,
    createdAt: "2018-01-20"
  },
  {
    id: 3,
    title: "Central Apartment 3",
    city: "Bratislava",
    street: "Hlavna",
    category: "condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    description: "Very nice apartment",
    dailyRate: 334,
    shared: true,
    createdAt: "2017-09-12"
  },
  {
    id: 4,
    title: "Central Apartment 4",
    city: "Berlin",
    street: "Haupt strasse",
    category: "house",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 9,
    description: "Very nice apartment",
    dailyRate: 33,
    shared: false,
    createdAt: "2018-05-15"
}]
    }


    pushRentalsToDb(){

        this.rentals.forEach(rental=>{
            const newRental = new Rental(rental);
            newRental.save();
        })

    }

    async cleanDb(){
       await Rental.remove({})
    }


    pushTo(){
        this.cleanDb();
        this.pushRentalsToDb();

    }

}


module.exports=FakeDb;