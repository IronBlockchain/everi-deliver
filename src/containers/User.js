import React, { Component } from 'react';
import Button from "@material-ui/core/Button/Button"
import {AppBar, Toolbar, Typography, Paper} from '@material-ui/core';
import Navigation from "../components/Navigation"

const User = (props) => {
    return (
        <Paper>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Deliver
                    </Typography>
                </Toolbar>
            </AppBar>
        </Paper>
    )
}

export default User