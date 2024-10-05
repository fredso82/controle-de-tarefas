import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { Alert, Keyboard, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { RootStackParamList } from '../../routes/routes';
import { styles } from './styles';
import { TaskContext } from '../../context/TaskContext';
import { Task } from '../../model/task';

type Props = NativeStackScreenProps<RootStackParamList>;

export function TaskAdd() {
    const taskContext = useContext(TaskContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigation = useNavigation<Props["navigation"]>();

    function addTask() {
        const taskAdd  = {
            title: title,
            description: description
        } as Task;
        taskContext.addTask(taskAdd);
        setTitle("");
        setDescription("");
    }
    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.containerGroup}>
                <Text style={styles.label}>Título</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                ></TextInput>
            </View>
            <View style={styles.containerGroup}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput
                    style={styles.textArea}
                    multiline={true}
                    numberOfLines={16}
                    textAlignVertical="top"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                ></TextInput>
            </View>
            <View style={styles.containerCamera}>
                <TouchableOpacity
                    style={styles.camera}
                    onPress={() => Alert.alert("teste")}
                >
                    <Feather name="image" size={30} color="#000"></Feather>
                    <Text>Imagens</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.camera}
                    onPress={() => Alert.alert("teste")}
                >
                    <Feather name="camera" size={30} color="#000"></Feather>
                    <Text>Câmera</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.containerFooter}>
                <TouchableOpacity
                    style={styles.buttonCreate}
                    onPress={() => addTask()}
                >
                    <Text style={styles.labelCreate}>Criar nova tarefa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonBack}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.labelCreate}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </Pressable>
    );
}