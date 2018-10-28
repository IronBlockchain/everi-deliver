import React, { Component } from 'react';
import {AppBar, Toolbar, Typography, Paper} from '@material-ui/core';
import Navigation from "../components/Navigation"
import { Router as Router, Route, Link } from "react-router-dom";
import Notification from '../components/Notification'
import {issueTokenCall, transferToAmazon, destroyTokenCall} from "../utils/api";
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
          message="Success issued token, now sending"
          onClose={props.onCloseNotification}
          variant="success"
          disableAction={true}
        />)
      //wait for amazon
      case NotificationsEnums.TRANSFER_FINISH:
      case NotificationsEnums.NEED_VALIDATION:
      case NotificationsEnums.IS_PROVING:
        return(<Notification
          message="Your item Watchcat is delivered, deliver request access.."
          disableAction={true}
          variant="success"
          onClose={props.onCloseNotification}
        />)
      // case NotificationsEnums.PROVING_FINISH:
      case NotificationsEnums.CRETE_ACCESS:
        return(<Notification
          message="Access Control Granted"
          actionMessage="Check the Video"
          variant="info"
          onClick={props.openVideo}
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
      await transferToAmazon();
      dispatch(actions.transferToAmazonFinish())
    },
    openVideo: () => {
      dispatch(actions.openVideo())
      setTimeout(()=> {
        dispatch(actions.addHash())
      }, 15000)
    },

    destroyToken: async () => {
      dispatch (actions.destroyToken())
      await destroyTokenCall();
      dispatch (actions.destroyTokenFinish())
    },
    onCloseNotification: () => dispatch(actions.closeNotification())
  }))(User);