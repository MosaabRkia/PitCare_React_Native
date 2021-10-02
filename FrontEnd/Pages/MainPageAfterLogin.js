import React, { useEffect, useState ,useRef} from 'react'
import {Text,StyleSheet,Image,TouchableOpacity,SafeAreaView,Animated,View,StatusBar} from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import home from '../assets/home.png';
import logout from '../assets/logout.png';
import menu from '../assets/menu.png';
import close from '../assets/close.png';
import Logo from '../Components/Logo';


export default function MainPageAfterLogin({navigation,onPressOpen ,goDog,goOther,goCat}) {
  const [token,setToken] = useState();

  const logOut=()=>{
    AsyncStorage.removeItem('token')
    navigation.navigate('LoginPage')
  }

useEffect(() => {
  getToken();
}, [token])

const getToken = async() =>{
 await AsyncStorage.getItem('token').then(e=>{
  if(e !== null){
    setToken(token);
  }
  else{
    navigation.navigate('LoginPage')
  }
  });
  
}


    return (
      <SafeAreaView style={styles.container}>
                  <LinearGradient style={{marginTop:StatusBar.currentHeight,borderRadius:0,width:"100%",height:"100%"}} colors={['#33F20C','#076175', '#061E79']}>
          <TouchableOpacity  onPress={() =>onPressOpen()}>
            <Image source={menu} style={{
              width: 35,
              height: 35,
              tintColor: 'white',
              margin:10
            }
          }/>
          </TouchableOpacity>

          <Image alt="logo" style={{width:40,height:40,position:'absolute',right:0,margin:5}} source={require('../assets/whiteNoBGLogo.png')}/>

          <Text  style={styles.Title}>Choose Catalog Pet :</Text>
          <TouchableOpacity onPress={goDog()}>
                      <Image alt="DogButton" style={{width:250,height:200,margin:10}} source={require('../assets/dogButton.png')}/>
          </TouchableOpacity>
         
          <TouchableOpacity onPress={goCat()}>
          <Image alt="CatButton" style={{width:250,height:115,margin:15,alignSelf:"flex-end"}} source={require('../assets/catButton.png')}/>
          </TouchableOpacity>
         
          <TouchableOpacity onPress={goOther()}>
          <Image alt="OtherButton" style={{width:130,height:100,margin:15}} source={require('../assets/otherButton.png')}/>
          </TouchableOpacity>
          </LinearGradient>


</SafeAreaView>
    )


    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33F20C',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
Title:{
    fontSize:32,
    color:'white',
    alignSelf:"center",
    marginTop:0,
    fontWeight:'bold',
    marginLeft:20,
    marginRight:20,
    marginBottom:15
}
})

/**
 *  <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
 */
