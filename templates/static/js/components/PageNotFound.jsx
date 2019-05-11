import React, { Component } from 'react';
import '../../../public/css/home.scss';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class Home extends Component {
  constructor() {
    super();
  }

  changeRoute = (path) => {
    this.props.history.push(path);
  }

  render() {
    const bull = <span className="bullet">•</span>;
    return (
      <div>
        <Card className="_card">
          <CardContent>
            <Typography className="_card_title" color="textSecondary" gutterBottom>
              Uh - Oh
            </Typography>
            <Typography variant="h3" component="h2">
              Page {bull} Not {bull} Found
            </Typography>
          </CardContent>
          <CardActions className='_card_buttonContainer'>
            <Button className='_card_buttonContainer_button' onClick={()=>{this.changeRoute('/')}}>Home</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
