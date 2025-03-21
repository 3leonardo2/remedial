import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    
    const validaciones = Yup.object().shape({
    correo: Yup.string().email('Ingrese un correo válido').required('Campo requerido'),
    contrasena: Yup.string().required('Ingrese una contraseña válida'),
  });

  const handleLogin = async (values) => {
    try {
      const { correo, contrasena } = values;

      if (correo === 'leonardo@gmail.com' && contrasena === 'contraS') {
        const token = 'faketoken123'; // Token de usuario
        await AsyncStorage.setItem('userToken', token); //  Guardar el token de usuario
        navigation.navigate('HomeScreen');  
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');// Mostrar alerta de error
      }
    } catch (e) {
      console.error('Error en el inicio de sesión', e); //Mostrar error en consola
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
      
      <Formik
        initialValues={{ correo: '', contrasena: '' }}
        validationSchema={validaciones}
        onSubmit={(values) => handleLogin(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="gray"
              value={values.correo}
              onChangeText={handleChange('correo')}
              onBlur={handleBlur('correo')}
              autoCapitalize="none"
            />
            {errors.correo && <Text style={styles.error}>{errors.correo}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="gray"
              secureTextEntry
              value={values.contrasena}
              onChangeText={handleChange('contrasena')}
              onBlur={handleBlur('contrasena')}
              autoCapitalize="none"
            />
            {errors.contrasena && <Text style={styles.error}>{errors.contrasena}</Text>}

            <Button title="Iniciar Sesión" onPress={handleSubmit} />
          </>
        )}
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
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default LoginScreen;
