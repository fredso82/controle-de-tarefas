import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import TaskProvider from './src/context/TaskContext';
import { TaskAdd } from './src/screens/TaskAdd';
import { TaskDetails } from './src/screens/TaskDetails';
import { Tasks } from './src/screens/Tasks';
import Toast from 'react-native-toast-message';

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <TaskProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" >
                    <Stack.Screen name="Home" component={Tasks} options={{ title: "Tarefas", headerTitleAlign: "center"}} /> 
                    <Stack.Screen name="TaskAdd" component={TaskAdd} options={{title: "Nova Tarefa", headerTitleAlign: "center"}} />      
                    <Stack.Screen name="Details" component={TaskDetails} options={{title: "Detalhes da Tarefa", headerTitleAlign: "center"}} />
                </Stack.Navigator>            
            </NavigationContainer>
            <Toast position="bottom" visibilityTime={1000}  />
        </TaskProvider>
    );
}