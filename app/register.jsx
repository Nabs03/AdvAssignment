import { useState } from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity, TextInput, Button} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-web';

export default function ImagePickerExample() {
  const [image, setImage] = useState('')

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  };

  return (
    <View>
        <View style={styles.container}>
            <View style={{
                width:170,
                height:170,
                borderWidth:2,
                marginTop: 50,
            }}>
                 {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={pickImage} style={{
                marginTop:10
            }}>
                <Text style={{
                    color:'blue'
                }}>Pick Image</Text>
            </TouchableOpacity>
            <SafeAreaProvider>
                <SafeAreaView>
                <TextInput
          style={{width:300, 
            height:40, 
            borderColor: 'black', 
            borderWidth:1,
            alignSelf:'center', 
            marginTop: 10, 
            padding: 10}}
          placeholder="Name"
        />
        <TextInput
          style={{
            width:300, 
            height:40, 
            borderColor: 'black', 
            borderWidth:1, 
            alignSelf:'center', 
            marginTop: 10, 
            padding: 10}}
          placeholder="Email"
        />
        <TextInput
          style={{
            width:300, 
            height:40, 
            borderColor: 'black', 
            borderWidth:1, 
            alignSelf:'center', 
            marginTop: 10, 
            padding: 10}}
          placeholder="Password"
        />
        <TextInput
          style={{
            width:300, 
            height:40, 
            borderColor: 'black', 
            borderWidth:1, 
            alignSelf:'center', 
            marginTop: 10, 
            padding: 10}}
          placeholder="Confirm Password"
        />
        <View style={{width: 300, marginTop:10, alignSelf:'center'}}>
        <Button 
          title="Register"
          color="green"
          />
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
    width: "100%",
    height: "100%",
  },
});
