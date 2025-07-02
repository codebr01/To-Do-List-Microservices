import { Request, Response } from 'express';
import Task from '../models/task.model';
import mongoose from 'mongoose';

export async function deleteTasks(req: Request, res: Response) {
  try {
    const { userId, taskId } = req.params;

    if (!userId) {
      return res.status(400).json({
        message: "User id task is required."
      });
    }

    if (!taskId) {
      return res.status(400).json({
        message: "Task id is required."
      });
    }

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        message: "Invalid task ID format."
      });
    }
    
    const task = await Task.findOneAndDelete({ _id: taskId, id_owner: userId });

    if (!task) {
      return res.status(404).json({
        message: "Task not found."
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully!",
      task
    });

  } catch (error) {
    return res.status(500).json({ message: 'Error when deleting task.', error });
  }
}
