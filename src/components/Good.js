import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Router as Router, Route, Link } from "react-router-dom";


const styles = {
  card: {
    margin: "20px auto",
    maxWidth: 200,
  },
  media: {
    bottom: -300,
    height: 200
  },
};

function MediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.text}
          </Typography>
          <Typography component="p">
            {props.subText}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="contained" color="default" onClick={props.onClick}>
          {props.clickText}
        </Button>
        <Button size="small" color="secondary">
          {props.subClickText}
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  clickText: PropTypes.string.isRequired,
  subClickText: PropTypes.string.isRequired,
};

export default withStyles(styles)(MediaCard);