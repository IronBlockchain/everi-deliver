import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import Deliver from './containers/Deliver';
import User from './containers/User';
import init from './utils/init'

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
        const result = init();
    }

    render() {
        const classes = this.props.classes;
        return (
            <div className="App">
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <Deliver />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <User/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
  }

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);