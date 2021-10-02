import React from 'react'
import {Text,StyleSheet,View,Image} from 'react-native'
import { vw, vh/*, vmin, vmax */} from 'react-native-expo-viewport-units';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function BarPhotoPost(props) {

  const addLike=()=>{
    if(props.liked === true){
if(props.likeId !== null)
fetch(`http://ruppinmobile.tempdomain.co.il/site28/api/Like/removeLike/${props.likeId}`)
.then((r=>r.json()))
.then(data=>{
  props.fetchTheList();
  props.fetchTheLikes();
}).catch(err=>{
  console.log(err)})

    }else
     if(!props.liked){

    fetch('http://ruppinmobile.tempdomain.co.il/site28/api/Like/addLike',{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({postId:props.post.postId,userId:props.userId})
    }).then((r=>r.json())).then(data=>{
      props.fetchTheList();
      props.fetchTheLikes();
    }).catch(err=>{
      console.log(err)})
    
    }
  }

    return (props.myPost?(
        <View key={props.title+'x'} style={styles.viewStyle}>
           <Image
              key={props.index+'y'}
              value={props.index}
              source={{ uri:`${props.image}` }}
                style={{ width:  250, height:165 ,borderRadius: 10,marginTop:10}}
              /> 
          <View key={props.title+"1"} style={{flexDirection:"row",alignItems:"center"}}><Text style={styles.title}>{props.title?props.title:"Unknown Title of Dont Know"}</Text></View>
          <View key={props.title+"2"} style={{flexDirection:"row",alignItems:"center"}}><Text style={styles.description}>{props.description?props.description:"Unknown description of Dont Know"}</Text></View>
          <Icon
            style={{position:'absolute',top:'45%',right:'5%'}}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
              name="trash"
              size={15}
              color="black"
              onPress={() => {
                props.setPostIdToRemove(props.post.postId);
                props.setAlertTrue();       
              }}
            />  
             <Icon
            style={{position:'absolute',bottom:10,left:20}}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
              name="heart"
              size={15}
              color={props.liked?"red":"black"}
              onPress={() => 
                addLike()
              }
            />  
            <Text style={{position:'absolute',bottom:10}}>likes : {props.likes}</Text>
        </View>
    ):
    (
      <View key={props.title+'x'} style={styles.viewStyle}>
         <Image
            key={props.index+'y'}
            value={props.index}
            source={{ uri:`${props.image}` }}
            style={{ width:  250, height:165 ,borderRadius: 10,marginTop:10}}
            /> 
        <View key={props.title+"1"} style={{flexDirection:"row",alignItems:"center"}}><Text style={styles.title}>{props.title?props.title:"Unknown Title of Dont Know"}</Text></View>
        <View key={props.title+"2"} style={{flexDirection:"row",alignItems:"center"}}><Text style={styles.description}>{props.description?props.description:"Unknown description of Dont Know"}</Text></View>
        <Icon
                      style={{position:'absolute',bottom:10,left:20}}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
              name="heart"
              size={15}
              color={props.liked?"red":"black"}
              onPress={() => addLike()}
            />  
            <Text style={{position:'absolute',bottom:10}}>likes : {props.likes}</Text>
      </View>
  ))
}

const styles = StyleSheet.create({
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
    color:"white",
fontSize:30
,marginTop:10
,fontWeight:"bold"
  },
  description:{
    color:"white",
fontSize:20
,margin:10
,fontWeight:"bold"
  },
  
})
