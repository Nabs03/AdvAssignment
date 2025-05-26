import { Tabs } from "expo-router"


const TabsLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{
            headerTitle: "Home",
            title:"Home",
            headerTitleAlign:'center'
            }}/>
        <Tabs.Screen name="Exercises/exercises" options={{
            title:"Exercises",
            headerTitleAlign:'center'
            }}/>
    </Tabs>
  )
}

export default TabsLayout