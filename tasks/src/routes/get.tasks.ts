import { Request, Response } from 'express';
import Task from '../models/task.model';

export async function getTasks(req: Request, res: Response) {

  try{

    const { userId } = req.params;

    if(!userId) {
      return res.status(400).json({
        message: "ID owner is required."
      })
    }

    const tasks = await Task.find({ id_owner: userId });

    if(tasks.length === 0) {
      return res.status(200).json({
        tasks,
        message: "There are no registered tasks."
      })
    }

    return res.status(200).json({ tasks });

  }catch(error) {
    return res.status(500).json({ message: 'Error when searching for tasks.', error });
  }

}