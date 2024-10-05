import { useContext } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { TaskContext } from '../../context/TaskContext';
import { styles } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/routes';

type Props = NativeStackScreenProps<RootStackParamList>;

export function TaskDetails() {
    const { selectedTask, removeTask } = useContext(TaskContext);
    const navigation = useNavigation<Props["navigation"]>();
    
    function handleRemoveTask() {
        removeTask(selectedTask);
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.cardTask}>
                <Text style={styles.taskTittle}>{selectedTask.title}</Text>
                <Text style={styles.taskDescription}>{selectedTask.description}</Text>
            </View>
            <View style={styles.containerFooter}>
                <TouchableOpacity
                    style={styles.buttonDone}
                    onPress={() => Alert.alert("done")}>
                    <Text style={styles.labelButton}>Finalizar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonDelete}
                    onPress={handleRemoveTask}>
                    <Text style={styles.labelButton}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}