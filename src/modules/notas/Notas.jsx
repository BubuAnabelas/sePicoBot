import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import axios from 'axios';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Fab,
  Grid,
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RGL, { WidthProvider } from 'react-grid-layout';
import ListIcon from '@material-ui/icons/List';
import AppsIcon from '@material-ui/icons/Apps';
import DragIndicator from '@material-ui/icons/DragIndicator';

import NotasStyles from './Notas.styles';
import { toggleNewNoteModalOpen, toggleViewMode } from './actions/notas.actions';
import NOTES_CONSTANTS from './constants/notas.constants';
import NewNotesModal from './NewNotesModal';

const ReactGridLayout = WidthProvider(RGL);

class Notas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notas: [],
      layout: []
    };
  }

  async componentDidMount() {
    await this.getNotes();
  }

  async getNotes() {
    try {
      const { data: notas } = await axios.get('http://localhost:8080/api/notas');
      this.setState({ notas });
      this.createLayout();
    } catch (e) {
      console.log(e);
    }
  }

  async saveNote(nota) {
    try {
      const notaCreada = await axios.post('http://localhost:8080/api/notas', { ...nota });
      this.getNotes();
    } catch (e) {
      console.log(e);
    }
  }

  createLayout() {
    const { notas } = this.state;
    let layout = notas.map((nota, index) => {
      if (!nota.layout) {
        return {
          i: nota._id,
          x: index !== 0 ? index * 4 : 0,
          y: 0,
          w: 4,
          h: 5,
          minH: 1,
          minW: 1
        };
      }
      return nota.layout;
    });

    this.setState({ layout });
  }

  async updateLayout(layout, oldItem, newItem) {
    console.log(layout);
    try {
      const layoutChanges = {
        i: newItem.i,
        x: newItem.x,
        y: newItem.y,
        w: newItem.w,
        h: newItem.h,
        minH: newItem.minH,
        minW: newItem.minW
      };
      const notaCreada = await axios.put(`http://localhost:8080/api/notas/${newItem.i}`, { layout: layoutChanges });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { classes, viewMode, toggleNewNoteModalOpen, toggleViewMode } = this.props;
    const { notas, layout } = this.state;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Grid container alignItems="center">
            <Grid item xs={2}>
              <Typography variant="h3" align="left">
                Notas
              </Typography>
            </Grid>
            <Grid item className={classes.grow}>
              <Fab color="primary" aria-label="add" onClick={toggleNewNoteModalOpen}>
                <AddIcon />
              </Fab>
            </Grid>
            <Grid item>
              <ButtonGroup aria-label="outlined primary button group">
                <Button
                  onClick={toggleViewMode}
                  disabled={viewMode === NOTES_CONSTANTS.VIEW_MODE.LIST}
                  endIcon={<ListIcon />}
                  variant="outlined"
                  aria-label="delete"
                >
                  Lista
                </Button>
                <Button
                  onClick={toggleViewMode}
                  disabled={viewMode === NOTES_CONSTANTS.VIEW_MODE.GRID}
                  endIcon={<AppsIcon />}
                  variant="outlined"
                  aria-label="delete"
                >
                  Grilla
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
          <Divider />
          {viewMode === NOTES_CONSTANTS.VIEW_MODE.LIST ? (
            <TableContainer component={Paper} className={classes.tableContainer}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Titulo</TableCell>
                    <TableCell align="right">Archivada</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notas.map(nota => (
                    <TableRow key={nota._id}>
                      <TableCell align="right">{nota.titulo}</TableCell>
                      <TableCell align="right">{nota.archivada ? 'Si' : 'No'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <ReactGridLayout
              cols={12}
              rowHeight={30}
              margin={[32, 32]}
              layout={layout}
              compactType={null}
              useCSSTransforms={false}
              preventCollision={true}
              draggableHandle=".MuiCardHeader-avatar"
              onDragStop={this.updateLayout}
              onResizeStop={this.updateLayout}
            >
              {notas.map((nota, index) => (
                <Card key={nota._id}>
                  <Box className={classes.boxCard}>
                    <CardHeader
                      title={nota.titulo}
                      avatar={<DragIndicator style={{ cursor: 'grab' }} fontSize="small" />}
                    />
                    <CardContent>{nota.nota}</CardContent>
                  </Box>
                </Card>
              ))}
            </ReactGridLayout>
          )}
        </Grid>
        <Grid item container xs={2} alignContent="flex-end"></Grid>
        <NewNotesModal onSave={this.saveNote} />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  viewMode: state.notesStore.viewMode
});

const mapDispatchToProps = { toggleNewNoteModalOpen, toggleViewMode };

export default compose(withStyles(NotasStyles), connect(mapStateToProps, mapDispatchToProps))(Notas);
