import React from 'react';

const Warnings=({errors})=>{

   
    return(
        errors.length>0 &&
        <div className='alert alert-warning row justify-content-md-center'>
            {errors.map((error,index)=> <h2 key={index}>{error.detail}</h2>) }
        </div>


    )

}

export default Warnings