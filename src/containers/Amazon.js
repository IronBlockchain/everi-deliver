import React, { Component } from 'react';
import {AppBar, Toolbar, Typography, Paper} from '@material-ui/core';
import Navigation from "../components/Navigation"
import { Router as Router, Route, Link } from "react-router-dom";
import Notification from '../components/Notification'
import {issueTokenCall, validateToken, transferTokenToDeliver} from "../utils/api";
import {connect} from 'react-redux';
import {user as actions} from "../actions";
import {NotificationsEnums} from "../Enums";
import Good from "../components/Good";
import charts from '../static/bar-charts.png'

const Amazon = (props) => {
  const createNotification = () => {
    switch(props.notification){
      case NotificationsEnums.NEED_VALIDATION:
        return (
          <Notification
            message="Receive Deliver 9527 Access Request"
            disableAction={true}
            onClose={props.onCloseNotification}
            variant="info"
          />)
      case NotificationsEnums.IS_PROVING:
        return (
          <Notification
          message="Receive Deliver 9527 Access Request"
          actionMessage="Prove the request"
          onClick={props.onProveAccess}
          onClose={props.onCloseNotification}
          variant="info"
        />)
      case NotificationsEnums.CRETE_ACCESS:
        return;
      default:
        return null
    }
  }

  const createValidate = () => {
    if(props.notification === NotificationsEnums.NEED_VALIDATION){
      return (
        <Good
          onClick={props.onValidate}
          image={charts}
          title="Receive Deliver 9527 Access Request"
          text="Deliver Data Center"
          subText="create a safer world"
          clickText="Validate Access"
          subClickText="Report Malice"
        />
      )
    }
  }

  return (
    <Router history={props.history}>
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Taobao Data Center
            </Typography>
          </Toolbar>
        </AppBar>
        {createNotification()}
        {createValidate()}
      </div>
    </Router>
  )
}

export default connect(
  state => ({
    notification: state.user.notification
  }),
  dispatch => ({
    onProveAccess: async () => {
      dispatch(actions.proveFinish())
      await validateToken();
      await transferTokenToDeliver()
    },
    onValidate: () => {
      dispatch(actions.validate())
    },
    onCloseNotification: () => dispatch(actions.closeNotification())
  }))(Amazon);