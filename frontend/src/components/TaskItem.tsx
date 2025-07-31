import type { Task } from '../types/types'

interface Props {
    task: Task;
    onDelete: (id: string) => void;
}
const TaskItem = ({ task, onDelete }: Props) => {
  return (
    <div className='flex flex-col justify-center bg-purple-500 w-[200px] h-[150px] border-2 rounded-2xl p-4'>
        <h3 className='text-xl text-amber-200 font-bold'>{task.title}</h3>
        <p className='text-amber-50 w-[150px] truncate'>{task.description}</p>
        <small className='text-amber-600 font-bold'>{new Date(task.createdAt).toLocaleString()}</small>
        <div className='flex justify-between'>
            <a href={`/edit/${task.id}`} className='bg-blue-400 w-[75px] text-center text-amber-50 rounded-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110'>Editar</a>
            <button onClick={() => onDelete(task.id)} className='bg-red-400 w-[75px] text-center text-amber-50 rounded-lg hover:cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110'>Eliminar</button>
        </div>
    </div>
  )
}

export default TaskItem