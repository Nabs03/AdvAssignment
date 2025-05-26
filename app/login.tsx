import React from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const userRef = doc(db, 'users', data.username); // `username` should be user's email (or unique key)
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        if (userData.password === data.password) {
          Alert.alert('Login Success', `Welcome, ${userData.name}`);
        } else {
          Alert.alert('Login Failed', 'Incorrect password');
        }
      } else {
        Alert.alert('Login Failed', 'User not found');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={{ marginTop: 200, alignItems: 'center' }}>
          <Controller
            control={control}
            rules={{ required: 'Username is required' }}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Username (email)"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
              />
            )}
          />
          {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

          <Controller
            control={control}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            }}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

          <View style={{ width: 300, marginTop: 10 }}>
            <Button title="Login" color="green" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = {
  input: {
    width: 300,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 5
  },
  error: {
    color: 'red'
  }
};

export default Login;
