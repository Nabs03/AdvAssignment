import { Alert, Button, TextInput, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const login = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TextInput
          style={{width:300, 
            height:40, 
            borderColor: 'black', 
            borderWidth:1,
            alignSelf:'center', 
            marginTop: 250, 
            padding: 10}}
          placeholder="User here"
        />
        <TextInput
          style={{
            width:300, 
            height:40, 
            borderColor: 'black', 
            borderWidth:1, 
            alignSelf:'center', 
            marginTop:10, 
            padding: 10}}
          placeholder="Pass here"
        />
        <View style={{width: 300, marginTop:10, alignSelf:'center'}}>
        <Button 
          title="Login"
          color="green"
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default login