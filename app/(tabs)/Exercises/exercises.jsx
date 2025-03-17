
import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const exercises = () => {
    const exercise = [
        {title: 'Exercise 1', desc: '', href:"/3"},    
        {title: 'Exercise 2', desc: '', href:"/login2"}, 
        {title: 'Exercise 3', desc: 'Login Screen', href:"/login"}, 
        {title: 'Exercise 4', desc: 'Stop Watch', href:"/stopWatch"},
        {title: 'Exercise 5', desc: 'Register', href:"/register"},
        {title: 'Exercise 6', desc: 'Crud', href:"/crud"}  
    ]
  return (
    <ScrollView>
        {exercise.map((exercise)=> {
            return (
                <Link href={exercise.href}>
                    <View style={{margin: 5, backgroundColor:"yellow", borderColor:"yellow", borderRadius:15, padding: 20, width:'99.5%'}}>
                        <Text style={{fontSize: 40}}>{exercise.title}</Text>
                        <Text style={{fontSize: 15, paddingLeft: 5}}>{exercise.desc}</Text>
                    </View>
                </Link>
            )
        })}
    </ScrollView>
)
}
export default exercises
