const API_URL = import.meta.env.VITE_API_URL;

export const getTasks = async () => {
    const res = await fetch(`${API_URL}/tasks`)
    if(!res.ok) {
        throw new Error(`Error al obtener tareas: ${res.statusText}`);
    } 
    return res.json();
};

export const createTask = async (task: unknown) => {
    const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(task),
    });
    return res.json();
}

export const updateTask = async (id: string, task: unknown) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(task),
    });

    return res.json();
}

export const deleteTask = async (id: string) => {
    await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE'
    });
};