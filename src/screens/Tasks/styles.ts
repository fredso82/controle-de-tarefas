import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#FAFAFA",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 64,
    },
    containerTasks: {
        flex: 1,
        marginTop: 15,
        width: "100%",
        maxHeight: "50%",
    },
    titleToDo: {
        color: "#FF0000",
        fontWeight: "bold",
        fontSize: 20,
        paddingLeft: 20,
        marginBottom: 10,
    },
    titleDone: {
        color: "#0FA93D",
        fontWeight: "bold",
        fontSize: 20,
        paddingLeft: 20,
        marginBottom: 10,
    },
    addTask: {
        backgroundColor: "#FB621E",
        height: 60,
        width: 60,
        borderRadius: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: "5%",
        right: "5%",
        shadowOffset: {width: 3, height: 4},        
        elevation: 5
    }
});