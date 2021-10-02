import React from 'react'
import {Text,StyleSheet,View,TouchableOpacity} from 'react-native'
import Navbar from '../Components/NavBar'
import { vw, vh/*, vmin, vmax */} from 'react-native-expo-viewport-units';
import { LinearGradient } from "expo-linear-gradient";

export default function PostsCatalog({ navigation,route }) {
 const goBk =()=>navigation.navigate('MainPageAfterLogin');

    return (
        <LinearGradient style={{width:"100%",height:"100%"}} colors={['#33F20C','#076175', '#061E79']}>
          <Navbar goBK={goBk} type="arrowAndLogo"/>  
          <View style={{flexDirection:"row"}}><Text style={styles.Title}>{route.params.title?route.params.title:"Unknown"}</Text></View>
    
          <TouchableOpacity onPress={()=>navigation.navigate('ASK',{title:'ASK',catalog:route.params.title})}>
          <Text style={styles.smallTitle}>ASK?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('Advice',{title:'Advice',catalog:route.params.title})}>
          <Text style={styles.smallTitle}>ADVICE</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('Photo',{title:'Photo',catalog:route.params.title})}>
          <Text style={styles.smallTitle}>PHOTO</Text>
          </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
Title:{
    fontSize:80,
    color:'white',
    marginTop:20,
    fontWeight:'bold',
    flexShrink: 1 ,
    marginLeft:5,
    marginRight:20,
    marginBottom:15
},smallTitle:{
    fontSize:40,
    color:'white',
    fontWeight:'bold',
    margin:20,
}
})
