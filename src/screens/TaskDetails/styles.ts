import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 9
    },
    cardTask: {
        backgroundColor: "#FFF",
        width: "100%",
        shadowOffset: { width: 3, height: 4 },
        elevation: 5,
        padding: 12,
        gap: 25,
        paddingBottom: 50
    },
    taskTittle: {
        fontSize: 20,
        fontWeight: "bold"
    },
    taskDescription: {
        fontSize: 18
    },
    containerFooter: {
        width: "100%",
        flexGrow: 1,
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
        paddingBottom: 20
    },
    // buttonDone: {
    //     backgroundColor: "#204D29",
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
    buttonDelete: {
        backgroundColor: "#FC1E1E",
        width: "100%",
        borderRadius: 20,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "auto",
        marginBottom: 25,
    }
});