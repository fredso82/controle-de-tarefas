import { View, Text, StyleSheet, Pressable } from "react-native";
import { Task } from "../../model/task";
import Checkbox from "expo-checkbox";
import { useState } from "react";

export interface TaskProps {
    task: Task;
    onPress: (task: Task) => void;
    onStatusChange: (taskChanged: Task) => void;
}

export function TaskItem(props: TaskProps) {
    return (
        <Pressable onPress={() => props.onPress(props.task)} style={styles.container}>
            <Checkbox style={styles.checkbox}
                value={props.task.done}
                onValueChange={() => {
                    props.onStatusChange(props.task);
                }}
            />
            {props.task.done && <Text style={{textDecorationLine: "line-through"}}>{props.task.title}</Text>}
            {!props.task.done && <Text>{props.task.title}</Text>}
            
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
        paddingVertical: 10,
    },
    checkbox: {
        transform: [{scaleX: 1.1}, {scaleY: 1.1}],
        borderRadius: 50
    }
});
