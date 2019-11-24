import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import NewQuery from './NewQuery/NewQuery'

class App extends Component {

  render() {
    return (
      <div>
        <Route exact path='/' component={NewQuery}/>
      </div>
    );
  }
}

export default withRouter(App);