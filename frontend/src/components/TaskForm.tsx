import { useEffect, useState, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { createTask, getTasks, updateTask } from "../api/taskApi";
import type { Task } from "../types/types"
import '../styles.css'

const TaskForm = () => {
    const [task, setTask] = useState({ title: '', description: '' });
    const [editingId, setEditingId] = useState<string | null>(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if(id) {
            getTasks().then((tasks: Task[]) => {
                const existing = tasks.find(t => t.id === id);
                if(existing) {
                    setTask(existing);
                    setEditingId(existing.id);
                }
            });
        }
    }, [id]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(editingId) {
            await updateTask(editingId, task);
        } else {
            await createTask(task);
        }
        navigate('/');
    };

  return (
    <div className="flex flex-col h-[800px] items-center self-center mt-6">
        <h1 className="mb-5 text-5xl font-bold text-amber-50">Ingresar Tarea</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-16 bg-purple-950 p-8 rounded-2xl w-[563px] h-[735px]">
            <div className="flex flex-col gap-4">
                <label htmlFor="title" className="font-bold text-amber-50">Agregrar un título</label>
                <input 
                    type="text" 
                    name="title" id="title" 
                    placeholder="Título" value={task.title} 
                    onChange={e => setTask({ ...task, title: e.target.value })} 
                    className="w-[501px] h-12 border-amber-500 border-2 rounded-xl placeholder:italic placeholder:text-amber-50 p-2"
                    />
            </div>
            
            <div className="flex flex-col gap-4">
                <label htmlFor="description" className="font-bold text-amber-50">Agregar una descripción</label>
                <textarea 
                    name="description" 
                    id="description" 
                    placeholder="Descripción" 
                    value={task.description} 
                    onChange={e => setTask({ ...task, description: e.target.value })}
                    className="resize-none w-[501px] h-[234px] border-amber-500 border-2 rounded-xl placeholder:italic placeholder:text-amber-50 p-2"
                    ></textarea>
            </div>
            <button 
                type="submit"
                className="font-bold bg-amber-500 w-[233px] h-[61px] m-auto border-amber-500 border-2 rounded-xl text-white hover:bg-white hover:text-amber-500 hover:cursor-pointer"     
            >{editingId ? 'Actualizar' : 'Crear'}</button>
        </form>
    </div>
  )
}

export default TaskForm