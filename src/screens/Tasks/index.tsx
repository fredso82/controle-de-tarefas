import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FlatList, Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FilterType, TaskFilter } from '../../components/TaskFilter';
import { TaskItem } from '../../components/TaskItem';
import { Task } from '../../model/task';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/routes';

type Props = NativeStackScreenProps<RootStackParamList>;

export function Tasks() {
    const navigation = useNavigation<Props['navigation']>();

    const [tasks, setTasks] = useState<Task[]>();
    const [tasksToDo, setTasksToDo] = useState<Task[] | null>();
    const [tasksDone, setTasksDone] = useState<Task[] | null>();

    useEffect(() => {
        const tasks = [
            { id: 1, title: "task 1", description: "", done: false },
            { id: 2, title: "task 2", description: "", done: false },
            { id: 3, title: "task 3", description: "", done: false },
            { id: 4, title: "task 4", description: "", done: true },
            { id: 5, title: "task 5", description: "", done: true },
            { id: 6, title: "task 6", description: "", done: true },
        ];
        setTasks(tasks);
        setTasksToDo(tasks?.filter((t) => !t.done));
        setTasksDone(tasks?.filter((t) => t.done));
    }, []);

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

    function changeTaskStatus(taskChanged: Task) {
        let task = tasks?.findLast((t) => t.id === taskChanged.id);
        if (task) {
            task.done = !task.done;
            setTasks(tasks);
            setTasksToDo(tasks?.filter((t) => !t.done));
            setTasksDone(tasks?.filter((t) => t.done));
        }
    }

    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <TaskFilter onPress={filter} />

            {tasksToDo && tasksToDo.length > 0 && (
                <View style={styles.containerTasks}>
                    <Text style={styles.titleToDo}>A Fazer</Text>
                    <FlatList
                        scrollEnabled={true}
                        data={tasksToDo}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TaskItem
                                task={item}
                                onPress={() => alert("press")}
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
                                onPress={() => alert("press")}
                                onStatusChange={changeTaskStatus}
                            />
                        )}
                    />
                </View>
            )}
            <TouchableOpacity style={styles.addTask} onPress={() => navigation.navigate('Task') }>
                <Feather name='plus' size={40} color='white'></Feather>
            </TouchableOpacity>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#FAFAFA",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 64,
    },
    containerTasks: {
        flex: 1,
        marginTop: 15,
        width: "100%",
        maxHeight: "50%",
    },
    titleToDo: {
        color: "#FF0000",
        fontWeight: "bold",
        fontSize: 20,
        paddingLeft: 20,
        marginBottom: 10,
    },
    titleDone: {
        color: "#0FA93D",
        fontWeight: "bold",
        fontSize: 20,
        paddingLeft: 20,
        marginBottom: 10,
    },
    addTask: {
        backgroundColor: "#FB621E",
        height: 60,
        width: 60,
        borderRadius: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: "5%",
        right: "5%",
        shadowOffset: {width: 3, height: 4},        
        elevation: 5
    }
});
