import React, { Component } from 'react';
import Button from "@material-ui/core/Button/Button"
import {AppBar, Toolbar, Typography, Paper} from '@material-ui/core';
import Navigation from '../components/Navigation'
import Good from '../components/Good'
import Grid from '@material-ui/core/Grid'
import { Router as Router, Route, Link } from "react-router-dom";
import {connect} from 'react-redux';
import {deliver as actions, batchActions} from "../actions";
import _ from 'lodash'
import {push} from 'react-router-redux'
import cat from '../static/goods.png';
import {NotificationsEnums} from "../Enums";
import Notification from "../components/Notification";
import {createLinkCall, everiPassCall, addVideoData, destroyTokenCall, checkData} from '../utils/api'

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;

const Deliver = (props) => {

  const createNotification = () => {
    switch(props.notification){
      case NotificationsEnums.PROVING_FINISH:
        return (
          <Notification
            message="Receive Deliver 9527 Access Request"
            actionMessage="Request Access"
            onClick={props.onRequestClick}
            onClose={props.onCloseNotification}
            variant="info"
          />)
      case NotificationsEnums.CRETE_ACCESS:
        return (
          <Notification
            message="Now Request Proved, create the Access"
            actionMessage="Create Access QR"
            onClick={props.generateLink}
            onClose={props.onCloseNotification}
            variant="info"
          />)
      case NotificationsEnums.NO_NOTIFICATION:
        return null;
      default:
        return (<Notification
          message="Waiting for the Prove"
          disableAction={true}
          onClose={props.onCloseNotification}
          variant="success"
        />)
    }
  }

    return (
        <Router history={props.history}>
            <div>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Deliver
                    </Typography>
                </Toolbar>
            </AppBar>
              {createNotification()}
            <Good
              onClick={props.onRequestClick}
              image={cat}
              title="watchCat"
              text="Watchcat"
              subText="super easy to pack"
              clickText="Request access"
              subClickText="Leave Message"
            />
            </div>
        </Router>
    )
};

export default connect(
  state => ({
    notification: state.user.notification
  }),
  dispatch => ({
    onRequestClick: () => dispatch(actions.request()),
    generateLink: async() => {
      const link = await createLinkCall();
      await everiPassCall(link)
      await addVideoData()
      await destroyTokenCall()
      await checkData()
    }
  }))(Deliver);