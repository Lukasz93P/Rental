import React from 'react'

export class FileInput extends React.Component{
 

    onChange=(event)=>{

        const {input:{onChange}}=this.props
        onChange(event.target.value)
    }
 
    render(){
        const {label,meta: { touched, error}}=this.props
        return(
        <div className='form-group'>
            <label>{label}</label>
            <div className='input-group'>
              <input type='file' id="fileInput" accept='.jpg, .png, .jpeg' 
                onChange={this.onChange}
              />
              </div>
              {touched &&
                ((error && <div className='alert alert-danger'>{error}</div>))}
          </div>


        )
    }
 
 

}