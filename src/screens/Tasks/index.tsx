import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import {
    FlatList,
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { TaskItem } from "../../components/TaskItem";
import { Task } from "../../model/task";

export function Tasks() {
    const [tasks, setTasks] = useState<Task[]>();
    const [filterAll, setFilterAll] = useState(true);
    const [filterToDo, setFilterToDo] = useState(false);
    const [filterDone, setFilterDone] = useState(false);

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

    function filter(valueAll: boolean, valueToDo: boolean, valueDone: boolean) {
        setFilterAll(valueAll);
        setFilterToDo(valueToDo);
        setFilterDone(valueDone);
    }

    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.containerFilter}>
                <View style={styles.section}>
                    <Checkbox
                        value={filterAll}
                        onValueChange={() => filter(true, false, false)}
                    />
                    <Text>Todas</Text>
                </View>
                <View style={styles.section}>
                    <Checkbox
                        value={filterToDo}
                        onValueChange={() => filter(false, true, false)}
                    />
                    <Text>A fazer</Text>
                </View>
                <View style={styles.section}>
                    <Checkbox
                        value={filterDone}
                        onValueChange={() => filter(false, false, true)}
                    />
                    <Text>Feitas</Text>
                </View>
            </View>
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
    containerFilter: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10,
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
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
