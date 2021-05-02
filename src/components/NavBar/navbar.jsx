import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppBar, IconButton, Toolbar, Typography, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import NavBarStyles from './navbar.styles';
import { toggleSideBar } from '../SideBar/actions/sidebar.actions';

class NavBar extends Component {
  render() {
    const { toggleSideBar, classes } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSideBar}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Los strimins
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapActionsToProps = {
  toggleSideBar
};

export default compose(withStyles(NavBarStyles), connect(null, mapActionsToProps))(NavBar);
