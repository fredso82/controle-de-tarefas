import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { Task } from '../model/task';

interface TaskProviderProps {
    children: ReactNode;
}

interface TaskContextProps {
    selectedTask: Task;
    selectTask: (task: Task) => void;
    tasks: Task[];
    setTasks: ([]: Task[]) => void;
    createTask: (task: Task) => void;
    removeTask: (task: Task) => void;
}

export const TaskContext = createContext<TaskContextProps>({
    selectedTask: {} as Task,
    selectTask: () => {},
    tasks: [],
    setTasks: () => {},
    createTask: () => {},
    removeTask: () => {}
});

export default function TaskProvider({ children }: TaskProviderProps) {
    const [selectedTask, setSelectedTask] = useState<Task>({} as Task);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        loadTaks();
    }, []);

    useEffect(() => {
        storeTasks(tasks);
    }, [tasks]);

    async function loadTaks() {
        //await AsyncStorage.clear();

        const tasks = await AsyncStorage.getItem("@Tasks");
        if (tasks) {
            setTasks(JSON.parse(tasks));
        }
    }

    function createTask(task: Task) {
        task.id = tasks.length + 1;
        setTasks([...tasks, task]);
    }

    async function storeTasks(tasks: Task[]) {
        try {
            
            await AsyncStorage.setItem('@Tasks', JSON.stringify(tasks))
        } catch (error) {
            console.log(error);
        }
    }

    function removeTask(task: Task) {
        const newTasks = tasks.filter(t => t.id !== task.id);
        setTasks(newTasks);
    }

    function selectTask(task: Task) {
        setSelectedTask(task);
    }

    return (
        <TaskContext.Provider value={{selectedTask, selectTask, tasks, setTasks, createTask, removeTask}}>
            {children}
        </TaskContext.Provider>
    );
}
