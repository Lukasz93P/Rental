import React from 'react'
import RegisterForm  from './RegisterForm';
import * as actions from '../../actions/index.js';
import {Redirect } from 'react-router-dom'


export class Register extends React.Component{


    constructor(){
        super(),
        this.state={

            errors:[],
            isRegistered:false,
            isRedirect:false,
        }

    }

    registerUser=(values)=>{


        actions.register(values).then(
            response=>{this.setState({isRedirect:true})}
            ,
            errors=>{this.setState({errors})}
        )

    }

    render(){
        const {errors,isRedirect}=this.state
        if(isRedirect)
            return <Redirect to={{pathname:"/login" ,state:{successRegister:true}}}/>
        return(

            <section id='register'>
                <div className='bwm-form'>
                    <div className='row'>
                    <div className='col-md-5'>
                        <h1>Register</h1>
                        <RegisterForm errors={errors} registerUser={this.registerUser}/>
                    </div>
                    <div className='col-md-6 ml-auto'>
                        <div className='image-container'>
                        <h2 className='catchphrase'>As our member you have access to most awesome places in the world.</h2>
                        <img src='../../../public/images/register-image.jpg' alt=""/>
                        </div>
                    </div>
                    </div>
                </div>
            </section>

        )

    }

}