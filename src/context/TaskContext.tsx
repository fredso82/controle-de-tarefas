import { createContext, ReactNode, useEffect, useState } from "react";
import { Task } from "../model/task";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TaskProviderProps {
    children: ReactNode;
}

interface TaskContextProps {
    tasks: Task[];
    setTasks: ([]: Task[]) => void;
    createTask: (task: Task) => void;
    removeTask: (task: Task) => void;
}

export const TaskContext = createContext<TaskContextProps>({
    tasks: [],
    setTasks: () => {},
    createTask: () => {},
    removeTask: () => {}
});

function TaskProvider({ children }: TaskProviderProps) {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        loadTaks();
    }, []);

    useEffect(() => {
        storeTasks(tasks);
    }, [tasks]);

    async function loadTaks() {
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

    return (
        <TaskContext.Provider value={{tasks, setTasks, createTask, removeTask}}>
            {children}
        </TaskContext.Provider>
    );
}

export default TaskProvider;
