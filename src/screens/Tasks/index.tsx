import { Feather } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FilterType, TaskFilter } from '../../components/TaskFilter';
import { TaskItem } from '../../components/TaskItem';
import { Task } from '../../model/task';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/routes';
import { styles } from './styles';
import { TaskContext } from '../../context/TaskContext';

type Props = NativeStackScreenProps<RootStackParamList>;

export function Tasks() {
    const {tasks, setTasks, selectTask} = useContext(TaskContext);
    const navigation = useNavigation<Props['navigation']>();

    const [tasksToDo, setTasksToDo] = useState<Task[] | null>();
    const [tasksDone, setTasksDone] = useState<Task[] | null>();

    useEffect(() => {
        setTasksToDo(tasks?.filter((t) => !t.done));
        setTasksDone(tasks?.filter((t) => t.done));
    }, [tasks]);

    function filter(filterType: FilterType) {
        setTasksToDo(tasks?.filter((t) => !t.done));
        setTasksDone(tasks?.filter((t) => t.done));

        switch (filterType) {
            case FilterType.ToDo:
                setTasksDone(null);
                break;

            case FilterType.Done:
                setTasksToDo(null);
                break;
        }
    }

    function handleSelectTask(task: Task) {
        selectTask(task);
        navigation.navigate("Details");
    }

    function changeTaskStatus(taskChanged: Task) {
        let newTasks = [...tasks];
        const index = newTasks.findIndex((t) => t.id === taskChanged.id);
        if (index !== -1) {
            newTasks[index].done = !newTasks[index].done;
            setTasks(newTasks);
        }
    }

    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <TaskFilter onPress={filter} />
            
            <View style={styles.containerTasks}>                
                <FlatList
                    scrollEnabled={true}
                    data={tasks}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TaskItem
                            task={item}
                            onPress={handleSelectTask}
                            onStatusChange={changeTaskStatus}
                        />
                    )}
                    ListEmptyComponent={() => (                        
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.labelEmptyTasks}>
                                Você não possui tarefas!!!!
                            </Text>                            
                        </View>
                    )}
                />
            </View>
            {/* {tasksToDo && tasksToDo.length > 0 &&  (
                <View style={styles.containerTasks}>
                    <Text style={styles.titleToDo}>A Fazer</Text>
                    <FlatList
                        scrollEnabled={true}
                        data={tasksToDo}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TaskItem
                                task={item}
                                onPress={handleSelectTask}
                                onStatusChange={changeTaskStatus}
                            />
                        )}
                    />
                </View>
            )}
            {tasksDone && tasksDone.length > 0 && (
                <View style={styles.containerTasks}>
                    <Text style={styles.titleDone}>Feitas</Text>
                    <FlatList
                        scrollEnabled={true}
                        data={tasksDone}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TaskItem
                                task={item}
                                onPress={handleSelectTask}
                                onStatusChange={changeTaskStatus}
                            />
                        )}
                    />
                </View>
            )} */}
            <TouchableOpacity style={styles.addTask} onPress={() => navigation.navigate('TaskAdd') }>
                <Feather name='plus' size={40} color='white'></Feather>
            </TouchableOpacity>
        </Pressable>
    );
}