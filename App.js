import React, {  useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Formulario from './components/Formulario';
import IntentoSesion from './components/IntentoSesion';

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
                    <Stack.Screen name="Formulario" component={Formulario} />
                    <Stack.Screen name="IntentoSesion" component={IntentoSesion} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;