import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Validaciones con yup
const validaciones = Yup.object().shape({
  nombre: Yup.string().required('El nombre es requerido'),
  edad: Yup.number().required('La edad es requerida').integer('La edad debe ser un número entero'),
  raza: Yup.string().required('La raza es requerida'),
  colorPelo: Yup.string().required('El color de pelo es requerido'),
});

const Formulario = ({ navigation, route }) => {
  const username = route?.params?.username || 'Usuario'; // Obtener el nombre de usuario de los parámetros de navegación

  const handleLogout = async () => { // Función para cerrar sesión
    try {
      await AsyncStorage.removeItem('userToken'); // Elimina el token de usuario
      navigation.reset({ // Resetea la navegación al cerrar sesión
        index: 0, // Volver al inicio
        routes: [{ name: 'IntentoSesion' }], // Ir a la pantalla de inicio de sesión
      });
    } catch (e) {
      console.error('Error al cerrar sesión', e); // Mostrar error en consola
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hola, {username}!</Text> {/* Mostrar el saludo con el nombre de usuario */}
      <Formik
        initialValues={{ edad: '', raza: '', nombre: '', colorPelo: '' }}
        validationSchema={validaciones}
        onSubmit={(values) => {
          console.log('Formulario enviado:', values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Text style={styles.title}>Registro de lomitos</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              onChangeText={handleChange('nombre')}
              onBlur={handleBlur('nombre')}
              value={values.nombre}
            />
            {touched.nombre && errors.nombre && (
              <Text style={styles.error}>{errors.nombre}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Edad"
              onChangeText={handleChange('edad')}
              onBlur={handleBlur('edad')}
              value={values.edad}
              keyboardType="numeric"
            />
            {touched.edad && errors.edad && (
              <Text style={styles.error}>{errors.edad}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Raza"
              onChangeText={handleChange('raza')}
              onBlur={handleBlur('raza')}
              value={values.raza}
            />
            {touched.raza && errors.raza && (
              <Text style={styles.error}>{errors.raza}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Color de pelo"
              onChangeText={handleChange('colorPelo')}
              onBlur={handleBlur('colorPelo')}
              value={values.colorPelo}
            />
            {touched.colorPelo && errors.colorPelo && (
              <Text style={styles.error}>{errors.colorPelo}</Text>
            )}

            <Button onPress={handleSubmit} title="REGISTRAR LOMITO" />
          </View>
        )}
      </Formik>
      <Button onPress={handleLogout} title="Cerrar Sesión" color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  greeting: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Formulario;