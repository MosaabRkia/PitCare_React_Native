import React, { useState,useRef,useEffect } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { View, Text ,Button ,StyleSheet ,Image, Platform,TouchableOpacity} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Logo from '../Components/Logo'
import NavBar from '../Components/NavBar';
import ButtonWhiteTrans from '../Components/ButtonWhiteTrans';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeAlert from 'react-native-awesome-alerts';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Hoshi } from 'react-native-textinput-effects';
import DateTimePickerModal from "react-native-modal-datetime-picker";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Register({ navigation }) {
    const [showAlertErrorRegister,setShowAlertErrorRegister] = useState(false);
    const [showAlertSucessfullyRegister,setShowAlertSucessfullyRegister] = useState(false);
    const [showAlertEmailRegistered,setShowAlertEmailRegistered] = useState(false);
    const [textAlertError,setTextAlertError] = useState("");
    const [isLoadingSmall,setIsLoadingSmall] = useState(false);

    const [hidePass,setHidePass] = useState(true);
    const [firstName,setFirstName]=useState(null);
    const [lastName,setLastName]=useState(null);
    const [day,setDay]=useState(0);
    const [month,setMonth]=useState(0);
    const [year,setYear]=useState(0);
    const [email,setEmail]=useState(null);
    const [password,setPassword]=useState(null);
    const [verifyCode,setVerifyCode]=useState(null);
    const [verifyCodeType,setVerifyCodeType]=useState(null);
    const [showRegisterButton,setShowRegisterButton] = useState(true);
    const [isLoading,setIsLoading] = useState(false);


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [birthdate, setBirthdate] = useState("yyyy-mm-dd");
    const [dateState,setDate] = useState(null);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      setDate(date);
      setBirthdate(formatDate(date).toString())
      hideDatePicker();
    };


    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-').toString();
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

const RegisterButton = ()=>{
  setIsLoadingSmall(true)


if(verifyCode === null || verifyCodeType === null || parseInt(verifyCodeType) !==  parseInt(verifyCode)){
  setTextAlertError("code wrong");
  setShowAlertErrorRegister(true);
  setIsLoadingSmall(false)
return;
}

//setTextAlertError
if( firstName === null || lastName === null)
{
  setTextAlertError("First Name or Last Name is empty");
  setShowAlertErrorRegister(true);
  setIsLoadingSmall(false)
return;
}

// if( !(day <= 31) || !(month <= 12) || !(year <= 2011 && year >= 1990) || day ==0 || month == 0  || year == 0 )
// {
//   setTextAlertError("Birthdate Empty or more than reality!");
//   setShowAlertErrorRegister(true);
//   setIsLoadingSmall(false)
//   return;
// }

var d = new Date(dateState),
month = '' + (d.getMonth() + 1),
day = '' + d.getDate(),
year = d.getFullYear();

console.log(d)

if(birthdate === null || d.getFullYear() < 1910 || d.getFullYear() >= 2005){
  setTextAlertError("Birthdate Empty or more than reality!");
  setShowAlertErrorRegister(true);
  setIsLoadingSmall(false)
}

if(email === null || !validateEmail(email))
{
  setTextAlertError("Email is Empty or not valid email");
  setShowAlertErrorRegister(true);
  setIsLoadingSmall(false)
  return;
}

if(password === null || password.length < 6)
{
  setTextAlertError("password is Empty or less than 6 Letters");
  setShowAlertErrorRegister(true);
  setIsLoadingSmall(false)
  return;
} 


    fetch('http://ruppinmobile.tempdomain.co.il/site28/api/Register',{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({firstName,lastName,email:email.toLowerCase(),password,birthdate:birthdate,notificationCode:expoPushToken})
    }).then((r)=>r.json()).then(data=>{
      console.log(data)
      // if(data === "notificationCode")
      // {
      //   setTextAlertError("please confirm the notifications access!");
      //   setShowAlertErrorRegister(true);
      // }
if(data === true || data === "notificationCode"){
  fetch("http://ruppinmobile.tempdomain.co.il/site28/api/Send/sucessfully/register",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email:email})
  })
  setTimeout(()=>{
    sendPushNotification(expoPushToken);
  },10000)
  setShowAlertSucessfullyRegister(true);
  setIsLoadingSmall(false)
}
else{
  setShowAlertEmailRegistered(true);
    }}).catch(err=>{
      console.log(err)
      setIsLoadingSmall(false)
    })
}

