// PostDetailScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PostDetailScreen = ({ route }) => {
  const { post } = route.params; // Obtener datos pasados desde HomeScreen

  return (
    <View style={styles.container}>
      <Text style={styles.seleccion}>Titulo de noticia:</Text>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.seleccion}>Descripción:</Text>
      <Text style={styles.body}>"" {post.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "black",
  },
  seleccion:{
    paddingBottom: 1,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
    color: "white",
  },
  title: {
    padding: 12,
    fontSize: 18,
    marginBottom: 5,
    color: "white",
  },
  body: {
    fontSize: 14,
    color: "white", 
    marginBottom: 10,
  },
});

export default PostDetailScreen;
