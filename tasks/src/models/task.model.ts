import mongoose, { Document, Schema } from 'mongoose';

interface ITask extends Document {
  id_owner: string,
  title: string;
  description: string;
  completed: boolean;
}

const taskSchema: Schema = new Schema({
  id_owner: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
