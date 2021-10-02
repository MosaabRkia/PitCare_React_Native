import React from 'react'
import { Text ,StyleSheet,View,TouchableOpacity} from "react-native";
import { vw, vh/*, vmin, vmax */} from 'react-native-expo-viewport-units';

const ButtonWhiteTrans = (props) => {
    const styles = StyleSheet.create({
        TouchStyle:{
            borderWidth:2,
            borderColor:'white',
            alignItems:'center',
            justifyContent:'center',
            padding:5,
            backgroundColor:props.showRegisterButton?'gray':'#00000000',
            color:'#fff',
            fontWeight:'bold',
            borderRadius:5
          }
    })
    return (
 <TouchableOpacity
 disabled={props.showRegisterButton}
 onPress={props.onPress}
 style={styles.TouchStyle}>
 <Text style={{color:"white",fontSize:20}}>{props.text}</Text>
 </TouchableOpacity>

    )
    
}



export default ButtonWhiteTrans;
