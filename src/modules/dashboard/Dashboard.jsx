import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { withStyles, Grid, Card, Typography, Divider } from '@material-ui/core';

import DashboardStyles from './Dashboard.styles';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  handleNavigate(route) {
    this.props.push(route);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8} className={classes.contentContainer}>
          <Typography variant="h3" align="left">
            Accesos directos
          </Typography>
          <Divider />
          <Grid container item spacing={4} className={classes.contentContainer}>
            <Grid item xs={4}>
              <Card onClick={() => this.handleNavigate('puntos')} className={classes.shortcutCard}>
                Puntos
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card onClick={() => this.handleNavigate('notas')} className={classes.shortcutCard}>
                Notas
              </Card>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          <Divider />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    );
  }
}

const mapActionsToProps = {
  push
};

export default compose(withStyles(DashboardStyles), connect(null, mapActionsToProps))(Dashboard);
