import React,{ useState, useEffect, useRef } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { View,TextInput, Text,StyleSheet,TouchableOpacity ,Image, Button, Platform} from "react-native";
import ButtonWhiteTrans from '../Components/ButtonWhiteTrans';
import Logo from '../Components/Logo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Hoshi } from 'react-native-textinput-effects';


function LoginPage({ navigation }) {

    const [hidePass,setHidePass] = useState(true);
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [textAlert,setTextAlert] = useState("");
    const [alertFalseLogin,setAlertFalseLogin] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [isEmptyEmail,setIsEmptyEmail] = useState(true);
    const GoToRegister=()=>navigation.navigate('Register');
    const GoToForgotPassword=()=>navigation.navigate('ForgotPasswordPg1');


        


const login =()=>{
  setIsLoading(true);
    
    if(password == null || email == null){
      setIsLoading(false);
        setTextAlert("Email or Password is Empty !");
        setAlertFalseLogin(true);
        setIsLoading(false);
        return;
    }

        fetch('http://ruppinmobile.tempdomain.co.il/site28/api/Login',{
            method:'POST',
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({email:email.toLowerCase(),password,id:-1})
          }).then((r)=>r.json()).then(async data=>{
            console.log(data)
              if(data !== 0 && data !== NaN){
                try {
                  await AsyncStorage.setItem('token', data.toString())
                  setTimeout(()=>{
                    setIsLoading(false);
                    navigation.navigate('MainPageAfterLogin')
                  },2500)
                } catch (e) {
                  console.log(e)
                  setIsLoading(false);
                  setAlertFalseLogin(true);
                }
              }
              else{
                setIsLoading(false);
                setTextAlert("Email or Password is Wrong !");
                setAlertFalseLogin(true);
              }

          if(data === false ){
            setTimeout(()=>{
              setIsLoading(false);
              setTextAlert("Email or Password is Wrong !");
            setAlertFalseLogin(true);
            },2500) 
          }
          }).catch(err=>{
            setIsLoading(false);
            console.log(err)})
    
}
const x = ()=>{
  if(email === null || email.trim() === "")
      setIsEmptyEmail(false)
  else
  setIsEmptyEmail(true)

   console.log(isEmptyEmail)
  }

  function validateEmail(emailAdress)
  {
    if(emailAdress === null)
    return false;

    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
      return true; 
    } else {
      return false; 
    }
  }

    return (
        <LinearGradient style={{width:"100%",height:"100%"}} colors={['#33F20C','#076175', '#061E79']}>    
        <View style={{alignItems:"center",marginBottom:25,marginTop:25}}>
        <Animatable.View animation="bounceInRight" duration={2000}>
        <Logo Type={false} size={60}/> 
        </Animatable.View>
        </View>
        <KeyboardAwareScrollView>
              <Animatable.View animation="fadeInRight">
        <Text style={{color:"white",fontSize:40,marginLeft:15,marginBottom:35,fontWeight:'bold'}}>Login</Text>


        <Hoshi 
      style={{ width:'90%',alignSelf:'center' }}
      label={'Email Address'}
      inputStyle={{paddingRight:30}}
      maxLength={64}
      color={"white"}
      labelHeight={24}
      labelStyle={{color:'white',right:16}}
      onChangeText={setEmail}
      borderHeight={4}
      borderColor={validateEmail(email)?'green':'red'}
      animationDuration={700}
      />

<View>
        <Hoshi 
      style={{ width:'90%',alignSelf:'center',marginTop:10}}
      label={'Password'}
      labelHeight={24}
      maxLength={20}
      color={"white"}
      inputStyle={{paddingRight:30}}
      onChangeText={setPassword}
      borderHeight={4}
      labelStyle={{color:'white',right:16}}
      borderColor={password && password.length > 5 && password.length <= 20?'green':'red'}
      secureTextEntry={hidePass ? true : false}
      />
        <View style={{position:"absolute",right:30,bottom:5}}>
           <TouchableOpacity style={{width:24,height:24}} onPress={() => setHidePass(!hidePass)}> 
           <Icon
              name={hidePass ? 'eye-slash' : 'eye'}
              size={15}
              color="white"
            />
            </TouchableOpacity>
           
        </View>
        </View>

        <View>
        <TouchableOpacity style={{position:'absolute',right:"5%",top:5}} onPress={GoToForgotPassword}>
          <Text style={{color:"white",fontSize:10}} >Forgot Password?</Text>
        </TouchableOpacity>
        </View>
        <View style={{alignItems:"center",marginTop:80}}>
        {isLoading?<Image alt="loading" style={{width:100,height:80,marginTop:10,alignSelf:'center'}} source={require('../assets/loadingGif.gif')}/>
        :
        <ButtonWhiteTrans onPress={login} text="Login"/>}
        <TouchableOpacity onPress={GoToRegister} style={{color:"white",textDecorationLine:'underline',marginTop:5}}>
        {isLoading?<View/>:<Text style={{color:'white'}}>Register</Text>}
            </TouchableOpacity>
        </View>
        </Animatable.View>
        </KeyboardAwareScrollView>
    

        <AwesomeAlert
          show={alertFalseLogin}
          showProgress={false}
          showCancelButton={false}
          title="Login"
          titleStyle={{fontWeight:'bold'}}
          message={textAlert}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmButtonColor="#076175"
          onConfirmPressed={() => {
            setAlertFalseLogin(false);
          }}
        />

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
inputStyle:{
    alignSelf:'center',
    width:'90%',
    borderBottomColor:"white",
    borderLeftColor:"#00000000",
    borderRightColor:"#00000000",
    borderTopColor:"#00000000",
    textAlign:"left",
    borderWidth:1,
    fontSize:25,
    marginBottom:10,
    color:"white"
}
})

export default LoginPage;
