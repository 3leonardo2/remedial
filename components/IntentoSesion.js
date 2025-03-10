import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IntentoSesion = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => { // Función para iniciar sesión
        try {
            if (username === 'leonardo' && password === 'contraS') { // Verificar las credenciales
                const token = 'faketoken123'; // Token de usuario
                await AsyncStorage.setItem('userToken', token); //  Guardar el token de usuario
                navigation.navigate('Formulario', { username }); // Pasar el nombre de usuario como parámetro
                console.log(navigation);
            } else {
                Alert.alert('Error', 'Usuario o contraseña incorrectos'); // Mostrar alerta de error
            }
        } catch (e) {
            console.error('Error en el inicio de sesión', e); // Mostrar error en consola
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inicio de Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                placeholderTextColor="gray"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="gray"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Iniciar Sesión" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'black',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        color: 'white',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        color: 'white',
    },
});

export default IntentoSesion;