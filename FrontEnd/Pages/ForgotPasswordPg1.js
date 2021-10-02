import React, { useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { View,TextInput, Text,StyleSheet,Image } from "react-native";
import ButtonWhiteTrans from '../Components/ButtonWhiteTrans';
import Logo from '../Components/Logo';
import NavBar from '../Components/NavBar';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function ForgotPasswordPg1({ navigation }) {
    const goBk=()=>navigation.navigate('LoginPage');
    const [email,setEmail] = useState("null");
    const [show,setShow] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const sendVerify =()=>{
        setIsLoading(true);

      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!email.match(regexEmail)) {
        setIsLoading(false);
          setShow(true);
        return; 
      } 

        fetch('http://ruppinmobile.tempdomain.co.il/site28/api/SendCodeVerify/verify',{
            method:'POST',
            headers:{"content-type":"application/json"},
            body:JSON.stringify({email})
        }).then((r)=>r.json()).then(data=>{
          console.log(data)
            if(data === false){
                setIsLoading(false);
                setShow(true);
                return;
            }
            navigation.navigate('ForgotPasswordPg2',{data,email});
        })
    }
    return (
        <LinearGradient style={{width:"100%",height:"100%"}} colors={['#33F20C','#076175', '#061E79']}>
         <NavBar goBK={goBk} type='arrow'/>

         <Animatable.View animation="bounceIn" duration={2500}>
        <View style={{alignItems:"center",marginBottom:25,marginTop:25}}>
        <Logo Type={false} size={60}/> 
        </View>
        </Animatable.View>

<KeyboardAwareScrollView>
        <Animatable.View animation="fadeInLeft" duration={2500}>     
        <Text style={{color:"white",fontSize:35,marginLeft:15,alignSelf:"center"}}>forgot password?</Text>
        </Animatable.View>
   
        <Animatable.View animation="fadeInRight" duration={2500}>
        <Text style={{color:"white",fontSize:35,marginLeft:15,marginBottom:35,alignSelf:"center"}}>Reset Your Password </Text>
        </Animatable.View>

        <Animatable.View animation="fadeInLeft" duration={2500}>
        <Text style={{color:"white",fontSize:20,marginLeft:"5%"}}>Email Address</Text>
        <TextInput
         style={styles.inputStyle}
         keyboardType="email-address"
         autoCompleteType="email"
         onChangeText={setEmail}
        />
        </Animatable.View>

        <Animatable.View animation="fadeInRight" duration={2500}>
         <View style={{alignSelf:"center",marginTop:"5%"}}>
            <ButtonWhiteTrans onPress={sendVerify} text="Send Me Verify Code"/>
             {isLoading?<Image alt="loading" style={{width:30,height:30,marginTop:10,alignSelf:'center'}} source={require('../assets/loadingGif.gif')}/>:<View/>}
             </View>
        </Animatable.View>
        </KeyboardAwareScrollView>
         <AwesomeAlert
          show={show}
          showProgress={false}
          showCancelButton={false}
          title="Reset Password"
          titleStyle={{fontWeight:'bold'}}
          message="type correct email or valid"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmButtonColor="#076175"
          onConfirmPressed={() => {
            setShow(false);
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
        textAlign:"center",
        borderWidth:1,
        fontSize:25,
        marginBottom:10,
        color:"white"
    }
    })