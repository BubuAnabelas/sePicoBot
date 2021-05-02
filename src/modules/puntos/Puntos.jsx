import React, { Component } from 'react';
import axios from 'axios';
import { groupBy } from '../../utils/groupBy';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
  withStyles
} from '@material-ui/core';
import PuntosStyles from './Puntos.styles';
import PuntosTable from './puntos-table/PuntosTable';

class Puntos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      puntos: [],
      puntosDelMes: []
    };
  }

  getPuntosDelMes(puntos) {
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return puntos.filter(p => {
      let puntoDate = new Date(p.createdAt);
      return puntoDate.getMonth() + 1 === month && puntoDate.getFullYear() === year;
    });
  }

  ordenarPuntos(puntos) {
    puntos = Object.keys(puntos).map(usuario => {
      return {
        user: usuario,
        puntos: puntos[usuario].length
      };
    });
    return puntos.sort((a, b) => {
      if (a.puntos > b.puntos) {
        return -1;
      }
      if (a.puntos < b.puntos) {
        return 1;
      }
      // a debe ser igual b
      return 0;
    });
  }

  async componentDidMount() {
    const { data: puntos } = await axios.get('http://localhost:8080/api/puntos');
    let puntosDelMes = this.getPuntosDelMes(puntos);
    let puntosPorUsuario = groupBy(puntos, 'user');
    let puntosDelMesPorUsuario = groupBy(puntosDelMes, 'user');
    puntosPorUsuario = this.ordenarPuntos(puntosPorUsuario);
    puntosDelMesPorUsuario = this.ordenarPuntos(puntosDelMesPorUsuario);

    this.setState({ puntos: puntosPorUsuario, puntosDelMes: puntosDelMesPorUsuario });
  }

  render() {
    const { classes } = this.props;
    const { puntos, puntosDelMes } = this.state;
    return (
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8} className={classes.contentContainer}>
          <Typography variant="h3" align="left">
            Puntos
          </Typography>
          <Divider />
          <Grid container item spacing={4} className={classes.contentContainer}>
            <Grid container item xs={12} spacing={4} className={classes.marginTop}>
              <Grid item xs={4}>
                <Card>
                  <CardHeader title="Top 3"></CardHeader>
                  <CardContent>
                    <List>{puntos.length && puntos.slice(0, 3).map(punto => <ListItem>{punto.user}</ListItem>)}</List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card>
                  <CardHeader title="Top 3 del Mes"></CardHeader>
                  <CardContent>
                    <List>
                      {puntosDelMes.length && puntosDelMes.slice(0, 3).map(punto => <ListItem>{punto.user}</ListItem>)}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
            <Grid item xs={12}>
              <PuntosTable puntos={puntos} />
            </Grid>
          </Grid>
          <Divider />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    );
  }
}

export default withStyles(PuntosStyles)(Puntos);
