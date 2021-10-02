import React, { useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { View,TextInput, Text,StyleSheet,Image } from "react-native";
import ButtonWhiteTrans from '../Components/ButtonWhiteTrans';
import Logo from '../Components/Logo';
import AwesomeAlert from 'react-native-awesome-alerts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function ForgotPasswordPg2({navigation , route}) {
const [writtenCode,setWrittenCode]=useState(null);
const [showError,setShowError] = useState(false);
const [showAlert,setShowAlert] = useState(false);
const [showAlert1,setShowAlert1] = useState(false);
const [textAlert,setTextAlert] = useState("");
const [textAlert1,setTextAlert1] = useState("");  
const [isLoading,setIsLoading] = useState(false);

const checkCode =()=>{
  setIsLoading(true);
        let email =""; 

    if(!route.params.email){
      setIsLoading(false);
      setShowError(true);
    }
     

if(writtenCode === null)
{
    setTextAlert1("please fill the code! its Empty");
    setShowAlert1(true);
    setIsLoading(false);
    return;
}
    if(route.params.data && parseInt(writtenCode) === parseInt(route.params.data))
    {
        email = route.params.email;
        fetch('http://ruppinmobile.tempdomain.co.il/site28/api/GetPw/verify',{
            method: 'POST',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({email})
        }).then(r=>r.json()).then(data=>{
        if(data !== "error")
        {
        setTextAlert("Sucessfully reseting your password ! , your password has been sent to your email")
        setShowAlert(true);
        setIsLoading(false);
    }
    else{
        if(data==="error"){
          setIsLoading(false);
          setShowError(true);
        }
       
    }
  }).catch(err=>{console.log('error => ', err.message )})
    }else{
        setTextAlert1("INCorrect Verify Code try Again")
        setShowAlert1(true);
        setIsLoading(false);
        }
    }

    return (
        <LinearGradient style={{width:"100%",height:"100%"}} colors={['#33F20C','#076175', '#061E79']}>
        <View style={{alignItems:"center",marginBottom:25,marginTop:25}}>
        <Logo Type={false} size={60}/> 
        </View>        
        <KeyboardAwareScrollView>
        <Text style={{color:"white",fontSize:25,marginLeft:15,alignSelf:"center",marginBottom:35}}>Please Enter Verify Code{'\n'}
 We Sent To Your Email</Text>
        <Text style={{color:"white",fontSize:20,alignSelf:"center"}}>Verify Code</Text>
        <TextInput
        onChangeText={setWrittenCode}
         style={styles.inputStyle}
         keyboardType="numeric"
        />
         <View style={{alignSelf:"center",marginTop:"5%"}}><ButtonWhiteTrans onPress={checkCode} text="Confirm"/></View>
         {isLoading?<Image alt="loading" style={{width:30,height:30,marginTop:10,alignSelf:'center'}} source={require('../assets/loadingGif.gif')}/>:<View/>}
         </KeyboardAwareScrollView>
{/* show alert with textAlert  */}
         <AwesomeAlert
          show={showError}
          showProgress={false}
          showCancelButton={false}
          title="Reset Password"
          titleStyle={{fontWeight:'bold'}}
          message={"Sorry Its Wrong Try Again !"}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmButtonColor="#076175"
          onConfirmPressed={() => {
            setShowError(false);
          }}
        />
        {/* show alert with textAlert  */}
         <AwesomeAlert
          show={showAlert}
          showProgress={false}
          showCancelButton={false}
          title="Reset Password"
          titleStyle={{fontWeight:'bold'}}
          message={textAlert}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmButtonColor="#076175"
          onConfirmPressed={() => {
            setShowAlert(false);
            navigation.navigate('LoginPage');
          }}
        />

        {/* show alert with textAlert  */}
        <AwesomeAlert
          show={showAlert1}
          showProgress={false}
          showCancelButton={false}
          title="Reset Password"
          titleStyle={{fontWeight:'bold'}}
          message={textAlert1}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmButtonColor="#076175"
          onConfirmPressed={() => {
            setShowAlert1(false);
          }}
        />
        
        
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    inputStyle:{
        alignSelf:'center',
        width:'30%',
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