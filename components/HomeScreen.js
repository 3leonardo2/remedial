import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  // Obtener datos de la API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchPosts();
  }, []);

  // Cerrar sesión y volver a LoginScreen
  const cerrarSession = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      navigation.replace("LoginScreen");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Navegar a detalles del post
  const vistaDetalles = (post) => {
    navigation.navigate("PostDetailScreen", { post });
  };

  // Renderizar cada publicación
  const renderItem = ({ item }) => (
    <View style={styles.contenedorItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body} numberOfLines={2}>
        {item.body}
      </Text>

      <View style={styles.contenedorBoton}>
        <Button
          title="Ver Detalles"
          onPress={() => vistaDetalles(item)}
          color="#4CAF50"
        />
      </View>
    </View>
  );
  return (
    <View style={styles.contenedor}>
      <View style={styles.terminarSession}>
        <Button title="Cerrar Sesión" color="red" onPress={cerrarSession} />
      </View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 16,
    backgroundColor: "black",
  },
  terminarSession: {
    alignItems: "flex-end",
    marginBottom: 12,
  },
  contenedorItem: {
    padding: 12,
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#4b4c4d",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
    color: "white",
  },
  body: {
    fontSize: 14,
    color: "white",
    marginBottom: 10,
  },
  contenedorBoton: {
    marginTop: 8,
  },
});

export default HomeScreen;
