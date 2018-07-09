import {FETCH_RENTALS,FETCH_RENTAL_BY_ID,FETCH_RENTAL_BY_ID_SUCCESS,FETCH_RENTAL_BY_ID_FAILED,FETCH_RENTAL_BY_ID_PENDING} from "./types"

const rentals=[{
    id: 1,
    title: "Central Apartment",
    city: "New York",
    street: "Times Sqaure",
    category: "apartment",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 3,
    description: "Very nice apartment",
    dailyRate: 34,
    shared: false,
    createdAt: "24/12/2017"
  },
  {
    id: 2,
    title: "Central Apartment 2",
    city: "San Francisco",
    street: "Main street",
    category: "condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    description: "Very nice apartment",
    dailyRate: 12,
    shared: true,
    createdAt: "24/12/2017"
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
    createdAt: "24/12/2017"
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
    shared: true,
    createdAt: "24/12/2017"
}]

export const fetchRentals=()=>{

    return {

        type:FETCH_RENTALS,
        payload:rentals,

    }

}

export const fetchRentalById=(rentalId)=>{
    
    
    return function(dispatch){
        
        dispatch(fetchRentalByIdPending())
        
        let selectedRental={}
        setTimeout(()=>{selectedRental=rentals.find(rental=>
            rental.id.toString()===rentalId),dispatch(fetchRentalByIdSuccess(selectedRental))},1000)
            

    }

}


export const fetchRentalByIdSuccess=(rental)=>{
    const bool=false
    return{
        type:FETCH_RENTAL_BY_ID_SUCCESS,
        payload:rental,
        isPending:bool,
    }
}

export const fetchRentalByIdPending=()=>{
    const bool=true
    return{
        type:FETCH_RENTAL_BY_ID_PENDING,
        payload:bool,
    }

}