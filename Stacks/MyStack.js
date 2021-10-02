import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Advice from '../Pages/Advice';
import ASK from '../Pages/ASK';
import DescriptionPage from '../Pages/DescriptionPage';
import ForgotPasswordPg1 from '../Pages/ForgotPasswordPg1';
import ForgotPasswordPg2 from '../Pages/ForgotPasswordPg2';
import LoginPage from '../Pages/LoginPage';
import MainPageAfterLogin from '../Pages/MainPageAfterLogin';
import PostsCatalog from '../Pages/PostsCatalog';
import Register from '../Pages/Register';
import SplashScreen from '../Pages/SplashScreen';
import AskQuestion from '../Pages/AskQuestion';
import AddAdvice from '../Pages/AddAdvice';
import Photo from '../Pages/Photo';
import AddPhoto from '../Pages/AddPhoto';
import ViewPost from '../Pages/ViewPost';
import MainPageWithMenu from '../Pages/MainPageWithMenu';
import CustomDrawerView from '../Drawer/CustomDrawerView'
const Stack = createStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="SplashScreen" component={SplashScreen}/>
            <Stack.Screen name="Advice" component={Advice}/>
            <Stack.Screen name="ASK" component={ASK}/>
            <Stack.Screen name="DescriptionPage" component={DescriptionPage}/>
            <Stack.Screen name="ForgotPasswordPg1" component={ForgotPasswordPg1}/>          
            <Stack.Screen name="ForgotPasswordPg2" component={ForgotPasswordPg2}/>
            <Stack.Screen name="LoginPage" component={LoginPage}/>
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="MainPageAfterLogin" component={CustomDrawerView}/>
            <Stack.Screen name="PostsCatalog" component={PostsCatalog}/>
            <Stack.Screen name="AskQuestion" component={AskQuestion}/>
            <Stack.Screen name="AddAdvice" component={AddAdvice}/>
            <Stack.Screen name="Photo" component={Photo}/>
            <Stack.Screen name="AddPhoto" component={AddPhoto}/>
            <Stack.Screen name="ViewPost" component={ViewPost}/>
            <Stack.Screen name="CustomDrawerView" component={CustomDrawerView}/>
        </Stack.Navigator>
    )
}

const AboutStack =()=>{
    return(
        <Stack.Navigator>
        <Stack.Screen name="Tasks" component={SeeTasks}/>
        <Stack.Screen name="AddTask" component={AddTask}/>
        </Stack.Navigator>
    )
}

export {MyStack,AboutStack}


