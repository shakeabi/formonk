import React, { Component, Fragment } from 'react';
import axios from 'axios';
import '../../../public/css/createForm.scss';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import Paper from '@material-ui/core/Paper';

import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';

import Chip from '@material-ui/core/Chip';

import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';

const styles = {
  grow: {
    flexGrow: 1
  },
  textfieldFontResize: {
    fontSize: 30
  }
};

const options = ['Select Input Type', 'Text Input', 'Radio Input'];

class CreateForm extends Component {
  constructor() {
    super();
  }

  changeRoute = path => {
    this.props.history.push(path);
  };

  state = {
    anchorEl: null,
    selectedIndex: 0,
    formState: { title: null, desc: null, fields: [] },
    validationDone: false,
    validationStatus: false
  };

  saveForm = () => {
    console.log('posted!');
    let postData = { data: this.state.formState };
    axios
      .post('http://localhost:5000/api/createForm', postData)
      .then(res => {
        console.log(res);
        alert(`Form Submitted Succesfully!\nLink:\n${res.data}`);
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleAddBtnClick = () => {
    let oldState = this.state;
    const tempInputState = {
      type: options[oldState.selectedIndex],
      name: '',
      options: oldState.selectedIndex == 2 ? ['', ''] : null
    };
    oldState.formState.fields.push(tempInputState);

    this.setState(oldState);
    console.log(this.state);
  };

  handleAddOptionBtn = idx => {
    let oldState = this.state;
    let optionsLength = oldState.formState.fields[idx].options.length;
    oldState.formState.fields[idx].options.push('');
    this.setState(oldState);
  };

  deleteInputField = idx => {
    let oldState = this.state;
    console.log(oldState);
    let inputFields = oldState.formState.fields;
    inputFields.splice(idx, 1);
    oldState.formState.fields = inputFields;
    this.setState(oldState);
  };

  deleteOptionField = (subidx, idx) => {
    let oldState = this.state;
    let inputFields = oldState.formState.fields;
    inputFields[idx].options.splice(subidx, 1);
    oldState.formState.fields = inputFields;
    this.setState(oldState);
  };

  updateHeader = (val, type) => {
    let oldState = this.state;
    if (type == 'title') oldState.formState.title = val;
    else if ((type = 'desc')) oldState.formState.desc = val;
    this.setState(oldState);
  };

  updateInputField = (val, idx) => {
    let oldState = this.state;
    let inputFields = oldState.formState.fields;
    inputFields[idx].name = val;
    oldState.formState.fields = inputFields;
    this.setState(oldState);
  };

  updateOptionField = (val, subidx, idx) => {
    let oldState = this.state;
    let inputFields = oldState.formState.fields;
    inputFields[idx].options[subidx] = val;
    oldState.formState.fields = inputFields;
    this.setState(oldState);
  };

  validateAndSave = () => {
    this.setState({ validationDone: true });
    let formState = this.state.formState;
    let validationStatus = true;
    // Validations
    if (
      validationStatus &&
      (formState.title == null || formState.title.length == 0)
    )
      validationStatus = false;
    if (
      validationStatus &&
      (formState.desc == null || formState.desc.length == 0)
    )
      validationStatus = false;
    if (validationStatus) {
      formState.fields.forEach(ele => {
        console.log(ele);
        if (ele.name == null || ele.name.length == 0) {
          console.log('heloo');
          validationStatus = false;
        }
        if (validationStatus && ele.type == 'Radio Input')
          ele.options.forEach(item => {
            if (item.length == 0) validationStatus = false;
          });
      });
    }

    this.setState({ validationStatus: validationStatus },()=>{
      // console.log('temp',this.state.validationDone,this.state.validationStatus);
      if (this.state.validationDone && this.state.validationStatus) {
        this.saveForm();
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className="_container">
        <AppBar
          position="static"
          color="primary"
          classes={{ colorPrimary: '_appbar' }}
        >
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              INSERT
            </Typography>
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

            {/* Right Side */}
            <List component="nav" color="inherit">
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="When device is locked"
                onClick={this.handleClickListItem}
              >
                <ListItemText
                  primary="Input Type"
                  secondary={options[this.state.selectedIndex]}
                  classes={{
                    primary: '_menu_list_text',
                    secondary: '_menu_list_text'
                  }}
                />
              </ListItem>
            </List>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              color="inherit"
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  disabled={index === 0}
                  selected={index === this.state.selectedIndex}
                  onClick={event => this.handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>

            <Fab
              color="default"
              aria-label="Add"
              className={classes.fab}
              onClick={() => this.handleAddBtnClick()}
              disabled={!this.state.selectedIndex}
            >
              <AddIcon />
            </Fab>
          </Toolbar>
        </AppBar>

        {/* Main Form */}
        <Paper className="_container_main_paper" elevation={1}>
          <TextField
            label="Title"
            className={classNames(classes.textField, classes.dense)}
            margin="dense"
            fullWidth
            InputProps={{
              classes: {
                input: classes.textfieldFontResize
              }
            }}
            onChange={eve => {
              this.updateHeader(eve.target.value, 'title');
            }}
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Description"
            className={classNames(classes.textField, classes.dense)}
            margin="dense"
            fullWidth
            style={{ marginBottom: '20px' }}
            onChange={eve => {
              this.updateHeader(eve.target.value, 'desc');
            }}
          />
          <br />
          {this.state.formState.fields.map((ele, idx) => {
            if (ele != null) {
              if (ele.type == 'Text Input') {
                return (
                  <Fragment key={idx}>
                    <TextField
                      label={`Question ${idx} - ${ele.type}`}
                      value={ele.name}
                      className={classNames(classes.textField, classes.dense)}
                      margin="dense"
                      style={{ marginBottom: '20px', width: '70%' }}
                      onChange={eve => {
                        this.updateInputField(eve.target.value, idx);
                      }}
                    />
                    <IconButton
                      className={classes.button}
                      aria-label="Delete"
                      style={{ position: 'relative', top: '15px' }}
                      onClick={() => {
                        this.deleteInputField(idx);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <br />
                  </Fragment>
                );
              }
              if (ele.type == 'Radio Input') {
                return (
                  <Fragment key={idx}>
                    <TextField
                      label={`Question ${idx} - ${ele.type}`}
                      value={ele.name}
                      className={classNames(classes.textField, classes.dense)}
                      margin="dense"
                      style={{ marginBottom: '20px', width: '70%' }}
                      onChange={eve => {
                        this.updateInputField(eve.target.value, idx);
                      }}
                    />
                    <IconButton
                      className={classes.button}
                      aria-label="Delete"
                      style={{ position: 'relative', top: '15px' }}
                      onClick={() => {
                        this.deleteInputField(idx);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      color="default"
                      aria-label="Add Radio Options"
                      size="small"
                      className={classes.fab}
                      style={{ position: 'relative', top: '15px' }}
                      onClick={() => {
                        this.handleAddOptionBtn(idx);
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                    <br />
                    {ele.options.map((option, subidx) => {
                      return (
                        <Fragment key={subidx}>
                          <FiberManualRecordOutlinedIcon
                            style={{
                              position: 'relative',
                              top: '20px',
                              left: '30px'
                            }}
                          />
                          <TextField
                            label={`option${subidx + 1}`}
                            value={option}
                            className={classNames(
                              classes.textField,
                              classes.dense
                            )}
                            margin="dense"
                            style={{
                              marginBottom: '20px',
                              marginLeft: '6%',
                              width: '60%'
                            }}
                            onChange={eve => {
                              this.updateOptionField(
                                eve.target.value,
                                subidx,
                                idx
                              );
                            }}
                          />
                          <IconButton
                            className={classes.button}
                            aria-label="Delete"
                            style={{ position: 'relative', top: '15px' }}
                            onClick={() => {
                              this.deleteOptionField(subidx, idx);
                            }}
                            disabled={ele.options.length <= 2}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <br />
                        </Fragment>
                      );
                    })}
                  </Fragment>
                );
              }
            }
          })}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              this.validateAndSave();
            }}
          >
            Save
          </Button>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(CreateForm);
