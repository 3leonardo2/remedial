import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import axios from "axios";
export default function App() {
  const handleLEDOn = async () => {
    try {
      await axios.get("http://192.168.1.123/led/on"); // Reemplaza con tu IP real
      Alert.alert("LED Encendido");
    } catch (error) {
      console.error(error);
      Alert.alert("Error encendiendo el LED");
    }
  };
  const handleLEDOff = async () => {
    try {
      await axios.get("http://192.168.1.123/led/off"); // Reemplaza con tu IP real
      Alert.alert("LED Apagado");
    } catch (error) {
      console.error(error);
      Alert.alert("Error apagando el LED");
    }
  };
  return (
    <View style={styles.container}>
      <Text>Control de LED con ESP32</Text>
      <View style={styles.buttonContainer}>
        <Button title="Encender LED" onPress={handleLEDOn} />
      </View>
      <View style={styles.buttonContainer}></View>
      <Button title="Apagar LED" onPress={handleLEDOff} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
