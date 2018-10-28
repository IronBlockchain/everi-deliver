import React, { Component } from 'react';
import {AppBar, Toolbar, Typography, Paper} from '@material-ui/core';
import Navigation from "../components/Navigation"
import { Router as Router, Route, Link } from "react-router-dom";
import Notification from '../components/Notification'
import {issueTokenCall} from "../utils/api";
import {connect} from 'react-redux';
import {user as actions} from "../actions";
import {push} from "react-router-redux";
import {NotificationsEnums} from "../Enums";

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;



const User = (props) => {
  const createNotification = () => {
    switch(props.notification){
      case NotificationsEnums.IS_ISSUE_TOKEN:
        return (<Notification
          message="Your item Watchcat is delivered, deliver request access.."
          actionMessage="Issue Access Token"
          onClick={props.onIssueAccess}
          onClose={props.onCloseNotification}
          variant="info"
        />)
      case NotificationsEnums.IS_SENDING_TOKEN:
        return(<Notification
          message="Your item Watchcat is delivered, deliver request access.."
          actionMessage="Issue Access Token"
          variant="info"
          onClick={props.onIssueAccess}
          onClose={props.onCloseNotification}
        />)
      default:
        return null
    }
  }

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
        {createNotification()}
        <Route path="/" exact component={Index}/>
        <Route path="/about/" component={About}/>
      </div>
    </Router>
  )
}

export default connect(
  state => ({
    notification: state.user.notification
  }),
  dispatch => ({
    onIssueAccess: async () => {
      dispatch(actions.issueStart())
      await issueTokenCall();
      dispatch(actions.issueFinish())
    },
    onCloseNotification: () => dispatch(actions.closeNotification())
  }))(User);