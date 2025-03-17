import React, { createContext, useReducer, useContext, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";

// Initial State
const initialState = {
  users: [],
};

// Reducer Function
const userReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };
    case "EDIT_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};

// Create Context
const UserContext = createContext();

// Provider Component
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const UserList = () => {
  const { state, dispatch } = useContext(UserContext);
  return (
    <FlatList
      data={state.users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text>{item.name}</Text>
          <Button title="Edit" onPress={() => {}} />
          <Button title="Delete" onPress={() => dispatch({ type: "DELETE_USER", payload: item.id })} />
        </View>
      )}
    />
  );
};

const AddUser = () => {
  const { dispatch } = useContext(UserContext);
  const [name, setName] = useState("");

  const addUser = () => {
    if (name.trim() === "") return;
    dispatch({ type: "ADD_USER", payload: { id: Date.now(), name } });
    setName("");
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter name" />
      <Button title="Add User" onPress={addUser} />
    </View>
  );
};

const App = () => {
  return (
    <UserProvider>
      <View style={styles.container}>
        <Text style={styles.header}>Crud</Text>
        <AddUser />
        <UserList />
      </View>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  inputContainer: { flexDirection: "row", marginBottom: 10 },
  input: { flex: 1, borderWidth: 1, padding: 8, marginRight: 10, borderRadius: 5 },
  itemContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
});

export default App;
