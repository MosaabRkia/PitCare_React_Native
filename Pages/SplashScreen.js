import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Text,StyleSheet,Image } from "react-native";
import Logo from '../Components/Logo'
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';


 const SplashScreen = ({ navigation }) => {
   const [effect,setEffect] = useState('flipInY');

   useEffect(()=>{

    setTimeout(()=>{
      setEffect('flipOutX');
     },3250)
     setTimeout(()=>{
      AsyncStorage.getItem('token').then((e)=>{
        if(e != null){
          navigation.navigate('CustomDrawerView')
         }
         else{
          navigation.navigate('DescriptionPage')
         }
      })
     
     },3500)

   },[])


    return (
        <LinearGradient style={styles.background,styles.container} colors={['#33F20C','#076175', '#061E79']}> 

           <Animatable.View animation={effect}>
         <Text style={styles.WelcomeText}>Welcome To</Text>
         <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
        <Logo Type={true} size={100}/>
        </Animatable.View></Animatable.View>
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    WelcomeText:{
      textAlign: 'center',
      fontSize: 35,
      fontWeight: 'bold',
      color: 'white',
      // fontFamily:'AmericanTypewriter-Light',
    }
  });
export default SplashScreen;