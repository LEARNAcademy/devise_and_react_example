import React from "react"
import PropTypes from "prop-types"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from './page/Home'

class MainApp extends React.Component {
  render () {
    const{ 
      logged_in, 
      sign_out_route, 
      sign_in_route 
    } = this.props
    
    return (
      <React.Fragment>
        <div className="TopNav">
          {logged_in &&
            <div>
              <a href={sign_out_route}>Log Out</a>
            </div>
          }
          {!logged_in &&
            <div>
              <a href={sign_in_route}>Log In</a>
            </div>
          }
        </div>
        
        <Router>
          <Route exact component={Home} path="/"/>
          {logged_in &&
            <Switch>
            </Switch>
          }

        </Router>
      
      </React.Fragment>
    );
  }
}

export default MainApp
