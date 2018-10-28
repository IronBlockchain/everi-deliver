import React, { Component } from 'react';
import {AppBar, Toolbar, Typography, Paper} from '@material-ui/core';
import Navigation from "../components/Navigation"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Notification from '../components/Notification'
import {connect} from 'react-redux';
import {user as actions} from "../actions";

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const User = (props) => {
    return (
      <Router history={props.history}>
          <div>
              <AppBar position="static" color="default">
                  <Toolbar>
                      <Typography variant="h6" color="inherit">
                          User
                      </Typography>
                  </Toolbar>
              </AppBar>
              <Notification/>
              <Route path="/" exact component={Index} />
              <Route path="/about/" component={About} />
          </div>
      </Router>
    )
}

export default connect(
  state => state,
  dispatch => ({

  }))(User);