const verifyEmail =()=>{
  setIsLoading(true)
  if(email === null || !validateEmail)
{
  setTextAlertError("Email is Empty or not valid email");
  setShowAlertErrorRegister(true);
  setIsLoadingSmall(false)
  setIsLoading(false)
  return;
}

  try {
    fetch('http://ruppinmobile.tempdomain.co.il/site28/api/SendCodeVerify/verify/register',{
  method:'POST',
  headers:{"content-type":"application/json"},
  body:JSON.stringify({email:email})
}).then((r)=>r.json()).then(data=>{
  if(data === false){
    setTextAlertError("something wrong with your email / registered before");
    setShowAlertErrorRegister(true);
    setIsLoadingSmall(false)
    setIsLoading(false)
      return;
  }
  setTextAlertError("sent a code to your email");
  console.log(data)
  setShowAlertErrorRegister(true);
  setVerifyCode(data);
  setShowRegisterButton(false)
  setIsLoading(false)
    //navigation.navigate('ForgotPasswordPg2',{data,email});
})
  } catch (error) {
    console.log(error.message)
    setTextAlertError("something wrong with your email");
    setShowAlertErrorRegister(true);
    setIsLoadingSmall(false)
    setIsLoading(false)
      return;
  }
  

}

//notifaction

const [expoPushToken, setExpoPushToken] = useState('');
const [notification, setNotification] = useState(false);
const notificationListener = useRef();
const responseListener = useRef();

useEffect(() => {
    
  registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  // This listener is fired whenever a notification is received while the app is foregrounded
  notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    setNotification(notification);
  });

  // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    console.log(response);
  });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };
  
}, []);

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'PitCare',
    body: 'your login data is ready now , sorry to be late !',
    data: { someData: null },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}




