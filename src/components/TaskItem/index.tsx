import { View, Text, StyleSheet, Pressable } from "react-native";
import { Task } from "../../model/task";
import Checkbox from "expo-checkbox";

export interface TaskProps {
    task: Task;
    onPress: () => void;
    onStatusChange: () => void;
}

export function TaskItem(props: TaskProps) {
    return (
        <Pressable onPress={props.onPress} style={styles.container}>
            <Checkbox
                value={props.task.done}
                onValueChange={props.onStatusChange}
            />
            <Text>{props.task.title}</Text>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: "#FFFFFF",
        height: 48,
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 10
    }
})