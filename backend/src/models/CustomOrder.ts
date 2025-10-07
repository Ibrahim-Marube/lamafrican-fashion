import mongoose from 'mongoose';

const customOrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  measurements: {
    neck: String,
    overBust: String,
    bust: String,
    underBust: String,
    waist: String,
    hips: String,
    neckToHeel: String,
    neckToAboveKnee: String,
    aboveKneeToAnkle: String,
    armLength: String,
    shoulderSeam: String,
    armHole: String,
    bicep: String,
    foreArm: String,
    wrist: String,
    vNeckCut: String,
    shoulderToWaist: String,
    waistToAboveKnee: String,
  },
  designPreferences: String,
  fabricChoice: String,
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('CustomOrder', customOrderSchema);
