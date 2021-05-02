import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, TextField, withStyles } from '@material-ui/core';
import NewNotesModalStyles from './NewNotesModal.styles';
import { toggleNewNoteModalOpen } from './actions/notas.actions';

class NewNotesModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      titulo: '',
      nota: ''
    };
  }

  handleClickOnSave = (nota) => {
    this.props.onSave(nota);
    this.props.toggleNewNoteModalOpen();
  }

  render() {
    const { classes, newNoteModalOpen, toggleNewNoteModalOpen } = this.props;
    const { titulo, nota } = this.state;
    return (
      <Dialog
        fullWidth
        maxWidth="sm"
        open={newNoteModalOpen}
        onClose={toggleNewNoteModalOpen}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
        <DialogContent>
          
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
          <form noValidate>
            <Grid container direction="column">
              <Grid item>
                <TextField id="nota-titulo" label="Titulo" fullWidth onChange={({target}) => this.setState({titulo: target.value})} />
              </Grid>
              <Grid item>
                <TextField id="nota-nota" label="Nota" fullWidth multiline rows="8" onChange={({target}) => this.setState({nota: target.value})} />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleNewNoteModalOpen} color="primary" disabled={ titulo !== '' && nota !== '' }>
            Close
          </Button>
          <Button color="primary" onClick={() => this.handleClickOnSave(this.state)} color="primary" disabled={ titulo === '' || nota === '' }>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => ({
  newNoteModalOpen: state.notesStore.newNoteModalOpen
});

const mapDispatchToProps = {
  toggleNewNoteModalOpen
};

export default compose(withStyles(NewNotesModalStyles), connect(mapStateToProps, mapDispatchToProps))(NewNotesModal);
