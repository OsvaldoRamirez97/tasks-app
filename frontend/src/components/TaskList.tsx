import { useEffect, useState } from "react"
import { getTasks } from "../api/taskApi";
import type { Task } from "../types/types";
import TaskItem from "./TaskItem";
import { deleteTask } from "../api/taskApi";

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const loadTasks = async () => {
        const data = await getTasks ();
        setTasks(data);
    }

    const handleDelete = async (id: string) => {
        await deleteTask(id);
        loadTasks();
    }

    useEffect(() => {
        loadTasks();
    }, []);

  return (
    <div className="flex flex-col items-center">
        <h1 className="text-amber-50 text-4xl text-bold my-5">Mis Tareas</h1>
        <a href="/new" className="text-black font-bold mb-5 bg-amber-300 p-2 border-2 rounded-2xl hover:text-amber-50 hover:border-amber-50 hover:bg-purple-800">Nueva Tarea</a>
        <div className="flex flex-wrap justify-center">
            {tasks.map((task: Task ) => (
                <TaskItem key={task.id} task={task} onDelete={handleDelete} />
            ))}
        </div>
    </div>
  )
}

export default TaskList