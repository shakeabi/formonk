import React, { Component } from 'react';
import axios from 'axios';
import '../../../public/css/viewForm.scss';
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

class ViewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formSkele: { title: '', desc: '', fields: [], responses:[] },
      rows: []
    };
  }

  componentDidMount() {
    axios
      .post(conf.url+'api/getResponses', {
        formId: this.props.match.params.formId
      })
      .then(res => {
        console.log(res.data);
        if (!res.data.formData.error) {
          this.setState({ formSkele: res.data.formData });
          let rows=[];
          this.state.formSkele.responses.forEach(ele => {
            rows.push(ele);
          });
          this.setState({rows:rows});
        } else {
          alert('Failed to find the given form! Check the URL!');
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
      <div className="_viewForm_container">
        <Paper className={`_viewForm_container_main_paper ${classes.root}`}>
          <Typography
            variant="h2"
            color="inherit"
            className={classes.grow}
            gutterBottom
          >
            {this.state.formSkele.title}
          </Typography>
          <Divider />
          <br />
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            className={classes.grow}
            gutterBottom
          >
            {this.state.formSkele.desc}
          </Typography>
          <Typography
            component="h2"
            variant="caption"
            color="inherit"
            className={classes.grow}
            gutterBottom
          >
            Total Entries: {this.state.formSkele.responses.length}
          </Typography>
          <br />
          <br />
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {this.state.formSkele.fields.map((ele, idx) => {
                  return (
                    <CustomTableCell key={idx} align="center">{ele.name}</CustomTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map((row,idx) => {
                return (
                  <TableRow className={classes.row} key={idx}>
                    {row.map((item, subidx) => {
                      return (
                        <CustomTableCell
                          key={subidx}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {item}
                        </CustomTableCell>
                      );
                    })}
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

export default withStyles(styles)(ViewForm);