async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}



    return (    
        <LinearGradient style={{width:"100%",height:"100%"}} colors={['#33F20C','#076175', '#061E79']}>
             {/* <Animatable.View animation="fadeInRight"> */}
               <NavBar goBK={()=>navigation.navigate('LoginPage')} type='arrow'/>
              
               <Animatable.View animation="rubberBand">
            <Logo size={60}/>
           </Animatable.View>

            <View style={{marginBottom:"10%"}}/>
            <Text style={{color:"white",fontSize:40,marginLeft:15,marginBottom:35,fontWeight:'bold'}}>Register</Text>
             
            <KeyboardAwareScrollView>
          <View >

          <Hoshi 
          style={{ width:'90%',alignSelf:"center"}}
          label={'First Name'}
          labelStyle={{color:'white',right:16,marginTop:5}}
          inputStyle={{paddingRight:30}}
          labelHeight={24}
          color={"white"}
          maxLength={20}
          onChangeText={setFirstName}
          borderHeight={4}
          borderColor={(firstName !== null && firstName.length >= 3)?'green':'red'}
          animationDuration={700}
          />

           <Hoshi 
           inputStyle={{color:'white',marginTop:10,paddingRight:30}}
           style={{ width:'90%',alignSelf:"center"}}
          label={'Last Name'}
          labelStyle={{color:'white',right:16,marginTop:5}}
          labelHeight={24}
          color={"white"}
          maxLength={20}
          onChangeText={setLastName}
          borderHeight={4}
          borderColor={(lastName !== null && lastName.length >= 3)?'green':'red'}
          animationDuration={700}
          />

<View>
<Hoshi 
           inputStyle={{color:'white',marginTop:10,paddingRight:30}}
          style={{ width:'90%',alignSelf:"center"}}
          label={'Birthdate'}
          labelStyle={{color:'white',right:16,marginTop:5}}
          labelHeight={50}
          color={"white"}
          value={birthdate}
          maxLength={10}
           onChangeText={showDatePicker}
          onPressIn={showDatePicker}
          disabled={true}
          onFocus={showDatePicker}
          borderHeight={4}
          borderColor={(birthdate !== null)?'green':'red'}
          animationDuration={700}
          />


      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>

        <Hoshi 
      style={{ width:'90%',alignSelf:'center'}}
      label={'Email Address'}
      inputStyle={{color:'white',marginTop:10}}
      maxLength={64}
      color={"white"}
      labelHeight={24}
      labelStyle={{color:'white',right:16,marginTop:5}}
      onChangeText={(e)=>{
        setEmail(e);
        setShowRegisterButton(true);
      }}
      borderHeight={4}
      borderColor={validateEmail(email)?'green':'red'}
      animationDuration={700}
      />




 {isLoading?<Image alt="loading" style={{width:60,height:40,marginTop:10,alignSelf:'center'}} source={require('../assets/loadingGif.gif')}/>
 :
          <TouchableOpacity
 onPress={()=>verifyEmail()}
 style={{borderWidth:1,padding:10,marginTop:10,borderRadius:5,borderColor:'white',width:'80%',alignSelf:'center',alignItems:'center'}}>
 <Text style={{color:"white",fontSize:10}}>Send Code</Text>
 </TouchableOpacity>
 }

<Hoshi 
      style={{ width:'90%',alignSelf:'center',marginTop:10}}
      label={'Verify Code (that sent to your email !)'}
      inputStyle={{paddingRight:30}}
      color={"white"}
      labelHeight={24}
      labelStyle={{color:'white',right:16,marginTop:5}}
      maxLength={5}
      onChangeText={setVerifyCodeType}
      borderHeight={4}
      keyboardType={"numeric"}
      borderColor={verifyCodeType && verifyCodeType.length === 5?'green':'red'}
      animationDuration={700}
      />

        <View>
        <Hoshi 
      style={{ width:'90%',alignSelf:'center',marginTop:10}}
      label={'Password'}
      inputStyle={{paddingRight:30}}
      color={"white"}
      labelHeight={24}
      maxLength={20}
      onChangeText={setPassword}
      borderHeight={4}
      labelStyle={{color:'white',right:16,marginTop:5}}
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
      <View style={{marginTop:10,marginBottom:15,alignItems:"center"}}>
        <ButtonWhiteTrans showRegisterButton={showRegisterButton} onPress={RegisterButton} text="Register"/>
        {isLoadingSmall?<Image alt="loading" style={isLoadingSmall?{width:30,height:30,alignSelf:'center'}:{width:0,height:0}} source={require('../assets/loadingGif.gif')}/>:<View/>}
        </View>
         </View >
        </KeyboardAwareScrollView>

       
         {/* end of fix keyboard */}
           {/* </Animatable.View> */}
           {/*alerts*/}

           <AwesomeAlert
          show={showAlertErrorRegister}
          showProgress={false}
          showCancelButton={false}
          title="Register"
          titleStyle={{fontWeight:'bold'}}
          message={textAlertError}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmButtonColor="#076175"
          onConfirmPressed={() => {
            setShowAlertErrorRegister(false);
          }}
        />

         <AwesomeAlert
          show={showAlertSucessfullyRegister}
          showProgress={false}
          showCancelButton={false}
          title="Sucessfully registered !"
          message="note it take a minute to verify your infomation we will notify you ! in less than a minute! thank you.."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmButtonColor="green"
          onConfirmPressed={() => {
            setShowAlertSucessfullyRegister(false);
            navigation.navigate('LoginPage');
          }}
        />

<AwesomeAlert
          show={showAlertEmailRegistered}
          showProgress={false}
          showCancelButton={true}
          title="Register"
          message="Email Registerd before !"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmButtonColor="#DD6B55"
          confirmText="ok"
          onConfirmPressed={() => {
            setShowAlertEmailRegistered(false);
          }}
          cancelText={"Go To Login"}
          onCancelPressed={()=>{
            setShowAlertEmailRegistered(false);
            navigation.navigate('LoginPage');
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
        fontSize:20,
        marginBottom:7,
        color:"white",
        textAlign:"left"
    },
     inputEmailStyle:{
      width:'70%',
      borderBottomColor:"white",
      borderLeftColor:"#00000000",
      borderRightColor:"#00000000",
      borderTopColor:"#00000000",
      textAlign:"center",
      borderWidth:1,
      fontSize:20,
      marginBottom:7,
      marginLeft:10,
      color:"white",
      textAlign:"left"
  },
    inputDate:{
        alignSelf:'center',
        width:'30%',
        borderBottomColor:"white",
        borderLeftColor:"#00000000",
        borderRightColor:"#00000000",
        borderTopColor:"#00000000",
        textAlign:"center",
        borderWidth:1,
        fontSize:20,
        marginBottom:7,
        color:"white"
    }
    })