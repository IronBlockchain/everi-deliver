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

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;

const Deliver = (props) => {
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
            <Route path="/" exact component={Index} />
            <Route path="/about/" component={About} />
            <Good onRequestClick={props.onRequestClick}/>
            </div>
        </Router>
    )
};

export default connect(
  state => state,
  dispatch => ({
    onRequestClick: () => dispatch(actions.request()),
    // onRequestClick: () => dispatch(push('/about'))
    // onRequestClick: () => dispatch(batchActions(push('/about'), actions.request()))
    // onRequestClick: () => _.flow(dispatch, batchActions)(push('/about/'), actions.request())
  }))(Deliver);