import React from 'react'
import { View, Text ,Image , StyleSheet,StatusBar,TouchableOpacity} from "react-native";
import { vw, vh/*, vmin, vmax */} from 'react-native-expo-viewport-units';
import Logo from '../Components/Logo'
// import { NavigationActions } from 'react-navigation';

export default function NavBar({onPressList,type,title,navigation,goBK}) {
    if(type==='arrowAndLogo')
    return (
        <View style={styles.viewCss}>
        <TouchableOpacity onPress={goBK}><Image alt="arrow" style={{width:31,height:25,margin:15}} source={require('../assets/arrow.png')}/></TouchableOpacity> 
         <Logo Type={false} size={20}/>
        </View>)

   else if(type==='arrow')
           return (
         <View  style={styles.viewCss}>
         <TouchableOpacity onPress={goBK} ><Image alt="arrow" style={{width:31,height:25,margin:10}} source={require('../assets/arrow.png')}/></TouchableOpacity> 
         </View>)

else if(type==='arrowWithTitle')
           return (
            <View style={styles.viewCss}>
        <TouchableOpacity onPress={goBK} ><Image alt="arrow" style={{width:31,height:25,margin:15}} source={require('../assets/arrow.png')}/></TouchableOpacity > 
        <Text numberOfLines={1} style={styles.title}>{title?title:"Unknown"}</Text>
         <Logo Type={false} size={20}/>
        </View>)

   else if(type==='listAndLogo')
     return (
    <View style={styles.viewCss}>
    <TouchableOpacity onPress={()=>onPressList()}><Image alt="listLines" style={{width:31,height:25,margin:10}} source={require('../assets/listLines.png')}/></TouchableOpacity> 
      <Logo Type={false} size={20}/>
    </View>
) 
 else if(type==='LogoMain')
return (
<View style={styles.viewCss,{flexDirection: 'row-reverse'}}>
 <Logo Type={false} size={20}/>
</View>
)
}
const styles = StyleSheet.create({
    viewCss:{
      marginTop:StatusBar.currentHeight,
        width:"100%",
        height:"7%",
        flexDirection:"row",
        justifyContent:"space-between"
      },
      title:{
        fontSize:50,color:'white',fontSize:vw(10)
        }
})
