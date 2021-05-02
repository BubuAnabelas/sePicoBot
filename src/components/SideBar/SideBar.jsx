import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { withStyles, Button, Drawer, Grid, List, ListItem, ListItemIcon, ListItemText, Link } from '@material-ui/core';

import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import SideBarStyles from './SideBar.styles';

import { toggleSideBar } from './actions/sidebar.actions';

class SideBar extends Component {
  handleNavigate(route) {
    this.props.push(route);
    this.props.toggleSideBar();
  }

  render() {
    const { open, toggleSideBar, classes } = this.props;
    return (
      <Drawer anchor={'left'} classes={{ paper: classes.paper }} open={open} onClose={toggleSideBar}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button onClick={() => this.handleNavigate('/')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => this.handleNavigate('/notas')}>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Notas" />
          </ListItem>
          <ListItem button onClick={() => this.handleNavigate('/puntos')}>
            <ListItemIcon>
              <EmojiEventsIcon />
            </ListItemIcon>
            <ListItemText primary="Puntos" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.sideBarStore.open
  };
};

const mapActionsToProps = {
  toggleSideBar,
  push
};
export default compose(withStyles(SideBarStyles), connect(mapStateToProps, mapActionsToProps))(SideBar);
