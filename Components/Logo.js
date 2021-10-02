import React from 'react'
import { View, Text,StyleSheet,Image ,SafeAreaView} from "react-native";
import { vw, vh/*, vmin, vmax */} from 'react-native-expo-viewport-units';

 const Logo = (props) => {
    const styles = StyleSheet.create({
        SmallText:{
          fontSize:props.size*0.15,
          textAlign: 'center',
          height:100,
          fontWeight: 'bold',
          color: 'white',
        },
        ViewCss:{
          width: vw(props.size),
          height: vh(props.size/2),
          alignItems:"center",
         
        },
        photoCss:{
          width: vw(props.size*0.8),
          height: vw(props.size*0.7),
          alignSelf:"center", margin:7
        }
      });

    return (
       props.Type?(
        <View id="View" style={styles.ViewCss}>
        <Image alt="logo" style={styles.photoCss} source={require('../assets/whiteNoBGLogo.png')}/>
        <Text style={styles.SmallText}>All About Caring Pet</Text>
        </View>
       ):(     
        <Image alt="logo" style={styles.photoCss} source={require('../assets/whiteNoBGLogo.png')}/>
       )
    )
}
export default Logo;




