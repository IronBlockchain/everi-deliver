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
import goods from '../static/goods.png';
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
          image={goods}
          title="You sweet package"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Watchcat
          </Typography>
          <Typography component="p">
            super easy to pack
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="contained" color="default" onClick={props.onRequestClick}>
          Request access
        </Button>
        <Button size="small" color="secondary">
          Leave Message
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(MediaCard);