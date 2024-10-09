import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Keyboard, Pressable, Text, TouchableOpacity, View } from 'react-native';

import { FilterType, TaskFilter } from '../../components/TaskFilter';
import { TaskItem } from '../../components/TaskItem';
import { TaskContext } from '../../context/TaskContext';
import { Task } from '../../model/task';
import { RootStackParamList } from '../../routes/routes';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList>;

export function Tasks() {
    const {tasks, setTasks, selectTask} = useContext(TaskContext);
    const [orderedTasks, setOrderedTasks] = useState([] as Task[]);
    const navigation = useNavigation<Props['navigation']>();

    useEffect(() => {
        const tasksDone = tasks.filter((t) => !t.done);
        const tasksNotDone = tasks.filter((t) => t.done);
        setOrderedTasks(tasksDone.concat(tasksNotDone));
    }, [tasks]);

    function filter(filterType: FilterType) {
        const tasksDone = tasks.filter((t) => t.done);
        const tasksNotDone = tasks.filter((t) => !t.done);

        switch (filterType) {
            case FilterType.ToDo:
                setOrderedTasks(tasksNotDone);
                break;

            case FilterType.Done:
                setOrderedTasks(tasksDone);
                break;

            default:
                setOrderedTasks(tasksDone.concat(tasksNotDone));
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
                    data={orderedTasks}
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
            <TouchableOpacity style={styles.addTask} onPress={() => navigation.navigate('TaskAdd') }>
                <Feather name='plus' size={40} color='white'></Feather>
            </TouchableOpacity>
        </Pressable>
    );
}