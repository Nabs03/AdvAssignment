import { useState } from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native';
import { db, storage } from './firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function FirestoreOnlyRegistration() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      let imageUrl = '';
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const storageRef = ref(storage, `profileImages/${Date.now()}.jpg`);
        await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Save user data in Firestore
      await setDoc(doc(db, 'users', email), {
        name,
        email,
        password,
        image: imageUrl,
      });

      Alert.alert('Success', 'User registered successfully!');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setImage('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Try again.');
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={{ width: 170, height: 170, borderWidth: 2, marginTop: 50 }}>
          {image ? <Image source={{ uri: image }} style={styles.image} /> : null}
        </View>
        <TouchableOpacity onPress={pickImage} style={{ marginTop: 10 }}>
          <Text style={{ color: 'blue' }}>Pick Image</Text>
        </TouchableOpacity>

        <SafeAreaProvider>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <View style={{ width: 300, marginTop: 10, alignSelf: 'center' }}>
              <Button title="Register" color="green" onPress={handleRegister} />
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 10,
    padding: 10,
  },
});
