import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  subject: { type: String, default: 'General Inquiry' },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read', 'archived'], default: 'unread' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Message', messageSchema);
