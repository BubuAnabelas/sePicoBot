import { Nota } from '../../models/notas';

const getAllNotes = async (req, res) => {
  try {
    const notas = await Nota.find().lean();
    res.send(notas);
  } catch (e) {
    throw new Error(e);
  }
};

const createNote = async (req, res) => {
  try {
    const { titulo, nota, orden } = req.body;
    const nuevaNota = await new Nota({ titulo, nota, orden });
    nuevaNota.save();
    res.send({ nota: nuevaNota });
  } catch (e) {
    throw new Error(e);
  }
};

const updateNote = async (req, res) => {
  try {
    const nota = await Nota.findByIdAndUpdate(req.params.id, req.body);
    res.send({ nota });
  } catch (e) {
    throw new Error(e);
  }
};

export { getAllNotes, createNote, updateNote };
