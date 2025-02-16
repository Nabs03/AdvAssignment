
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Button} from 'react-native'

const stopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapseTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  let minutes = Math.floor(elapsedTime / (1000 * 60)% 60);
  let seconds = Math.floor(elapsedTime / (1000)% 60);
  let millieSeconds = Math.floor((elapsedTime % 1000) / 10);

  useEffect (() => {

    if(isRunning){
      intervalIdRef.current = setInterval(() => {
        setElapseTime(Date.now() - startTimeRef.current);
      },10)
    }
    return() => {
      clearInterval(intervalIdRef.current);
    }
  },[isRunning]);

  function start(){
   setIsRunning(true);
   startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop(){
    setIsRunning(false);
  }

  function reset(){
    setElapseTime(0);
    setIsRunning(false);
  }

  function formatTimeHours(){
    hours = String(hours).padStart(2, "0");
    return hours;
  }
  function formatTimeMinutes(){
    minutes = String(minutes).padStart(2, "0");
    return minutes;
  }
  function formatTimeSeconds(){
    seconds = String(seconds).padStart(2, "0");
    return seconds;
  }
  function formatTimeMillieSeconds(){
    millieSeconds = String(millieSeconds).padStart(2, "0");
    return millieSeconds;
  }



  return (
    <View style={{marginTop:10, alignSelf: 'center', width:300}}>
        <Text style={{fontSize: 40, alignSelf:'center', marginTop: 300}}>
            {formatTimeMinutes()}:{formatTimeSeconds()}:{formatTimeMillieSeconds()}
        </Text>
        <View style={{marginBottom: 10}}>
        <Button
        onPress={start}
            title='Start'
            color="green"
        />
        </View>
        <Button
        onPress={stop}
            title='Stop'
            color="red"
        />
        <View style={{marginTop: 10}}>
        <Button
        onPress={reset}
            title='reset'
            color="lightblue"
        />
        </View>
    </View>
  )
}

export default stopWatch