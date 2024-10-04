import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Tasks } from "./src/screens/Tasks";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { TaskAdd } from "./src/screens/TaskAdd";
import React from "react";

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" >
                <Stack.Screen name="Home" component={Tasks} options={{headerShown: false, title: "Tarefas"}} /> 
                <Stack.Screen name="Task" component={TaskAdd} options={{title: "Nova Tarefa", presentation: "modal"}} />
            </Stack.Navigator>            
        </NavigationContainer>

        // <View style={styles.container}>
        //   <Text>Open up App.tsx to start working on your app!</Text>
        //   <StatusBar style="auto" />
        // </View>
        //<Tasks />

        

    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center",
//     },
// });
