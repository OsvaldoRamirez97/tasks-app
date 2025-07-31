import { Request, Response } from "express";
import { Task } from "../models/task";
import { randomUUID } from "crypto";

let tasks: Task[] = [];

export const getTasks = (req: Request, res: Response): void => {
    res.json(tasks);
};

export const createTask = (req: Request, res: Response ) => {
    const { title, description } = req.body;
    if(!title || !description) return res.status(400).json({error: "Titulo y description son requeridos."});

    const newTask: Task = { 
        id: randomUUID(), 
        title, 
        completed: false, 
        description, 
        createdAt: new Date(), 
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
} 

export const updateTask = (req: Request, res: Response) => { 
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const task = tasks.find((t) => t.id === id);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada." });

    if (title !== undefined) task.title = task.title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    res.json(task);
};

export const deleteTask = ( req: Request, res: Response) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) return res.status(404).json({ error: 'Tarea no encontrada.' });

    const deleted = tasks.splice(taskIndex, 1)[0];
    res.json(deleted);
}