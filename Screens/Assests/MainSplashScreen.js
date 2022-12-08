import React from "react"; 
import { ActivityIndicator } from "react-native";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    DrawerLayoutAndroid,
    ImageBackground,
    TouchableHighlight,
    Image,
    ScrollView,
  } from "react-native";

  import DeviceInfo from 'react-native-device-info';

export default function SplashScreenX({ navigation, route }) {
   
  
   
    return (<>
    <View
    style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
    }}>
         <Image
        source={require('../assests/logo.png')}
        style={{
            height:160,
            width:160
        }}
         />
        <ActivityIndicator size={75} 
        color={'red'}
        style={{
            marginTop:"20%"
        }}/>
        <View style={{
            position:'absolute',
            bottom:"5%"
        }}>
            <Text style={{
                fontSize:19,
                fontWeight:'600'
            }}>New Bangla Natok v<Text style={{
                fontSize:14
            }}>{DeviceInfo.getVersion()}</Text></Text>
        </View>
    </View>
    </>)
}

const styles = StyleSheet.create({ 
})