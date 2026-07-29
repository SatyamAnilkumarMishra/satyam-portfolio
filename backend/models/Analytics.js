import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  metricName: { type: String, required: true, unique: true },
  value: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model('Analytics', analyticsSchema);
