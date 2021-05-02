import React, { Component } from 'react';
import { Paper, Table, TableCell, TableBody, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';
import PuntosTableStyles from './PuntosTable.styles';

class PuntosTable extends Component {
  render() {
    const { classes, puntos } = this.props;
    return (
      <TableContainer component={Paper} className={ classes.marginTop }>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Posicion</TableCell>
              <TableCell align="left">Usuario</TableCell>
              <TableCell align="left">Puntos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {puntos.map((usuario, index) => (
              <TableRow key={usuario.user}>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">{usuario.user}</TableCell>
                <TableCell align="left">{usuario.puntos}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default withStyles(PuntosTableStyles)(PuntosTable);