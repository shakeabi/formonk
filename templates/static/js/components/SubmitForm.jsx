import React, { Component, Fragment } from 'react';
import '../../../public/css/submitForm.scss';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

import Divider from '@material-ui/core/Divider';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

const styles = {
  grow: {
    flexGrow: 1
  }
};

class SubmitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formSkele: { title: '', desc: '', fields: [] },
      formData: [],
      validationDone: false,
      validationStatus: false
    };
  }

  componentDidMount() {
    axios
      .post('http://localhost:5000/api/getForm', {
        formId: this.props.match.params.formId
      })
      .then(res => {
        if(!res.data.formData.error)
          this.setState({ formSkele: res.data.formData });
        else{
          alert("Failed to find the given form! Check the URL!");
          this.props.history.push('/');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  submit = ()=>{
    console.log('Submitting');
    axios
      .post('http://localhost:5000/api/submitResponse', {
        formData: this.state.formData,
        formSlug: this.state.formSkele.slug
      })
      .then(res => {
        alert("Form Successfully Submitted!");
        this.props.history.push('/');
      })
      .catch(err => {
        alert('Error Ocurred');
      });
  }

  handleTextInputChange = (val, idx) => {
    let formData = this.state.formData;
    formData[idx] = val;
    this.setState({ formData: formData });
  };

  handleRadioInputChange = (val, idx) => {
    let formData = this.state.formData;
    formData[idx] = this.state.formSkele.fields[idx].options[val];
    console.log(this.state.formData);
    this.setState({ formData: formData });
  };

  validateAndSubmit = () => {
    this.setState({ validationDone: true });
    let validationStatus = true;
    let currState = this.state;
    if(currState.formData.length != currState.formSkele.fields.length){
      validationStatus=false;
    }
    if(validationStatus){
      currState.formData.forEach(ele=>{
        if(validationStatus&&ele.length<=0)
          validationStatus=false;
      });
    }

    this.setState({ validationStatus: validationStatus },()=>{
      console.log('temp',this.state.validationDone,this.state.validationStatus);
      if (this.state.validationDone && this.state.validationStatus) {
        this.submit();
      }
    });

  };

  render() {
    const { classes } = this.props;

    return (
      <div className="_submitForm_container">
        <Paper className="_submitForm_container_main_paper" elevation={1}>
          {this.state.validationDone && !this.state.validationStatus ? (
            <Chip
              label="Validation Failed: Please Fill all the Fields"
              color="secondary"
              className={classes.chip}
            />
          ) : this.state.validationDone && this.state.validationStatus ? (
            <Chip
              label="Validation Success"
              color="primary"
              className={classes.chip}
            />
          ) : (
            <Fragment />
          )}
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
          <br />
          <br />
          {this.state.formSkele.fields.map((ele, idx) => {
            if (ele.type == 'Text Input') {
              return (
                <Fragment key={idx}>
                  <TextField
                    id={`${idx}`}
                    label={`${ele.name}`}
                    name={`${idx}`}
                    fullWidth
                    className={classes.textField}
                    onChange={eve => {
                      this.handleTextInputChange(eve.target.value, idx);
                    }}
                    color="primary"
                    margin="normal"
                  />
                  <br />
                  <br />
                </Fragment>
              );
            }
            if (ele.type == 'Radio Input') {
              return (
                <Fragment key={idx}>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">{ele.name}</FormLabel>
                    <RadioGroup
                      aria-label={ele.name}
                      name={`${idx}`}
                      className={classes.group}
                      onChange={eve => {
                        this.handleRadioInputChange(eve.target.value, idx);
                      }}
                    >
                      {ele.options.map((item, subidx) => {
                        return (
                          <FormControlLabel
                            key={idx + subidx / 10}
                            value={`${subidx}`}
                            control={<Radio />}
                            label={`${item}`}
                          />
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <br />
                </Fragment>
              );
            }
          })}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              this.validateAndSubmit();
            }}
          >
            Submit
          </Button>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(SubmitForm);
