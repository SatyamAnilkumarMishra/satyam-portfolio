import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String },
  architecture: { type: String },
  tags: [{ type: String }],
  demoUrl: { type: String, default: '#' },
  codeUrl: { type: String, default: '#' },
  iconType: { type: String, default: 'code' },
  featured: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Project', projectSchema);
