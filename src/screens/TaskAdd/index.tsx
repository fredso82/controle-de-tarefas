import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { Alert, Keyboard, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { TaskContext } from '../../context/TaskContext';
import { Task } from '../../model/task';
import { RootStackParamList } from '../../routes/routes';
import { styles } from './styles';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList>;

export function TaskAdd() {
    const taskContext = useContext(TaskContext);
    const navigation = useNavigation<Props["navigation"]>();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const openGalery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          console.log(result);

    if (!result.canceled) {
      console.log(result.assets[0].uri);
    }
    }

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            base64: true,  // Enable base64 encoding
            quality: 1,    // Image quality (1 is highest)
          });

          if (!result.canceled) {
            const base64Image = result.assets[0].base64;
            console.log(result.assets[0].uri);  // Display the image
            console.log(base64Image);             // Save the image in AsyncStorage
          }
      
    }

    function addTask() {
        const taskAdd = {
            title: title,
            description: description,
            done: false,
        } as Task;

        taskContext.createTask(taskAdd);
        setTitle("");
        setDescription("");
        Toast.show({
            type: "success",
            text1: "Tarefa cadastrada com sucesso!",
        })
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
                <TouchableOpacity
                    style={styles.camera}
                    onPress={openGalery}>
                    <Feather name="image" size={30} color="#000"></Feather>
                    <Text>Imagens</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.camera}
                    onPress={openCamera}>
                    <Feather name="camera" size={30} color="#000"></Feather>
                    <Text>Câmera</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.containerFooter}>
                <TouchableOpacity
                    style={styles.buttonCreate}
                    onPress={() => addTask()}>
                    <Text style={styles.labelButton}>Criar nova tarefa</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    style={styles.buttonBack}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.labelButton}>Voltar</Text>
                </TouchableOpacity> */}
            </View>
        </Pressable>
    );
}
