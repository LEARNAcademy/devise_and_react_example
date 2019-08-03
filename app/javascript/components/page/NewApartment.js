import React from "react"
import PropTypes from "prop-types"
class NewApartment extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      form: {
        street: "",
        city: ""
      }
    }
  }
  
   
  localSubmit = () =>{
    const{ onSubmit } = this.props 
    const{ form } = this.state
    onSubmit(form)
  } 
  render () {
    return (
      <React.Fragment>
        <h1>New Apartment</h1>
        <button onClick={this.localSubmit} >Submit</button>
      </React.Fragment>
    );
  }
}

export default NewApartment
