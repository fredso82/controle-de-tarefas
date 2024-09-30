import { useEffect, useState } from 'react';
import { FlatList, Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';

import { FilterType, TaskFilter } from '../../components/TaskFilter';
import { TaskItem } from '../../components/TaskItem';
import { Task } from '../../model/task';

export function Tasks() {
    const [tasks, setTasks] = useState<Task[]>();


    useEffect(() => {
        const tasks = [
            { id: 1, title: "task 1", description: "", done: false },
            { id: 2, title: "task 2", description: "", done: false },
            { id: 3, title: "task 3", description: "", done: false },
            { id: 4, title: "task 4", description: "", done: true },
            { id: 5, title: "task 5", description: "", done: true },
        ];
        setTasks(tasks);
    }, []);

    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <TaskFilter onPress={(filterType: FilterType) => alert(filterType)} />

            <View style={styles.containerTasks}>
                <Text style={styles.titleToDo}>A fazer</Text>
                <FlatList scrollEnabled={true}
                    data={tasks?.filter((t) => !t.done)}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({item}) => (
                        <TaskItem task={item} onPress={() => alert("press")} onStatusChange={() => alert("status change")} />
                    )} />
                <Text style={styles.titleDone}>Feitas</Text>
                {/* <FlatList scrollEnabled={true}
                    data={tasks?.filter((t) => !t.done)}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({item}) => (
                        <Task task={item} onPress={() => alert("press")} onStatusChange={() => alert("status change")} />
                    )} /> */}
            </View>
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
        paddingTop: 64
    },
    containerTasks: {
        flex: 1,
        marginTop: 15,
        width: "100%",
    },
    titleToDo: {
        color: "#FF0000",
        fontWeight: "bold",
        fontSize: 20,
    },
    titleDone: {
        color: "#0FA93D",
        fontWeight: "bold",
        fontSize: 20,
    }
});
