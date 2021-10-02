import React, { useState ,useEffect} from 'react'
import {Text,StyleSheet,View,Dimensions,TouchableOpacity,TextInput,Image} from 'react-native'
import { vw, vh/*, vmin, vmax */} from 'react-native-expo-viewport-units';
import { LinearGradient } from "expo-linear-gradient";
import Swiper from 'react-native-swipe-image';
import Navbar from '../Components/NavBar'
import CommentBar from '../Components/CommentBar';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../Components/Logo';
import AwesomeAlert from 'react-native-awesome-alerts';
import SwiperOfPhoto from '../Components/SwiperOfPhoto';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const screenHeight = Math.round(Dimensions.get('window').height);

export default function ViewPost({navigation,route}) {
  const [isLoading,setIsLoading] = useState(true);
const [commentsArray,setCommentsArray] = useState(null);
const [photoData,setPhotoData] = useState([]);
const [commentText,setCommentText] = useState("");
const [userId,setUserId] = useState(-1);
const [objectOfIt,setObj] = useState(null);
const [alertAdded,setAlertAdded]=useState(false);
const [commentEmptyAlert,setCommentEmptyAlert] = useState(false);
const [isLoadingComment,setisLoadingComment] = useState(false);
const [regular,setRegular] = useState(true);
const [alertVerify,setAlertVerify]=useState(false);
const [commentIdToRemove,setCommentIdToRemove]=useState(null);
const [isAdmin , setIsAdmin] = useState(false);

const goBk =()=>navigation.navigate(route.params.back,{catalog:route.params.catalog});

const postComment =()=>{
  if(commentText === "")
  {
    setCommentEmptyAlert(true)
    return;
  }


  setisLoadingComment(true)
  


      fetch('http://ruppinmobile.tempdomain.co.il/site28/api/Comment/Add',{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({commentId:-1,userId:userId,postId:route.params.post.postId,commentText:commentText,commentDate:Date.now})
  }).then(r=>r.json()).then(data=>{
  if(data === true){ 
    setTimeout(()=>{ fetchTheComments(); setisLoadingComment(false);  setAlertAdded(true);},2500)
  }else{
    setTimeout(()=>{setisLoadingComment(false); setCommentEmptyAlert(true);},2500)
  }
}
  ).catch(err=>console.log(err.message))
}

const setAlertTrue=()=>{setAlertVerify(true)}

const bottom = (e) => {
  alert('Swipe Bottom')
}

const top =(e) => {
  alert('Swipe Top')
}
const fetchTheComments=()=>{
  fetch(`http://ruppinmobile.tempdomain.co.il/site28/api/getComments/${route.params.post.postId}`)
.then(r=>r.json())
.then(data=>{
  setAlertVerify(false);
  setCommentsArray(data)})
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


useEffect(() => {
      fetchTheComments();
      getUserId();

  let x;

  if(route.params.post.photos !== "" && route.params.post.photos !== null){
    x = route.params.post.photos.split(" ,")
  }
  else
   x=[];
  


     switch (x.length) {
       case 0:
        setPhotoData([])
        setRegular(false)
         break;

         case 1:
          setPhotoData([
            { url: x[0], name:"photo1" },
          ])
          setRegular(true)
          break;

          case 2:
            setPhotoData([
              { url: x[0], name:"photo2" },
              { url: x[1], name: "photo2" },
            ])
            setRegular(true)
            break;

            case 3:
              setPhotoData([
                { url: x[0], name:"photo3" },
                { url: x[1], name: "photo3" },
                { url: x[2], name: "photo3" }
              ])
              setRegular(true)
              break;
     
       default:
         break;
     }

     setTimeout(()=>{
      setIsLoading(false)
  },5000)
}, [null])

const deleteComment=()=>{
  console.log(commentIdToRemove)
  fetch(`http://ruppinmobile.tempdomain.co.il/site28/api/RemoveComment/${commentIdToRemove}`).catch(error=>{console.log(error)})
}

    return isLoading?
    (
      <LinearGradient style={{width:"100%",height:"100%"}} colors={['#33F20C','#076175', '#061E79']}> 

         <Animatable.View animation="flipInY">
       <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
      <Logo Type={true} size={100}/>
      </Animatable.View></Animatable.View>
      <Animatable.View animation="pulse" easing="ease-in" iterationCount={3}>
      <Text style={{alignSelf:"center",fontSize:25,color:'white',fontWeight:'bold',position:'absolute',marginTop:vh(30)}}>Loading...</Text>
      </Animatable.View>
      </LinearGradient>
  ) 
    :(
        <LinearGradient style={{width:"100%",height:"100%"}} colors={['#33F20C','#076175', '#061E79']}>
               <Navbar goBK={goBk} type="arrowAndLogo" title="Ask Question"/> 
                       <KeyboardAwareScrollView>
               <Text style={{color:'white',fontSize:20,width:'100%',borderBottomWidth:1,borderBottomColor:'white',paddingLeft:25}}>Question</Text>
               <View key={route.params.post.title+"1"} style={{flexDirection:"row",alignItems:"center"}}><Text style={styles.title}>{route.params.post.title?route.params.post.title:"Unknown Title of Dont Know"}</Text></View>
                <View style={{maxHeight:screenHeight*0.38}}>
                <SwiperOfPhoto
                regular={regular}
          images={photoData}
          swipeBottom={(e) => bottom(e)}
          swipeTop={(e) => top(e)}
          imageHeight={250}
          textSize={25}
          textBold={true}
          textColor={'white'}
          textUnderline={false}
        /> 
        </View>

        <Text style={{color:'white',fontSize:20,width:'100%',borderBottomWidth:1,borderBottomColor:'white',paddingLeft:25}}>Description</Text>
          <View key={route.params.post.title+"2"} style={{flexDirection:"row",alignItems:"center"}}><Text style={styles.description}>{route.params.post.description?route.params.post.description:"Unknown description of Dont Know"}</Text></View>
          <View>

          </View>
          <Text style={{color:'white',fontSize:20,width:'100%',borderBottomWidth:1,borderBottomColor:'white',paddingLeft:25}}>comments</Text>

          {commentsArray !== null && commentsArray.map((e,index)=>{
            const myPost = e.userId === parseInt(userId) || isAdmin
            return <View key={index}><CommentBar commentId={e.commentId} setCommentIdToRemove={(e)=>setCommentIdToRemove(e)} setAlertTrue={()=>setAlertTrue()}  commentId={e.commentId} myPost={myPost} userId={e.userId} index={index} comment={e.commentText} firstName={e.firstName} lastName={e.lastName}/></View>
          })}
          </KeyboardAwareScrollView>
          
          <View  style={styles.commentView}>
          
          <TextInput
          onChangeText={setCommentText}
         style={{width:'70%'}}
         placeholder="comment"
         placeholderTextColor="black"
         
        />


{isLoadingComment?<Image alt="loading" style={{marginTop:10,width:80,height:50,alignSelf:'center'}} source={require('../assets/loadingGif.gif')}/>:
<TouchableOpacity 
          onPress={postComment}
  style={{ borderWidth:1,
    borderColor:'#33F20C',
    width:35,
    height:35,
    alignItems:'center',
    alignSelf:'center',
    backgroundColor:'#fff',
    borderRadius:100,
    margin: 5,
  }}>
<Text style={{fontSize:10,alignSelf:"center",marginTop:'25%'}}>Post</Text>
</TouchableOpacity>
}
        </View>
          

        <AwesomeAlert
          show={commentEmptyAlert}
          showProgress={false}
          showCancelButton={false}
          title="Comment Empty / Failed To Post a comment"
          titleStyle={{fontWeight:'bold'}}
          message="please fill up the comment input"
          closeOnTouchOutside={false}
          confirmText={"OK"}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmButtonColor="#076175"
          onConfirmPressed={() => {
            setCommentEmptyAlert(false);
          }}
        />

<AwesomeAlert
          show={alertVerify}
          showProgress={false}
          showCancelButton={true}
          title="Delete Comment?"
          titleStyle={{fontWeight:'bold'}}
          message="are you sure you want to delete comment?"
          closeOnTouchOutside={false}
          cancelText={"cancel"}
          confirmText={"delete"}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmButtonColor="#076175"
          onConfirmPressed={() => {
            deleteComment();
            fetchTheComments();
            
          }}
          onCancelPressed={()=>{
            setAlertVerify(false);
          }}
        />

<AwesomeAlert
          show={alertAdded}
          showProgress={false}
          showCancelButton={false}
          title="comment "
          titleStyle={{fontWeight:'bold'}}
          message="sucessfully added comment"
          closeOnTouchOutside={false}
          confirmText={"OK"}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmButtonColor="#076175"
          onConfirmPressed={() => {
            setAlertAdded(false);
          }}
        />

          </LinearGradient>
    )
}

const styles = StyleSheet.create({
  commentView:{
    backgroundColor: 'white',
     marginTop:5,
     marginRight:25,
     marginLeft:25,
     marginBottom:0,
        borderRadius: 15,
        padding: 5,
        flexDirection:'row',
    },
    viewStyle:{
 marginTop:5,
  backgroundColor:"#ffffff59",
  width:vw(90),
  height:vh(50),
  borderRadius:15,
  borderColor:'white',
  borderWidth:1,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf:"center",
  marginBottom:5
},
viewPost:{
    color:"navy",
fontSize:20,
},
title:{
  marginTop: 5,
  marginLeft: 25,
  marginRight: 5,
  marginBottom: 5,
  fontSize: 23,
  color:'white',
  fontWeight:'bold'
  },
  description:{
    marginTop: 5,
    marginLeft: 25,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 15,
    color:'white'
  },
  
})
