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
  
  getApartments(){
    fetch("/apartments")
    .then( response => {
      return response.json()
    })
    .then( apartments => {
      this.setState({apartments})
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
              <Route component={NewApartment} path="/new-apartment" />
            </Switch>
          }

        </Router>
      
      </React.Fragment>
    );
  }
}

export default MainApp
