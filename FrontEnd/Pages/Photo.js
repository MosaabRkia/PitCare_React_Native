import React, { useEffect, useState } from 'react'
import {Text,StyleSheet,Image,ScrollView,TextInput,TouchableOpacity,View} from 'react-native'
import Navbar from '../Components/NavBar'
import { vw, vh/*, vmin, vmax */} from 'react-native-expo-viewport-units';
import { LinearGradient } from "expo-linear-gradient";
import BarPhotoPost from '../Components/BarPhotoPost';
import * as Animatable from 'react-native-animatable';
import AwesomeAlert from 'react-native-awesome-alerts';
import Logo from '../Components/Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Photo({ navigation,route }) {
    const [isLoading,setIsLoading] = useState(true);
    const [userId,setUserId] = useState(-1);
    const [data,setData] = useState(null);
    const goBk =()=>navigation.navigate('PostsCatalog');
    const addPhoto =()=>navigation.navigate('AddPhoto',{catalog:route.params.catalog,fetchInBack});
    const fetchInBack=()=>{fetchTheList(); setIsLoading(true)}
    const [alertVerify,setAlertVerify]=useState(false);
    const [dataLikes,setDataLikes]=useState([]);
    const setAlertTrue=()=>{setAlertVerify(true)}
    const [postIdToRemove,setPostIdToRemove]=useState(-1);
    const [failed,setFailed]=useState(false)
    const [isLoadingSmall,setIsLoadingSmall] = useState(false);
    const [isAdmin , setIsAdmin] = useState(false);


    const deletePost=()=>{
        fetch(`http://ruppinmobile.tempdomain.co.il/site28/api/RemovePost/${postIdToRemove}`).then(()=>{fetchTheList()}).then(()=>{ setAlertVerify(false);}).then(()=>{setTimeout(()=>{setIsLoadingSmall(false)},2000)}).catch(error=>{console.log(error)})
      }

     const fetchTheList = ()=>{
         fetch(`http://ruppinmobile.tempdomain.co.il/site28/api/getPosts/${route.params.catalog}/Photo`).then(r=>r.json())
        .then((data)=>{setData(data)})
        .then(()=>{
          setTimeout(()=>{
            setIsLoading(false)
          },1000)
        })
        .catch(error=>{console.log(error)})
     }

const getLikes =()=>{
  fetch(`http://ruppinmobile.tempdomain.co.il/site28/api/Like/getAllLikes`).then(r=>r.json())
  .then(data=>{
    setDataLikes(data)
  })
}

function checkLiked(postId){
  let check = {liked:false,likedId:null};
   dataLikes.forEach(e=>{
    if(parseInt(e.userId) === parseInt(userId) && parseInt(e.postId) === parseInt(postId))
    check = {liked:true,likedId:e.likeId};
  })
return check;
}

const countLikes =(postId)=>{
  let counter = 0;
  dataLikes.forEach(e=>{
    if(e.postId === postId){
      counter++;
    }
  })
  return counter;
}



