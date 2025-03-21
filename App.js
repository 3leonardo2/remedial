import React, {  useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import Homescreen from './components/HomeScreen';
import PostDetailScreen from './components/PostDetailScreen';

const Stack = createStackNavigator();

const App = () => {

    useEffect(() => { // Verificar si hay una sesión activa
        const checkSession = async () => { // Función para verificar la sesión
            const token = await AsyncStorage.getItem('userToken'); // Obtener el token de usuario
            setIsLoggedIn(!!token); // Actualizar el estado de la sesión
        };
        checkSession(); // Verificar si hay una sesión activa
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="HomeScreen" component={Homescreen} />
              <Stack.Screen name="PostDetailScreen" component={PostDetailScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;