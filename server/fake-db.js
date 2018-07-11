const Rental =require("./models/Rental")
const User=require("./models/User")

class FakeDb{
    
    
    constructor(){
        this.rentals=
    [{
    id: 1,
    title: "Big comfortable apartment",
    city: "New York",
    street: "Times Sqaure",
    category: "apartment",
    image: "https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_960_720.jpg",
    bedrooms: 3,
    shared:false,
    description: "Here we have description of apartment",
    dailyRate: 34,
    shared: false,
    createdAt: "2017-03-29"
  },
  {
    id: 2,
    title: "Nice small flat",
    city: "San Francisco",
    street: "Main street",
    category: "condo",
    image: "https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_960_720.jpg",
    bedrooms: 2,
    shared:true,
    description: "Description putted by flat owner",
    dailyRate: 12,
    shared: true,
    createdAt: "2018-01-20"
  },
  {
    id: 3,
    title: "Rooms to rent",
    city: "Bratislava",
    street: "Hlavna",
    category: "condo",
    image: "https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_960_720.jpg",
    bedrooms: 2,
    description: "Great rooms to longtime rent",
    dailyRate: 334,
    shared: true,
    createdAt: "2017-09-12"
  },
  {
    id: 4,
    title: "Big house for You only",
    city: "Berlin",
    street: "Haupt strasse",
    category: "house",
    image: "https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_960_720.jpg",
    bedrooms: 9,
    description: "Biggest and the mose beautifull house in town",
    dailyRate: 33,
    shared: false,
    createdAt: "2018-05-15"
}]


    this.users=[

        {username:'Lukasz',
        email:'lukasz9.3@intaria.pl',
        password:'aro1993'
        }
        

    ]
    }


    pushRentalsToDb(){

        const newUser=new User(this.users[0])

        this.rentals.forEach(rental=>{
            const newRental = new Rental(rental);
            newRental.user=newUser
            newUser.rentals.push(newRental)
            newRental.save();
        })
        newUser.save()
    }

    pushUsersToDb(){

        this.users.forEach(user=>{
            const newUser = new User(user);
            newUser.save();
        })

    }

    async cleanDb(){
       await Rental.remove({})
       await User.remove({})
    }


    async pushTo(){
        await this.cleanDb()
        this.pushRentalsToDb();

    }

}


module.exports=FakeDb;