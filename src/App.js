import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import Deliver from './containers/deliver';
import User from './containers/user';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

const App = (props)=> {
    const { classes } = props;

    return (
      <div className="App">
        <header className="App-header">
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <Deliver/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <User/>
                    </Paper>
                </Grid>
            </Grid>
        </header>
      </div>
    );
  }

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);