import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {CheckCircle, Warning, Error, Info, Close as CloseIcon} from '@material-ui/icons';
import {IconButton} from '@material-ui/core'
import connect from "react-redux/es/connect/connect";
import {deliver as actions} from "../actions";

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
};

const styles = theme => ({
  success: {
    backgroundColor: 'green',
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: 'amber',
  },
  icon: {
    fontSize: 15,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function InfoSnackBar(props) {
  const { classes, className, variant, message, onClose, onClick, actionMessage, ...other } = props;
  const Icon = variantIcon[variant];

  const createAction = () => {
    if(props.disableAction) {
      return [
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ];
    } else {
      return [
        <Button key="clickAction" variant="contained" color="primary" size="small" onClick={onClick}>
          {actionMessage}
        </Button>,
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]
    }
  }

  return (
    <div>
      { <SnackbarContent
        className={classNames(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={createAction()} /> }
    </div>
  );
}

InfoSnackBar.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  actionMessage: PropTypes.string,
  disableAction: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};
export default withStyles(styles)(InfoSnackBar);