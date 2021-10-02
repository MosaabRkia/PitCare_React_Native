import { LinearGradient } from "expo-linear-gradient";
import React, { useState ,useEffect} from 'react'
import { View, Text,Image ,TouchableOpacity} from "react-native";
import Logo from '../Components/Logo'
import * as Animatable from 'react-native-animatable';

function DescriptionPage({ navigation }){
  const GoLogin =()=>navigation.navigate('LoginPage');
    return (
        <LinearGradient style={{width:"100%",height:"100%"}} colors={['#33F20C','#076175', '#061E79']}>
             
             <Animatable.View animation="slideInRight">
          <View style={{alignItems:"center",marginTop:15}}>
            <Logo Type={true} size={65} />
            </View>
 </Animatable.View>
             <Animatable.View animation="slideInDown">
    
            <Text style={{color:"white",fontSize:50,marginLeft:5}}>Welcome</Text>
      

         
            <Text style={{color:"white",fontSize:25,marginLeft:5,marginRight:20}}>Our app is designed to bring pet owners together.
            {'\n'}   {'\n'}
* Ask anything about pets!   {'\n'}
* Ask and give advice!   {'\n'}
* Show us your cute and adorable pets!   {'\n'}
</Text>
</Animatable.View>
<TouchableOpacity 
hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
style={{position:'absolute',right:20,bottom:30,transform:[{rotate:'180deg'}]}}
onPress={GoLogin}>
<Animatable.Image animation="lightSpeedIn" duration={2500} alt="arrow" style={{width:31,height:25}} source={require('../assets/arrow.png')}/> 
 </TouchableOpacity>
</LinearGradient>
    )
}



export default DescriptionPage;

