import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import Deliver from './containers/Deliver';
import User from './containers/User';
import Amazon from './containers/Amazon'
import {init} from './utils/api'
import {connect} from 'react-redux';
import {batchActions, deliver as actions} from "./actions";
import {push} from "react-router-redux";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 600,
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class App extends Component {

    componentDidMount(){
        const ledgerInfo = init();
    }

    render() {
        const classes = this.props.classes;
        return (
            <div className="App">
                <Grid container spacing={24}>
                    <Grid item xs={8} sm={6}>
                        <Paper className={classes.paper}>
                            <Deliver history={this.props.history}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={8} sm={6}>
                        <Paper className={classes.paper}>
                            <User history={this.props.history}/>
                        </Paper>
                    </Grid>
                  <Grid item xs={8} sm={6}>
                    <Paper className={classes.paper}>
                      <Amazon history={this.props.history}/>
                    </Paper>
                  </Grid>
                </Grid>
            </div>
        );
    }
  }

App.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(
  state => state
)(withStyles(styles)(App));