const getUserId=async ()=>{
  await AsyncStorage.getItem('token')
  .then(e=>{
    console.log(parseInt(e))
    setUserId(parseInt(e))
    fetch('http://ruppinmobile.tempdomain.co.il/site28/api/user/rank/'+parseInt(e)).then(r=>r.json()).then(data=>{
      console.log(data[0].rankId)
    if(data[0].rankId === 2){
      setIsAdmin(true);
    }
    else{
      setIsAdmin(false);
    }
    })
  })
}

    useEffect(()=>{
      getLikes()
        getUserId()
        fetchTheList()
        },[])

    return (
        isLoading?(
            <LinearGradient style={{width:"100%",height:"100%"}} colors={['#33F20C','#076175', '#061E79']}> 

            <Animatable.View animation="flipInY">
          <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
         <Logo Type={true} size={100}/>
         </Animatable.View></Animatable.View>
         <Animatable.View animation="pulse" easing="ease-in" iterationCount={3}>
         <Text style={{alignSelf:"center",fontSize:25,color:'white',fontWeight:'bold',position:'absolute',marginTop:vh(30)}}>Loading...</Text>
         </Animatable.View>
         </LinearGradient>
            ):
        (<LinearGradient style={{width:"100%",height:"100%"}} colors={['#33F20C','#076175', '#061E79']}>
                     <Navbar goBK={goBk} type="arrowWithTitle" title={route.params.catalog+"s Photos"}/> 
                   
                  

          <ScrollView style={{width:vw(97),alignSelf:"center",marginTop:10,borderWidth:1,borderColor:'white',borderRadius:10,maxHeight:577}}> 
          {data && data.map((e,index)=>{
               let checkIfMyPost = e.userId === parseInt(userId) || isAdmin
               let likedData = checkLiked(e.postId);
               let likes = countLikes(e.postId);
              return <View key={e.title+index+'x'}>
                  <BarPhotoPost 
                  userId={userId}
                  likes={likes}
                  liked={likedData.liked}
                  likeId={likedData.likedId}
                  setAlertTrue={setAlertTrue} 
                  setPostIdToRemove={setPostIdToRemove} 
                  myPost={checkIfMyPost} 
                  description={e.description} 
                  image={e.photos} 
                  index={index+1} 
                  title={e.title}
                  post={e} 
                  fetchTheList={()=>fetchTheList()}
                  fetchTheLikes={()=>getLikes()}
                  /></View>
          })} 
          </ScrollView> 
         
         
         <View> 
             <Text style={{color:'white',fontSize:30,alignSelf:'center',fontWeight:"bold"}}>Share my pet</Text> 
          <TouchableOpacity 
          onPress={addPhoto}
 style={{ borderWidth:1,
    marginTop:10,
    borderColor:'rgba(0,0,0,0.2)',
    width:75,
    height:75,
    alignItems:'center',
    alignSelf:'center',
    backgroundColor:'#fff',
    borderRadius:100,
  }}>
<Text style={{fontSize:50}}>+</Text>
</TouchableOpacity>
</View>

<AwesomeAlert
          show={failed}
          showProgress={false}
          showCancelButton={true}
          title="failed to fetch !"
          titleStyle={{fontWeight:'bold'}}
          closeOnTouchOutside={true}
          cancelText={"cancel"}
          confirmText={"delete"}
          closeOnHardwareBackPress={true}
          showConfirmButton={false}
          confirmButtonColor="#076175"
          onCancelPressed={()=>{
            setFailed(false);
          }}
        />
<AwesomeAlert
          show={alertVerify}
          showProgress={false}
          showCancelButton={isLoadingSmall?false:true}
          title={isLoadingSmall?"Deleting Post":"Delete Post?"}
          titleStyle={{fontWeight:'bold'}}
          message={
            isLoadingSmall?"deleting..":"are you sure you want to delete post?"
        }

          closeOnTouchOutside={false}
          cancelText={"cancel"}
          confirmText={"delete"}
          closeOnHardwareBackPress={false}
          showConfirmButton={isLoadingSmall?false:true}
          confirmButtonColor="#076175"
          onConfirmPressed={() => {
            setIsLoadingSmall(true)
            deletePost();  
          }}
          onCancelPressed={()=>{
            setAlertVerify(false);
          }}
        />

        </LinearGradient>)
        
    )
}

const styles = StyleSheet.create({
    inputStyle:{
        alignSelf:'center',
        position:'relative',
        width:'70%',
        borderBottomColor:"white",
        borderLeftColor:"#00000000",
        borderRightColor:"#00000000",
        borderTopColor:"#00000000",
        textAlign:"center",
        borderWidth:1,
        fontSize:25,
        marginTop:10,
        color:"white"
    }, 
    inputStyleSearch:{
      position:'relative',
      width:'70%',
      borderBottomColor:"white",
      borderLeftColor:"#00000000",
      borderRightColor:"#00000000",
      borderTopColor:"#00000000",
      textAlign:"center",
      borderWidth:1,
      fontSize:25,
      marginTop:10,
      marginLeft:45,
      color:"white"
  }
})
