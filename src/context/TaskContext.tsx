import { createContext, ReactNode, useEffect, useState } from "react";
import { Task } from "../model/task";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TaskProviderProps {
    children: ReactNode;
}

interface TaskContextProps {
    tasks: Task[];
    addTask: (task: Task) => void;
    removeTask: (task: Task) => void;
}

export const TaskContext = createContext<TaskContextProps>({
    tasks: [],
    addTask: () => {},
    removeTask: () => {}
});

function TaskProvider({ children }: TaskProviderProps) {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        //AsyncStorage.removeItem("@Taks");
        async function loadTaks() {
            const tasks = await AsyncStorage.getItem("@Taks");
            if (tasks) {
                setTasks(JSON.parse(tasks));
            }
            //console.log(tasks);
        }

       // loadTaks();
    }, []);

    async function addTask(task: Task) {
        // console.log("tasks" as string);
        // console.log(task ?? {});
        task.id = tasks.length + 1;
        const newTaks = [...tasks, task] as Task[];
        
        // console.log("Tasks1" as string);
        // console.log(newTaks ?? []);
        
        setTasks(newTaks);
        await AsyncStorage.setItem("@Taks", JSON.stringify(tasks));
        
        // console.log("Tasks2" as string);
        // console.log(tasks ?? []);
    }

    async function removeTask(task: Task) {
        const newTasks = tasks.filter(t => t.id !== task.id);
        setTasks(newTasks);
        await AsyncStorage.setItem("@Tasks", JSON.stringify(newTasks));
    }

    return (
        <TaskContext.Provider value={{tasks, addTask, removeTask}}>
            {children}
        </TaskContext.Provider>
    );
}

export default TaskProvider;
