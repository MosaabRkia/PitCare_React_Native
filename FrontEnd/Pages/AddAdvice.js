import React, { useEffect, useState } from 'react'
import {Text,StyleSheet,Button,Platform,TextInput,TouchableOpacity,View,Image, Alert} from 'react-native'
import Navbar from '../Components/NavBar'
import { vw, vh/*, vmin, vmax */} from 'react-native-expo-viewport-units';
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker'
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonWhiteTrans from '../Components/ButtonWhiteTrans';
import * as FileSystem from 'expo-file-system';

export default function AddAdvice({navigation,route}) {
    const goBk =()=>navigation.navigate('Advice',{catalog:route.params.catalog});
    const goSucess =()=>{
      route.params.fetchInBack()
      navigation.goBack()
    };
    const [title,setTitle] = useState(null);
    const [description,setDescription] = useState(null);
    //const [catalogType,setCatalogType] = useState(route.params.titlel);
    
    const [userId,setUserId] = useState(-1)
    const [isLoadingComment,setisLoadingComment] = useState(false);
    const [photo,setPhoto] = useState([]);
    const [galleryPermission, setGalleryPermission] = useState(false);
    const [showAlert,setShowAlert] = useState(false);
    const [alert3Photos,setAlert3Photos] = useState(false);
    const [customAlert,setCustomAlert] = useState(false);
    const [customAlertText,setCustomAlertText] = useState("");
    const [alertSucessfully,setAlertSucessfully] = useState(false);
    const [showAlertNotSucess,setShowAlertNotSucess] = useState(false);

    // const permisionFunction = async () => {
    //   if(galleryPermission === false &&await  AsyncStorage.getItem('allowMedia').then(e=>e===true) || await AsyncStorage.getItem('allowMedia').then(e=>e===null) )
    //   setShowAlert(true)
    //   else
    //   setGalleryPermission(true)
    // };


useEffect(()=>{

  (async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  })();

  AsyncStorage.getItem('token').then((e)=>{
    setUserId(e)
  });

 
  },[])

const addPost = () =>{
  setisLoadingComment(true)
  if(title === null){
    setCustomAlertText("please fill the title of advice")
    setCustomAlert(true);
    setisLoadingComment(false)
    return;
  }

  if(description === null){
    setCustomAlertText("please descript your advice")
    setCustomAlert(true);
    setisLoadingComment(false)
    return;
  }
  let photos;
  if(photo !== []){
    photos = photo.toString();
  }
  else
    photos = null;



    fetch('http://ruppinmobile.tempdomain.co.il/site28/api/NewPost/Add',{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({          
          postId:-1,
          userId:parseInt(userId),
          title,
          description,
          photos,
          catalogType:route.params.catalog,
          postDate:null,
          typePost:"Advice"
        })
}).then(r=>r.json()).then(data=>{

  if(data === true){
    setAlertSucessfully(true)
    setisLoadingComment(false)
  }
  else if(data === false){
    setCustomAlertText("error !")
    setCustomAlert(true);
    setisLoadingComment(false)
    return;
  }else{
    setShowAlertNotSucess(true);
    setisLoadingComment(false)
    return;
  }
}
  ).catch(err=>{
    setisLoadingComment(false)
    console.log(err.message)})
}

const pick = async () => {

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  let useWebOrMobile;
  if (Platform.OS === 'web') {
    useWebOrMobile =result.uri;
  }else{
    useWebOrMobile = "data:image/jpeg;base64," + await FileSystem.readAsStringAsync(result.uri,{ encoding: 'base64'  });
  }

  if (!result.cancelled) {
    console.log(useWebOrMobile.length)
      if(photo.length>=3)
      {
          setAlert3Photos(true);
          return;
      }
    setPhoto([...photo,useWebOrMobile + " "]);
  }
};



 const removePhoto =(e)=>{
     let newArr = photo.filter(r=>r != e);
     setPhoto(newArr);
 }

    return (
         <LinearGradient style={{width:"100%",height:"100%"}} colors={['#33F20C','#076175', '#061E79']}>
             <Navbar goBK={goBk} type="arrowWithTitle" title="Add Advice"/> 
            <View 
            style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex:1
            }}>
<View style={styles.divStyle}>
 <Text style={styles.title}>Add Advice</Text>
 <TextInput 
        onChangeText={setTitle}
        style={styles.inputStyle}
         autoCompleteType="name"
         placeholder="what is your advice title ?"
         placeholderTextColor="#ffffffb3"
        />
         <TextInput 
        onChangeText={setDescription}
        style={styles.inputStyle}
         autoCompleteType="name"
         placeholder="description adivce clearly"
         placeholderTextColor="#ffffffb3"
        />
         <Text style={styles.titlePhotoAdd}>Add Photos {<Text style={styles.optional}>(optional)</Text>}</Text>

