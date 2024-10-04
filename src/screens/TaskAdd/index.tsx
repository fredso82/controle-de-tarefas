import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export function TaskAdd() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

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

            <TouchableOpacity
                style={styles.buttonCreate}
                onPress={() => Alert.alert("teste")}
            >
                <Text style={styles.labelCreate}>Criar nova tarefa</Text>
            </TouchableOpacity>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 13,
        gap: 20,
        flex: 1,
    },
    containerGroup: {
        gap: 5,
    },
    label: {
        fontSize: 16,
        marginLeft: 4,
        color: "#000",
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 12,
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#000",
    },
    textArea: {
        height: 235,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#000",
        paddingVertical: 15,
        paddingHorizontal: 12,
    },
    containerCamera: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    camera: {
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 13,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 155,
        height: 54,
        gap: 20,
    },
    buttonCreate: {
        backgroundColor: "#204D29",
        width: "100%",
        borderRadius: 20,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "auto",
        marginBottom: 25,
    },
    labelCreate: {
        color: "white",
        fontSize: 18,
    },
});
