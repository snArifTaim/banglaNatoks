import React, { useState, useMemo, useRef } from "react";

import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Modal,
} from "react-native"; 
import { useEffect } from "react"; 
import UserContext from "../auth/context";  
import SplashScreen from "./SplashScreen";

 

export default function VideoScreen2({ navigation, route }) {
    
  const context = React.useContext(UserContext);
  const {drawer,state,dispatch} = context;
    const { params } = route;
    if (typeof params == 'undefined') {
        navigation.navigate('Home');
        return null;
    } 
  
    const getVideoData = () => {
        fetch('https://test.sohag.tech/api/video/' + params.videoId).then(data => data.json()).then(data => {
                if (data.statusCode == 0) {
                    // success
                    let n ={videoId: params.videoId , imgSrc: data.videoInfo.thumbnail, views: data.videoInfo.viewCount , title:data.videoInfo.title,  ...data.videoInfo };
                navigation.replace('PlayVideos', n);
                
                } else {

                }
            });

    }
     
 

    useEffect(() => {  
        getVideoData();
        return () => { 
        }
    }, []);
  
    return (<>
    <SplashScreen/>
    </>);

}
