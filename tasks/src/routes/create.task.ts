import { Request, Response } from 'express';
import Task from '../models/task.model';

export async function createTask(req: Request, res: Response) {

  try{

    const { title, description } = req.body;

    const { userId } = req.params;

    if(!userId) {
      return res.status(400).json({
        message: "ID owner is required."
      })
    }

    if(!title) {
      return res.status(400).json({
        message: "Title is required."
      })
    }

    if(!description) {
      return res.status(400).json({
        message: "Description is required."
      })
    }

    const task = await Task.create({
      id_owner: userId,
      title,
      description,
    })

    return res.status(201).json({
      task,
      message: "Task created!"
    })


  }catch(error) {
    return res.status(500).json({ message: 'Error when to create task.', error });
  }

}