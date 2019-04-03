import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Header from './components/header'
import Navbar from './components/navBar'
import Footer from './components/footer'

class App extends Component {
  render() {
    const  userToken = this.props.auth.userToken

    //caso o userToken esteja nulo, redireciona para pagina de login
    if (userToken === null) {
      browserHistory.push('/')
      return null
    }
    
    return (
      <div class="page">
        <Header />
        <div class="page-content d-flex align-items-stretch">
          <Navbar userName={userToken.user.name} userEmail={userToken.user.email} />
          <div class="content-inner">
            {this.props.children}
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);