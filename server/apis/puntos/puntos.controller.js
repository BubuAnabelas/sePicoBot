import { Puntos } from '../../models/punto';

const getAllPoints = async (req, res) => {
  try {
    const puntos = await Puntos.find().lean();
    res.send(puntos);
  } catch (e) {
    throw new Error(e);
  }
};

export {
  getAllPoints
};