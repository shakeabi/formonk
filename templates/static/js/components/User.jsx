import React, { Component } from 'react';
import '../../../public/css/home.scss';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class Home extends Component {
  render() {
    const bull = <span className="bullet">•</span>;
    return (
      <div>
        <Card className="_card">
          <CardContent>
            <Typography className="_card_title" color="textSecondary" gutterBottom>
              Welcome to Formonk!
            </Typography>
            <Typography variant="h2" component="h2">
              Wassup
              {bull}Nigga
            </Typography>
            <Typography className='_card_pos' color="textSecondary">
              Build Beautiful and Amazing Forms!
            </Typography>
          </CardContent>
          <CardActions className='_card_buttonContainer'>
            <Button size="Large" className='_card_buttonContainer_button'>Create Form</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
