import React,{Component} from 'react'
import Drawer from 'react-native-circle-drawer'
import {Text,Button,Image,TouchableOpacity,SafeAreaView,Animated,View,StatusBar} from 'react-native'
import MainPageAfterLogin from '../Pages/MainPageAfterLogin'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../Components/Logo';
import DrawerMenu from './DrawerMenu';

class CustomDrawerView extends Component {
  constructor(){
    super();
    this.goDog  = this.goDog.bind(this)
    this.goCat  = this.goCat.bind(this)
    this.goOther  = this.goOther.bind(this)
    this.logout  = this.logout.bind(this)
  }
   openDrawer(){
    this.refs.DRAWER.open()
}

goDog=()=>{this.props.navigation.navigate('PostsCatalog',{title:'Dog'}); }
goCat=()=>{this.props.navigation.navigate('PostsCatalog',{title:'Cat'})}
goOther=()=>{this.props.navigation.navigate('PostsCatalog',{title:'Other'})}
logout=()=>{
  AsyncStorage.removeItem('token')
  this.props.navigation.navigate('LoginPage')
}
 renderSideMenu(){
    return(
        <View style={{flex:1,marginTop:StatusBar.currentHeight}}>
            <Text style={{fontSize: 25,fontWeight: 'bold',color: 'white',opacity:0.5,padding:5,width:'80%'}}>Home</Text>
            
            <TouchableOpacity style={{marginTop:25}} onPress={()=>this.goDog()}>
            <Text style={{fontSize: 25,fontWeight: 'bold',borderColor:'white',borderStyle:'solid',color: 'white',borderWidth:0,borderRadius:5,borderBottomWidth:2,padding:5,width:'80%'}}>Dogs</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop:5}} onPress={()=>this.goCat()}>
            <Text style={{fontSize: 25,fontWeight: 'bold',borderColor:'white',borderStyle:'solid',color: 'white',borderWidth:0,borderRadius:5,borderBottomWidth:2,padding:5,width:'80%'}}>Cats</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop:5}} onPress={()=>this.goOther()}>
            <Text style={{fontSize: 25,fontWeight: 'bold',borderColor:'white',borderStyle:'solid',color: 'white',borderWidth:0,borderRadius:5,borderBottomWidth:2,padding:5,width:'80%'}}>Others</Text>
            </TouchableOpacity>


           <TouchableOpacity style={{fontSize: 25,fontWeight: 'bold',borderColor:'white',color: 'white',padding:5,width:'80%',position:'absolute',bottom:0,borderStyle:'solid',borderWidth:0,borderRadius:5,borderTopWidth:2}} onPress={()=>this.logout()}>
            <Text style={{fontSize: 25,fontWeight: 'bold',color:'white'}}>LogOut </Text>
            </TouchableOpacity>
        </View>
    )
}

 renderTopRightView(){
    return(
        <View style={{marginTop:StatusBar.currentHeight}}>
            <Logo size={25}/>
        </View>
    )
}

render(){
    return (<DrawerMenu
        ref="DRAWER"
        sideMenu={this.renderSideMenu()}
        topRightView={this.renderTopRightView()}
    cancelColor='#33F20C'
    primaryColor='#061E79'
    secondaryColor='#33F20C'
    >

      <MainPageAfterLogin goDog={()=>this.goDog} goCat={()=>this.goCat} goOther={()=>this.goOther} onPressOpen={()=>this.openDrawer()}/>
    </DrawerMenu>)

}
}
export default CustomDrawerView
