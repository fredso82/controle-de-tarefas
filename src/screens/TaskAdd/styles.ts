import { cloneElement } from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 13,
        flex: 1,
    },
    form: {
        gap: 20,
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
        height: 160,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#000",
        paddingVertical: 15,
        paddingHorizontal: 12,
    },
    containerCamera: {
        flexDirection: "row",
        justifyContent: "space-between",
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
    containerImage: {        
        alignItems: "center"
    },
    image: {
        width: 300,
        height: 300,
    },
    // buttonBack: {
    //     backgroundColor: "red",
    //     width: "45%",
    //     borderRadius: 20,
    //     height: 50,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     marginTop: "auto",
    //     marginBottom: 25,
    // },
    labelButton: {
        color: "white",
        fontSize: 18,
    },
    containerFooter: {
        flexGrow: 1,
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
        paddingBottom: 20
    }
});
