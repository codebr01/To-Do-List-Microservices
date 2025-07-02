import { Request, Response } from 'express';
import Task from '../models/task.model';
import mongoose from 'mongoose';

export async function updateTask(req: Request, res: Response) {
  try {

    const { title, description } = req.body;

    const { userId, taskId } = req.params;

    if (!userId) {
      return res.status(400).json({
        message: "ID owner is required."
      });
    }

    if (!taskId) {
      return res.status(400).json({
        message: "ID task is required."
      });
    }

    if (!title) {
      return res.status(400).json({
        message: "Title is required."
      });
    }

    if (!description) {
      return res.status(400).json({
        message: "Description is required."
      });
    }

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        message: "Invalid task ID format."
      });
    }

    let task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found."
      });
    }

    if (task.id_owner !== userId) {
      return res.status(403).json({
        message: "You are not authorized to update this task."
      });
    }

    task.title = title;
    task.description = description;

    await task.save();

    return res.status(200).json({
      task,
      message: "Task updated successfully!"
    });

  } catch (error) {
    return res.status(500).json({ message: 'Error when updating task.', error });
  }
}
