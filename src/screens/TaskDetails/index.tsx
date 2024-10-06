import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { TaskContext } from '../../context/TaskContext';
import { RootStackParamList } from '../../routes/routes';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList>;

export function TaskDetails() {
    const { selectedTask, removeTask } = useContext(TaskContext);
    const navigation = useNavigation<Props["navigation"]>();

    function handleRemoveTask() {
        removeTask(selectedTask);
        Toast.show({
            type: "success",
            text1: "Tarefa excluída com sucesso!",
        });
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.cardTask}>
                <Text style={styles.taskTittle}>{selectedTask.title}</Text>
                <Text style={styles.taskDescription}>
                    {selectedTask.description}
                </Text>
            </View>
            {selectedTask.image && (
                <View style={styles.cardImage}>
                    <Image
                        style={styles.image}
                        source={{ uri: selectedTask.image }}
                    />
                </View>
            )}
            <View style={styles.containerFooter}>
                <TouchableOpacity
                    style={styles.buttonDelete}
                    onPress={handleRemoveTask}
                >
                    <Text style={styles.labelButton}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
