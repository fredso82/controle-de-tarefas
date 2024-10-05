import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import TaskProvider from './src/context/TaskContext';
import { TaskAdd } from './src/screens/TaskAdd';
import { TaskDetails } from './src/screens/TaskDetails';
import { Tasks } from './src/screens/Tasks';

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <TaskProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" >
                    <Stack.Screen name="Home" component={Tasks} options={{headerShown: false, title: "Tarefas"}} /> 
                    <Stack.Screen name="TaskAdd" component={TaskAdd} options={{title: "Nova Tarefa", presentation: "modal"}} />      
                    <Stack.Screen name="Details" component={TaskDetails} options={{title: "Detalhes da Tarefa"}} />
                </Stack.Navigator>            
            </NavigationContainer>
        </TaskProvider>
    );
}