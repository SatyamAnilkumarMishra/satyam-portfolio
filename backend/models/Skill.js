import mongoose from 'mongoose';

const skillItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true }
});

const skillCategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  items: [skillItemSchema]
});

export default mongoose.model('Skill', skillCategorySchema);
