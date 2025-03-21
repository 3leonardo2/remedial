import React from "react";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";

const HomeScreen = () => {
  const [post, setPost] = React.useState(null);
  useEffect(() => {
    try{
    const respuesta = await axios.get(`https://jsonplaceholder.typecode.com/posts`).then((response) => {
      setPost(response.data);
    }).catch(e=>[]);
    if (!post) return null;
g
}
  return (
    <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item => item.id.toString())}
    />
    );
  };

  export default HomeScreen;