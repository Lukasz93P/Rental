import React from 'react'
import RentalCreateForm from './RentalCreateForm'
import * as actions from '../../../actions';
import {withRouter} from 'react-router-dom'


class RentalCreate extends React.Component{

    constructor(){

        super()
        this.state={
            errors:[],
        }
        this.rentalCategories=[{value:'house', label:'House'}, {value:'condo', label:'Condo'},{value:'apartment', label:'Apartment'}]

    }

    

    onFormSubmit=(values)=>{
        const newRental={...values}
        const file=document.getElementById("fileInput").files[0]
        let readedFile={}

        function fileToText(file, callback) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              callback(reader.result);
            };
        }


        const getReadedFile=()=>{

            return new Promise((resolve,reject)=>{
                fileToText(file,result=>{
                    if(result)
                    console.log('!!!!!!!!!!',result)
                        resolve(result)}
                )

            })
        }


        const sendRentalToServer=(readedFile)=>{

            return new Promise ((resolve,reject)=>{
                actions.addRental(newRental,readedFile)
                .then(response=>resolve(response)
                )
                .catch(err=> reject(err)  
                
            )})

        }

        const sendRequest= async ()=>{

            try{
            var readedFile=await getReadedFile()
            }
            catch(error){
                
            }

            try{
                const response=await sendRentalToServer(readedFile)
                if(response)
                    this.props.history.push(`/rentals/${response._id}`) 
            }
            catch(error){
                this.setState({errors:error}) 
            }


        }


        sendRequest()

      
    }



    render(){
        const {errors}=this.state
        return(

            <section id='newRental'>
                <div className='bwm-form'>
                    <div className='row'>
                    <div className='col-md-5'>
                        <h1 className='page-title'>Create Rental</h1>
                        <RentalCreateForm rentalCategories={this.rentalCategories} errors={errors} onFormSubmit={this.onFormSubmit}/>
                    </div>
                    <div className='col-md-6 ml-auto'>
                        <div className='image-container'>
                        <h2 className='catchphrase'>Hundreds of awesome places in reach of few clicks.</h2>
                        <img src={process.env.PUBLIC_URL + '/img/create-rental.jpg'} alt=''/>
                        </div>
                    </div>
                    </div>
                </div>
            </section>

        )



    }


}

export default withRouter(RentalCreate)