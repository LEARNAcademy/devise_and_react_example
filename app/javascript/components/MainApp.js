import React from "react"
import PropTypes from "prop-types"
import {
  BrowserRouter as Router, 
  Link,
  Route, 
  Switch
} from 'react-router-dom'

import Home from './page/Home'
import NewApartment from './page/NewApartment'

class MainApp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      apartments: []
    }
    this.getApartments()
  }
  
  getApartments = () => {
    fetch("/apartments")
    .then( response => {
      return response.json()
    })
    .then( apartments => {
      this.setState({apartments})
    })
  }
  
  createApartment = (attrs) =>{
    console.log("Yippeee, these are the attrs", attrs)
    return fetch("/apartments",{
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({apartment: attrs})
    })
    .then(response => {
      if(response.status === 201){
        this.getApartments()
      }
    })
  }
 
  render () {
    const{ 
      logged_in, 
      sign_out_route, 
      sign_in_route 
    } = this.props
    
    const{ apartments } = this.state 
    
    return (
      <React.Fragment>

        
        <Router>
          <div className="TopNav">
            <div>
              <Link to="/">Home</Link>
            </div>
            {logged_in &&
              <div>
                <Link to="/new-apartment" >New Apartment</Link>
                <a href={sign_out_route}>Log Out</a>
              </div>
            }
            {!logged_in &&
              <div>
                <a href={sign_in_route}>Log In</a>
              </div>
            }
          </div>
          <Route 
            exact 
            path="/"
            render={ (props) => {
              return(
                <Home 
                  {...props} 
                  apartments={apartments} 
                />
              )
            }}
          />
          
          {logged_in &&
            <Switch>
              <Route 
                path="/new-apartment" 
                render={ (props) => {
                  return(
                    <NewApartment 
                      {...props}
                      onSubmit={this.createApartment}
                    />
                  )
                }}
              />
            </Switch>
          }

        </Router>
      
      </React.Fragment>
    );
  }
}

export default MainApp
