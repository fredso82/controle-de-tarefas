import { useContext } from 'react';
import { Text, View } from 'react-native';

import { TaskContext } from '../../context/TaskContext';


export function TaskDetails() {
    const {selectedTask} = useContext(TaskContext);

    return (
        <View>
            <Text>{selectedTask.title}</Text>
            <Text>{selectedTask.description}</Text>
        </View>
    );
}