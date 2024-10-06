import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { useContext, useState } from 'react';
import { Alert, Image, Keyboard, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { TaskContext } from '../../context/TaskContext';
import { Task } from '../../model/task';
import { RootStackParamList } from '../../routes/routes';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList>;

export function TaskAdd() {
    const taskContext = useContext(TaskContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUri, setImageUri] = useState("");

    const openGalery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            alert("Sorry, we need camera permissions to make this work!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            base64: true, 
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    async function addTask() {
        if (title.trim() === "") {
            Alert.alert("Atenção!", "Informe o título da tarefa");
            return;
        }

        if (taskContext.tasks.some((t) => t.title.trim().toUpperCase() === title.trim().toLocaleUpperCase())) {
            Alert.alert("Atenção!", "Já existe uma tarefa com esse título");
            return;
        }
        const taskAdd = {
            title: title,
            description: description,
            done: false,
            image: imageUri
        } as Task;

        taskContext.createTask(taskAdd);
        setTitle("");
        setDescription("");
        setImageUri("");

        Toast.show({
            type: "success",
            text1: "Tarefa cadastrada com sucesso!",
        });
    }
    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.containerGroup}>
                <Text style={styles.label}>Título</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
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
                />
            </View>
            <View style={styles.containerCamera}>
                <TouchableOpacity style={styles.camera} onPress={openGalery}>
                    <Feather name="image" size={30} color="#000"></Feather>
                    <Text>Imagens</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.camera} onPress={openCamera}>
                    <Feather name="camera" size={30} color="#000"></Feather>
                    <Text>Câmera</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerImage}>
                {imageUri && <Image style={styles.image} source={{uri: imageUri}} />}
            </View>
            
            <View style={styles.containerFooter}>
                <TouchableOpacity
                    style={styles.buttonCreate}
                    onPress={() => addTask()}
                >
                    <Text style={styles.labelButton}>Criar nova tarefa</Text>
                </TouchableOpacity>
            </View>
        </Pressable>
    );
}
