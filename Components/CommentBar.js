import React, { useState ,useEffect} from 'react'
import {Text,StyleSheet,View,Dimensions,Image} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function CommentBar(props) {
    const [firstName,setFirstName]=useState("unknown");
    const [lastName,setLastName]=useState("unknown");
    const [isLoadingComment,setisLoadingComment] = useState(false);
    
    useEffect(() => {
        fetch(`http://ruppinmobile.tempdomain.co.il/site28/api/getFirstLastName/${props.userId}`)
        .then(r=>r.json())
        .then(data=>{
            if(data[0] !== null)
           {
                setFirstName(data[0].firstName)
                setLastName(data[0].lastName)
           }
           else{
            setFirstName("Unknown")
            setLastName("Unknown")
           }
        })
    },[])


  
    return (
        props.myPost?
        (<View key={props.index} style={styles.commentView}>
            <Text key={props.index+1} style={styles.firstAndLastName}>{firstName} {lastName}</Text>
            <Text key={props.index+2} style={styles.comment}>{props.comment}</Text>
           
            {isLoadingComment?<Image alt="loading" style={{width:80,height:50,marginTop:10,alignSelf:'center'}} source={require('../assets/loadingGif.gif')}/>
            : <Icon
            style={{position:'absolute',top:5,right:10}}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
              name="trash"
              size={15}
              color="black"
              onPress={() => {
                props.setCommentIdToRemove(props.commentId);
                setisLoadingComment(true);  
                setTimeout(()=>{
                    props.setAlertTrue();   
                    setisLoadingComment(false);
                },2500) 
              }}
            />  
            }
        </View>)
        :
       ( <View key={props.index} style={styles.commentView}>
            <Text key={props.index+1} style={styles.firstAndLastName}>{firstName} {lastName}</Text>
            <Text key={props.index+2} style={styles.comment}>{props.comment}</Text>
        </View>)
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
            padding: 5
        },
        firstAndLastName:{
            fontSize: 17,
            fontWeight: 'bold',
            color: "#2ee118",
        },
        comment:{
            color: '#073e78',
            fontWeight: 'bold',
            fontSize: 13,
            marginLeft: 5,
            marginRight:5,
            alignSelf:'center'
        }
})
