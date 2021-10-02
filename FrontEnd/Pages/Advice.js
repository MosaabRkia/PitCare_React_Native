import React, { useEffect, useState  } from 'react'
import {Text,StyleSheet,Image,ScrollView,TextInput,TouchableOpacity,View} from 'react-native'
import Navbar from '../Components/NavBar'
import { vw, vh/*, vmin, vmax */} from 'react-native-expo-viewport-units';
import { LinearGradient } from "expo-linear-gradient";
import BarAskAdvicePost from '../Components/BarAskAdvicePost';
import Logo from '../Components/Logo';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/FontAwesome5';


export default function Advice({ navigation ,route}) {
    const [isLoading,setIsLoading] = useState(true);
    const [search1,setSearch]=useState(null)
    const [data,setData] = useState([]);
    const [userId,setUserId] = useState(-1);
    const goBk =()=>navigation.navigate('PostsCatalog');
    const addAdvice =()=>{navigation.navigate('AddAdvice',{catalog:route.params.catalog,fetchInBack});}
    const fetchInBack=()=>{fetchTheList(); setIsLoading(true)}
    const [alertVerify,setAlertVerify]=useState(false);
    const [postIdToRemove,setPostIdToRemove]=useState(-1);
    const setAlertTrue=()=>{setAlertVerify(true)}
    const [failed,setFailed]=useState(false)
    const [isLoadingSmall,setIsLoadingSmall] = useState(false);
    const [isLoadingFetch,setIsLoadingFetch] = useState(true);
    const [isAdmin , setIsAdmin] = useState(false);

    const fetchTheList =async()=>{
      setIsLoadingFetch(true)
      await fetch(`http://ruppinmobile.tempdomain.co.il/site28/api/getPosts/${route.params.catalog}/Advice`).then(r=>r.json()).then(data=>{  
        setData(data) 
        setIsLoading(false)  
        setIsLoadingFetch(false)
       }).catch(err=>{
         setFailed(true)
        console.log(err.message)
     })
    }

    const search = ()=>{
      setIsLoadingFetch(true)
       fetch(`http://ruppinmobile.tempdomain.co.il/site28/api/getPosts/${route.params.catalog}/Advice`).then(r=>r.json()).then(data=>{  
        let arr = []
      if(search !== null && search.toString().trim())
      data.length > 0 && data.forEach(post => {
      if (post.title.toLowerCase().includes(search1.toLowerCase())) {
        arr.push(post);
      }
    })
    console.log(arr)
         setData(arr);

        setIsLoading(false)  
        setIsLoadingFetch(false)
       }).catch(err=>{
         setFailed(true)
        console.log(err.message)
     })
      }
   

    const deletePost=()=>{
        fetch(`http://ruppinmobile.tempdomain.co.il/site28/api/RemovePost/${postIdToRemove}`)
        .then(()=>{fetchTheList()})
        .then(()=>{
          setTimeout(()=>{
            setIsLoadingSmall(false)
            setAlertVerify(false)
          },2000)
        }).catch(error=>{console.log(error)})
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
      
    useEffect( ()=>{  
        getUserId();
        fetchTheList();
        },[])
    return(
isLoading? (
        <LinearGradient style={{width:"100%",height:"100%"}} colors={['#33F20C','#076175', '#061E79']}> 

           <Animatable.View animation="flipInY">
         <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
        <Logo Type={true} size={100}/>
        </Animatable.View></Animatable.View>
        <Animatable.View animation="pulse" easing="ease-in" iterationCount={3}>
        <Text style={{alignSelf:"center",fontSize:25,color:'white',fontWeight:'bold',position:'absolute',marginTop:vh(30)}}>Loading...</Text>
        </Animatable.View>
        </LinearGradient>
    ) : (
        <LinearGradient style={{width:"100%",height:"100%"}} colors={['#33F20C','#076175', '#061E79']}>
          <Navbar goBK={goBk} type="arrowWithTitle" title="Advice"/> 
          {/* <SearchFutue /> */}
          <View> 
         <View>
         <TextInput
         onChangeText={setSearch}
         style={styles.inputStyleSearch}
         placeholder="Search"
         placeholderTextColor="#FFFFFF86"
        />
               <Icon
            style={{position:'absolute',bottom:5,right:75}}
            hitSlop={{ top: 100, bottom: 100, left: 100, right: 100 }}
              name="backspace"
              size={20}
              color="white"
               onPress={()=>{fetchTheList(); }}
            />  
        </View>
        <TouchableOpacity style={{position:'absolute',right:'8%',bottom:'5%',width:25,height:25}}  onPress={search}>
         <Icon
            //style={{position:'absolute',bottom:5,right:25}}
            hitSlop={{ top: 100, bottom: 100, left: 100, right: 100 }}
              name="search"
              size={25}
              color="white"   
            />  
</TouchableOpacity>
          </View>
          <ScrollView style={{width:vw(97),alignSelf:"center",marginTop:10,borderWidth:1,borderColor:'white',borderRadius:10,maxHeight:577,paddingBottom:5}}> 
          {isLoadingFetch?
          <Image alt="loading" style={{marginTop:10,width:180,height:150,alignSelf:'center'}} source={require('../assets/loadingGif.gif')}/>
          :
          data && data.map((e,index)=>{
            const checkIfMyPost = e.userId=== parseInt(userId) || isAdmin
            const ViewPage =()=>navigation.navigate('ViewPost',{post:e,back:"Advice",catalog:route.params.catalog});
            return <View key={e.title+index}>
              <BarAskAdvicePost 
            postId={e.postId} 
            setAlertTrue={setAlertTrue} 
            setPostIdToRemove={setPostIdToRemove} 
            myPost={checkIfMyPost} ViewPage={ViewPage} 
            id={e.id} 
            post={e} 
            title={e.title}/>
            </View>
        }) 
          }
          
          
          </ScrollView> 
          <Text style={{color:'white',fontSize:30,alignSelf:'center',fontWeight:"bold"}}>Add an Advice</Text>  
          <TouchableOpacity 
          onPress={addAdvice}
  style={{ borderWidth:1,
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

<AwesomeAlert
          show={alertVerify}
          showProgress={false}
          showCancelButton={isLoadingSmall?false:true}
          title={isLoadingSmall?"Deleting Post":"Delete Post?"}
          titleStyle={{fontWeight:'bold'}}
          message={ isLoadingSmall?"Deleting":"are you sure you want to delete post?"
            // isLoadingSmall?<Image alt="loading" 
          // style={{padding:10,width:30,height:30,alignSelf:'center'}} source={require('../assets/loadingGif.gif')}/>:<Text>are you sure you want to delete post?</Text>
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

          </LinearGradient>
    )
    )
}
    
const styles = StyleSheet.create({
Title:{
    fontSize:32,
    color:'white',
    alignSelf:"center",
    marginTop:35,
    fontWeight:'bold',
    marginLeft:20,
    marginRight:20,
    marginBottom:15
},
buttonCircle:{
backgroundColor:'white'
},
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
