import React, { Component } from 'react';
import axios from 'axios';
import '../../../public/css/explore.scss';
import conf from '../../config';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    maxWidth: '100%'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
});

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }

  changeRoute = (path) => {
    this.props.history.push(path);
  }

  componentDidMount() {
    console.log(conf.url+'api/getExplore');
    axios
      .post(conf.url+'api/getExplore')
      .then(res => {
        console.log(res.data);
        if (!res.data.error) {
          let rows = [];
          res.data.data.forEach((ele, idx) => {
            rows.push(ele);
          });
          this.setState({ rows: rows });
        } else {
          alert('Error Occured! Try again Later!');
          this.props.history.push('/');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="_explore_container">
        <Paper className={`_explore_container_main_paper ${classes.root}`}>
          <Typography
            variant="h2"
            color="inherit"
            className={classes.grow}
            gutterBottom
          >
            Explore
          </Typography>
          <Divider />
          <br />
          <Typography
            component="h2"
            variant="caption"
            color="inherit"
            className={classes.grow}
            gutterBottom
          >
            Total Forms: {this.state.rows.length}
          </Typography>
          <br />
          <br />
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell align="center" component="th" scope="row">
                  Share
                </CustomTableCell>
                <CustomTableCell align="center" component="th" scope="row">
                  Responses
                </CustomTableCell>
                <CustomTableCell align="center" component="th" scope="row">
                  Title
                </CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map((row, idx) => {
                return (
                  <TableRow className={classes.row} key={idx}>
                    <CustomTableCell align="center" component="th" scope="row">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        onClick={() => {
                          this.changeRoute('/form/'+row.slug);
                        }}
                      >
                        Link
                      </Button>
                    </CustomTableCell>
                    <CustomTableCell align="center" component="th" scope="row">
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        onClick={() => {
                          this.changeRoute('/responses/'+row.slug);
                        }}
                      >
                        Responses
                      </Button>
                    </CustomTableCell>
                    <CustomTableCell align="center" component="th" scope="row">
                      {row.title}
                    </CustomTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Explore);
