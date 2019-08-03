import React from "react"
import PropTypes from "prop-types"
class EditApartment extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      apartmentId: null,
      apartmentAttrs: {}
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps.match.params.id != this.props.match.params.id){
      this.getApartment()
    }
  }
  
  getApartment(){
    //fetch apartment from show method
  }
  
  render () {
    return (
      <React.Fragment>
      </React.Fragment>
    );
  }
}

export default EditApartment
