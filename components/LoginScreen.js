import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const validaciones = Yup.object().shape({
      correo: Yup.string().email().required('Ingrese un correo valido'),
      contrasena: Yup.number().required('Ingrese una contraseña valida'),
    });

    const handleLogin = async () => { 
        try {
            if (correo === 'leonardo@gmail.com' && password === 'contraS') { // Verificar las credenciales
                const token = 'faketoken123'; // Token de usuario
                await AsyncStorage.setItem('userToken', token); //  Guardar el token de usuario
                navigation.navigate('HomeScreen'); // Pasar el nombre de usuario como parámetro
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
             <Formik
                    initialValues={{ correo: '', contrasena: '' }}
                    validationSchema={validaciones}
                    onSubmit={(values) => {
                      console.log('Formulario enviado:', values);
                    }}
                  >
            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                placeholderTextColor="gray"
                value={correo}
                onChangeText={setCorreo}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="gray"
                value={contrasena}
                onChangeText={setContrasena}
                secureTextEntry
            />
            <Button title="Iniciar Sesión" onPress={handleLogin} />
            </Formik>
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

export default LoginScreen;