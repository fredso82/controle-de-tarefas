import Checkbox from "expo-checkbox";
import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

export interface TaskFilterProps {
    onPress: (filterType: FilterType) => void;
}

export enum FilterType {
    All,
    ToDo,
    Done,
}

export function TaskFilter(props: TaskFilterProps) {
    const [filterAll, setFilterAll] = useState(true);
    const [filterToDo, setFilterToDo] = useState(false);
    const [filterDone, setFilterDone] = useState(false);

    function filter(filterType: FilterType) {
        switch (filterType) {
            case FilterType.ToDo:
                setFilterAll(false);
                setFilterToDo(true);
                setFilterDone(false);
                break;

            case FilterType.Done:
                setFilterAll(false);
                setFilterToDo(false);
                setFilterDone(true);
                break;

            default:
                setFilterAll(true);
                setFilterToDo(false);
                setFilterDone(false);
                break;
        }

        props.onPress(filterType);
    }

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Checkbox style={styles.checkbox}
                    value={filterAll}                    
                    onValueChange={() => filter(FilterType.All)}
                />
                <Text>Todas</Text>
            </View>
            <View style={styles.section}>
                <Checkbox style={styles.checkbox}
                    value={filterToDo}
                    onValueChange={() => filter(FilterType.ToDo)}
                />
                <Text>A fazer</Text>
            </View>
            <View style={styles.section}>
                <Checkbox style={styles.checkbox}
                    value={filterDone}
                    onValueChange={() => filter(FilterType.Done)}
                />
                <Text>Feitas</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        padding: 10
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    checkbox: {
        transform: [{scaleX: 1.2}, {scaleY: 1.2}],
        
    }
});
