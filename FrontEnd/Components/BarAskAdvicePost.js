import React from 'react'
import {Text,StyleSheet,View,TouchableOpacity} from 'react-native'
import { vw, vh/*, vmin, vmax */} from 'react-native-expo-viewport-units';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function BarAskAdvicePost(props) {

// const ViewPage =()=>{
//   navigation.navigate('ViewPost',{post:props.post});
// }


    return (
      props.myPost?( <View key={props.post.title} style={styles.viewStyle}>
        <View key={props.post.title+"1"} style={{flexDirection:"row",alignItems:"center"}}><Text style={styles.title}>{props.post.title?props.post.title:"Unknown Title of Dont Know"}</Text></View>
        <TouchableOpacity onPress={props.ViewPage} key={props.post.title+"2"} style={{flexDirection:"row",alignItems:"center"}}><Text style={styles.viewPost}>{props.post.title?"View Post...":"Unknown View post.."}</Text></TouchableOpacity>
        <Icon
            style={{position:'absolute',top:'45%',right:'5%'}}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
              name="trash"
              size={15}
              color="black"
              onPress={() => {
                console.log(props.postId)
                props.setPostIdToRemove(props.post.postId);
                props.setAlertTrue();       
              }}
            />  
      </View>)
      :
      ( <View key={props.post.title} style={styles.viewStyle}>
        <View key={props.post.title+"1"} style={{flexDirection:"row",alignItems:"center"}}><Text style={styles.title}>{props.post.title?props.post.title:"Unknown Title of Dont Know"}</Text></View>
        <TouchableOpacity onPress={props.ViewPage} key={props.post.title+"2"} style={{flexDirection:"row",alignItems:"center"}}><Text style={styles.viewPost}>{props.post.title?"View Post...":"Unknown View post.."}</Text></TouchableOpacity>
      </View>)
       
    )
}

const styles = StyleSheet.create({
    viewStyle:{
 marginTop:10,
  backgroundColor:"#ffffff59",
  width:vw(90),
  height:vh(15),
  borderRadius:15,
  borderColor:'white',
  borderWidth:1,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf:"center"
},
viewPost:{
    color:"navy",
fontSize:20,
},
title:{
    color:"white",
fontSize:20
,marginTop:10
,fontWeight:"bold"
  },
  
})
