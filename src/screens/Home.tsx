import React, { useCallback, useState } from 'react';
import { 
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import { FriendList } from '../components/FriendList';

interface Data {
  id: string,
  name: string,
  likes: number
}

export function Home() {
  const [name, setName] = useState('');
  const [friends, setFriends] = useState([]);

  async function handleSearch() {
    const response = await fetch(`http://192.168.1.106:3333/friends?q=${name}`);
    const data = await response.json();

    const formattedData = data.map((item: Data) => {
      return {
        id: item.id,
        name: item.name,
        likes: item.likes,
        online: `${new Date().getHours()}:${new Date().getMinutes()}`
      }
    });

    setFriends(formattedData);
  }

  const handleUnfollow= useCallback(() => {
    console.log('Unfollow friend');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amigos</Text>

      <TextInput 
        placeholder="Nome do cliente"
        onChangeText={setName}
        style={styles.input}
      />

      <Button
        title="Buscar"
        onPress={handleSearch}
      />
      
      <FriendList 
        data={friends}
        unfollow={handleUnfollow}  
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    padding: 25
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 10
  },
  list: {
    marginTop: 20,
  }
})