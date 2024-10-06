import { Feather } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { useContext, useState } from "react";
import {
    Alert,
    Image,
    Keyboard,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Toast from "react-native-toast-message";

import { TaskContext } from "../../context/TaskContext";
import { Task } from "../../model/task";
import { RootStackParamList } from "../../routes/routes";
import { styles } from "./styles";
import * as Yup from "yup";
import { Formik } from "formik";

type Props = NativeStackScreenProps<RootStackParamList>;

export function TaskAdd() {
    const taskContext = useContext(TaskContext);

    //const [title, setTitle] = useState("");
    //const [description, setDescription] = useState("");
    const [imageUri, setImageUri] = useState("");

    const TaskSchema = Yup.object().shape({
        taskTitle: Yup.string().required("Informe o título"),
    });

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
            alert("É necessário fornecedor acesso à câmera!");
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

    async function addTask(taskTitle: string, taskDescription: string) {
        if (
            taskContext.tasks.some(
                (t) =>
                    t.title.trim().toUpperCase() ===
                    taskTitle.trim().toUpperCase()
            )
        ) {
            return Alert.alert("Erro!", "Tarefa já existe!");
        }

        const taskAdd = {
            title: taskTitle,
            description: taskDescription,
            done: false,
            image: imageUri,
        } as Task;

        taskContext.createTask(taskAdd);
        //setTitle("");
        //setDescription("");
        setImageUri("");

        Toast.show({
            type: "success",
            text1: "Tarefa cadastrada com sucesso!",
        });
    }
    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <Formik
                initialValues={{ taskTitle: "", taskDescription: "" }}
                validationSchema={TaskSchema}
                onSubmit={(value, { resetForm }) => {
                    addTask(value.taskTitle, value.taskDescription);
                    resetForm({
                        values: { taskTitle: "", taskDescription: "" },
                    });
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                }) => (
                    <View>
                        <View style={styles.containerGroup}>
                            <Text style={styles.label}>Título</Text>
                            <TextInput
                                style={styles.input}
                                value={values.taskTitle}
                                onChangeText={handleChange}
                            />
                        </View>
                        <View style={styles.containerGroup}>
                            <Text style={styles.label}>Descrição</Text>
                            <TextInput
                                style={styles.textArea}
                                multiline={true}
                                numberOfLines={16}
                                textAlignVertical="top"
                                value={values.taskDescription}
                                onChangeText={handleChange}
                            />
                        </View>
                        <View style={styles.containerCamera}>
                            <TouchableOpacity
                                style={styles.camera}
                                onPress={openGalery}
                            >
                                <Feather
                                    name="image"
                                    size={30}
                                    color="#000"
                                ></Feather>
                                <Text>Imagens</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.camera}
                                onPress={openCamera}
                            >
                                <Feather
                                    name="camera"
                                    size={30}
                                    color="#000"
                                ></Feather>
                                <Text>Câmera</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.containerImage}>
                            {imageUri && (
                                <Image
                                    style={styles.image}
                                    source={{ uri: imageUri }}
                                />
                            )}
                        </View>
                        <View style={styles.containerFooter}>
                            <TouchableOpacity
                                style={styles.buttonCreate}
                                onPress={() => handleSubmit()}
                            >
                                <Text style={styles.labelButton}>
                                    Criar nova tarefa
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </Pressable>
    );
}
