import { Stack } from "expo-router"
import { Component } from "react"

class UserScreen extends Component{
  static navigationOptions ={
    tittle: "Login",
  }
}
const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        <Stack.Screen name="login" options={{title:'Login', headerTitleAlign: 'center'}}/>
        <Stack.Screen name="stopWatch" options={{title:'Stopwatch', headerTitleAlign: 'center'}}/>
    </Stack>
  )
}

export default RootLayout