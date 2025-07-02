import { Request, Response } from 'express';
import Task from '../models/task.model';
import mongoose from 'mongoose';

export async function getTask(req: Request, res: Response) {
  try {

    const { userId, taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        message: "Invalid task ID format."
      });
    }

    const task = await Task.findOne({ _id: taskId, id_owner: userId });

    if (!task) {
      return res.status(404).json({
        message: "There is no task with that ID for this user."
      });
    }

    return res.status(200).json({ task });

  } catch (error) {
    return res.status(500).json({ message: 'Error when searching for tasks.', error });
  }
}