<View style={{  justifyContent: 'space-evenly' ,flexDirection:'row'}}>
<TouchableOpacity onPress={pick}
 style={{
    width:40,
    height:40,
    alignItems:'center',
    alignSelf:'center',
    backgroundColor:'#fff',
    borderRadius:100,
  }}>
<Text style={{fontSize:25,fontWeight:'bold'}}>+</Text>


</TouchableOpacity>
        {photo && (
          photo.map((p,index)=>{
              return <View  key={index}><Image
              key={index}
              value={index}
              source={{ uri: p }}
                style={{ width: 50, height: 50 ,borderRadius: 10}}
              />
              <View style={{position:'absolute',top:18,left:18}}>
                  <Icon
                  hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                    name={'trash-alt'}
                    size={15}
                    color="red"
                    onPress={()=>removePhoto(p)}
                  /> 
                  </View>
       
                 </View>
          })
        )}
 </View>

 {isLoadingComment?<Image alt="loading" style={isLoadingComment?{marginTop:10,width:30,height:30,alignSelf:'center'}:{width:0,height:0}} source={require('../assets/loadingGif.gif')}/>
 :
 <View style={{width:'70%',alignSelf:'center',marginTop:35}}>
 <ButtonWhiteTrans onPress={addPost} text="Submit Advice"/>
 </View> }

   </View>          
     </View>
<AwesomeAlert
          show={showAlertNotSucess}
          showProgress={false}
          showCancelButton={false}
          title="Failed to Post"
          titleStyle={{fontWeight:'bold'}}
          message="the photos you uploaded are too big !"
          closeOnTouchOutside={false}
          cancelText={"Deny"}
          confirmText={"Allow"}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmButtonColor="#076175"
          onConfirmPressed={() => {
            setShowAlertNotSucess(false);
          }}
        />

             <AwesomeAlert
          show={showAlert}
          showProgress={false}
          showCancelButton={true}
          title="access permission for media"
          titleStyle={{fontWeight:'bold'}}
          message="to upload a photo you need permission to use media"
          closeOnTouchOutside={false}
          cancelText={"Deny"}
          confirmText={"Allow"}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmButtonColor="#076175"
          onConfirmPressed={() => {
            setGalleryPermission(true);
            setShowAlert(false);
            AsyncStorage.setItem('allowMedia',true)
          }}
          onCancelPressed={()=>{
            setGalleryPermission(false);
            setShowAlert(false);
            AsyncStorage.setItem('allowMedia',false)
          }}
        />

<AwesomeAlert
          show={customAlert}
          showProgress={false}
          showCancelButton={false}
          title="Post Advice"
          titleStyle={{fontWeight:'bold'}}
          message={customAlertText}
          closeOnTouchOutside={true}
          confirmText={"ok"}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmButtonColor="#076175"
          onConfirmPressed={() => {
            setCustomAlert(false);
          }}
        />

<AwesomeAlert
          show={alertSucessfully}
          showProgress={false}
          showCancelButton={false}
          title="sucessfully added post"
          titleStyle={{fontWeight:'bold'}}
          message="thank you for posting in our application"
          closeOnTouchOutside={false}
          confirmText={"ok"}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmButtonColor="#076175"
          onConfirmPressed={() => {
            setAlertSucessfully(false);
            goSucess();
          }}
        />

<AwesomeAlert
          show={alert3Photos}
          showProgress={false}
          showCancelButton={false}
          title="you have uploaded max photos allowed "
          titleStyle={{fontWeight:'bold'}}
          message="we allow to upload up to 3 photos"
          closeOnTouchOutside={true}
          confirmText={"ok"}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmButtonColor="#076175"
          onConfirmPressed={() => {
            setAlert3Photos(false);
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
        marginBottom:25,
        color:"white",
        textAlign:"left"
    },
    center:{
        justifyContent: 'center',
            alignItems: 'center',
    },
    title:{color:"white",fontWeight:'bold',alignSelf:'center',fontSize:35,marginBottom:25},
    titlePhotoAdd:{color:"white",fontWeight:'bold',alignSelf:'center',fontSize:25,marginBottom:25},
    optional:{color:"white",fontWeight:'bold',alignSelf:'center',fontSize:18,marginBottom:25},
    divStyle:{width:vw(90),height:vh(65),backgroundColor:'#00000038',borderRadius:10, borderWidth:4,borderColor:'white'}
})