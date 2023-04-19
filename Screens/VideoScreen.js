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
    BackHandler,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import YoutubePlayer from "react-native-youtube-iframe";
import Orientation from 'react-native-orientation';
import { useEffect } from "react";
import { Linking } from "react-native";
import { Alert } from "react-native";
import { Share } from "react-native";
import { RefreshControl } from "react-native";
import { ImageBackground } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import UserContext from "../auth/context"; 
import RelatedSkeleton from "../skeletons/relatedVideo";
import Video from 'react-native-video';
import IntAdsSrz from "../components/IntAds";
import { BannerAd, BannerAdSize } from "@react-native-admob/admob";

const humanFileSize = (bytes, si = true, dp = 1) => {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return bytes.toFixed(dp) + ' ' + units[u];
}

export default function VideoScreen({ navigation, route }) {
    
  const context = React.useContext(UserContext);
  const {state} = context;
    const { params } = route;
    if (typeof params == 'undefined') {
        navigation.navigate('Home');
        return null;
    } 
    const [statusBar, setstatusBar] = useState(true);
    const [heightPlayer, setheightPlayer] = useState(10);
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [videoSingle, setVideoSingle] = useState([]);
    const [isLoading, setisLoading] = React.useState(true);
    const [isRefresh, setisRefresh] = React.useState(false);
    const [showBottomSheet, setshowBottomSheet] = React.useState(false);
  
    const getReleatedVideos = () => {
        setisRefresh(true);
        fetch('https://test.sohag.tech/api/search?query=bangla+natoks&relatedVideo=' + params.videoId).then(data => data.json()).then(data => {
            
            setisLoading(false);
            setisRefresh(false);

            if (data.code == 200) {
                // success

                setRelatedVideos(data.data);

            } else {
                alert('Error');

            }
        }).catch(e => {
            setisLoading(false);
            setisRefresh(false);
            Alert.alert('Error', 'Connection Error!')
        });
    }
    
  const bottomSheetRef = useRef();

  // variables
  const snapPoints = useMemo(() => ['25%', '50%','70%'], []);
 
  const goHome = () =>{
    setTimeout(() => {
        navigation.navigate('Home');
    }, 100);
  }

    useEffect(() => {
        if(navigation.canGoBack() == false){
            BackHandler.addEventListener("hardwareBackPress", goHome);
        }
        Orientation.getOrientation((err, orientation) => {
            if (orientation === 'PORTRAIT') {
                // do something
                setheightPlayer(200);
            } else {
                // do something else
                setheightPlayer(200);
            }
        });
        Orientation.addOrientationListener((orientation) => {
            if (orientation === 'PORTRAIT') {
                // do something
                setheightPlayer(200);
            } else {
                // do something else
                setheightPlayer(200);
            }
        });
        getReleatedVideos(); 
        if(state.appData.version_mismatch){

            fetch('https://test.sohag.tech/api/video/' + params.videoId).then(data => data.json()).then(data => {
                if (data.statusCode == 0) {
                    // success
                    setVideoSingle(data.videoInfo);
                } else {
                    alert('Error');
                }
            });
        }
        return () => {
            if(navigation.canGoBack() ==false){
                BackHandler.removeEventListener("hardwareBackPress", goHome);
            }
            setRelatedVideos([]);
            setVideoSingle([]);
        }
    }, []);
  
    return (<>
    <IntAdsSrz />
       
                <ImageBackground
                    source={{
                        uri: params.imgSrc,
                        width: Dimensions.get('screen').width
                    }}
                    resizeMode="cover"
                    style={{
                        height: heightPlayer
                    }}
                >
                    {params?.is_video_def ? (<>
                    <Video source={params?.sources_obj}   // Can be a URL or a local file.
                controls={true} 
                   style={{ 
                     width:"100%",
                     height: heightPlayer
            
                   }} />
                   </>) : (<>
                   <YoutubePlayer
                    webViewProps={{
                      renderToHardwareTextureAndroid: true,
                    }}
                    onReady={() => { }}
                    height={heightPlayer}
                    play={true}
                    onFullScreenChange={bool => {
                                              if (bool) {
                                                  // fullscreen
                                                  setstatusBar(true);
                                                  Orientation.lockToLandscape();
                  
                  
                                              } else {
                                                  // normal
                                                  // setstatusBar(false);
                                                  Orientation.lockToPortrait();
                                              }
                                          }}
                                          videoId={params.videoId}
                                      />
                                </>)}
                  
                </ImageBackground>
             
        {isLoading  ? (<><RelatedSkeleton/></>) : (
            <>
            <ScrollView

                refreshControl={
                    <RefreshControl
                        refreshing={isRefresh}
                        onRefresh={() => {
                            getReleatedVideos();
                        }}
                    />
                }
            >
              
                <View style={{
                    position: 'relative'
                }}>
                    <StatusBar hidden={statusBar} backgroundColor="#000" barStyle="dark" animated={true} />
                    <View >


                        <View style={styles.container}>
                        { state?.appData?.ads.is_ads_show && (<>
            <View style={{
                justifyContent:'center',
                alignContent:'center',
                alignItems:'center',
                backgroundColor:'transparent',
                marginTop:10,
            }}>
                <BannerAd
        size={BannerAdSize.BANNER}
        unitId={state?.appData?.ads.banner} 
      />
      </View>
      </>)}

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={styles.viewsContainer}>
                                    <Icon style={{ color: '#c3c3c3', marginRight: 4 }} name={'eye'} size={20} />
                                    <Text style={styles.viewstxt}>{params.views}</Text>
                                </View>
                                {/* <View style={{ backgroundColor: '#c3c3c3', width: 5, height: 5, borderRadius: 10, marginHorizontal: 10 }} /> */}
                                {/* <Text style={styles.viewstxt}>3 Oct 2022</Text> */}
                            </View>
                            <Text style={styles.title}>{params.title}</Text>

                            <View style={styles.btnContainer}>

                                <TouchableOpacity style={styles.btngrp} onPress={() => {
                                    Share.share({
                                        message: `${params.title}\n https://links.ujjol.com/tb/${params.videoId}`
                                    });
                                }}>
                                    <Icon style={styles.btnicn} name={'share'} size={20} />
                                    <Text style={styles.btntxt}>Share</Text>
                                </TouchableOpacity>
                                {state.appData?.version_mismatch && typeof videoSingle.title !== 'undefined' && (<>
                                
                                    <TouchableOpacity style={styles.btngrp}
                                    onPress={() => { 
                                        setshowBottomSheet(true);
                                        bottomSheetRef.current?.expand();
                                        }} >
                                    <Icon style={styles.btnicn} name={'arrow-down'} size={20} />
                                    <Text style={styles.btntxt}>Download</Text>
                                </TouchableOpacity>
                                </>)}

                            </View>

                            { state?.appData?.ads.is_ads_show && (<>
            <View style={{
                justifyContent:'center',
                alignContent:'center',
                alignItems:'center',
                backgroundColor:'transparent',
                marginTop:10,
            }}>
                <BannerAd
        size={BannerAdSize.BANNER}
        unitId={state?.appData?.ads.banner} 
      />
      </View>
      </>)}
       </View>
  
                    </View>
                    <View>

                        {Object(relatedVideos).map(data => {
                            if (data.videoId == params.videoId) {
                                return null;
                            }
                            return (<View style={styles.product} key={data.videoId}>
                                <TouchableOpacity onPress={() => {
                                    setRelatedVideos([]);
                                    setVideoSingle([]);
                                    navigation.replace('PlayVideos', data);

                                    }}>
                                    <View style={{ position: 'relative' }}> 
                                        <Image style={styles.images}
                                            source={
                                                { uri: data.imgSrc
                                                }
                                            } />
                                        <View style={styles.viewsContainer}>
                                            <Icon style={{ color: '#656565', marginRight: 4 }} name={'eye'} size={13} />
                                            <Text style={{ color: '#656565' }}>{data.views}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={styles.productTXT}>{data.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>);
                        })}
                    </View>
                </View>
            </ScrollView>
        </>)}

        {typeof videoSingle.title !== 'undefined' && state.appData?.version_mismatch && (<>
            <TouchableOpacity style={[styles.downloadbtn,{
                justifyContent:'center',
                alignContent:'center',
                alignItems:'center'
            }]}  onPress={() => { 
                
                setshowBottomSheet(true);
                bottomSheetRef.current?.expand();
            }}>
                <Icon name={'download'} size={30} color={'#fff'} />
            </TouchableOpacity>
        </>)}
        {typeof videoSingle.title !== 'undefined' && (<>
        <BottomSheet
        ref={bottomSheetRef}
        enableOverDrag={false}
        index={1}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
     style={[{
     }, showBottomSheet ? {} : {
        display:'none'}]} >
        <View style={{
            flex: 1,
            alignItems: 'center',
        }}>
          <BottomSheetScrollView >
          {state?.appData?.ads.is_ads_show && (<>
            <View style={{
                justifyContent:'center',
                alignContent:'center',
                alignItems:'center',
                backgroundColor:'transparent',
                marginTop:10,
            }}>
                <BannerAd
        size={BannerAdSize.BANNER}
        unitId={state?.appData?.ads.banner} 
      />
      </View>
      </>)}

          {typeof videoSingle.downloadInfoList !== 'undefined' && Object(videoSingle.downloadInfoList).map((data, nindex) => {
 

return (
    <TouchableOpacity style={{ width: "100%" }} key={nindex} onPress={() => {
        Alert.alert(
            'Download Through Browser?',
            'For download, our app will use your browser! \nreally want to continue?',

            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel"
                },
                { text: "Download", onPress: () => Linking.openURL(data.partList[0].urlList[0]) }
            ]

        )
    }}  >
        <View style={{
            backgroundColor: '#fff',
            margin: 2,
            padding: 10,
            borderRadius: 10,
            width: Dimensions.get('window').width * 0.85,
            borderWidth: 1,
            borderColor: "#ddd",
            justifyContent: 'center',
            alignContent: "center",
            alignItems: "center",
            flexDirection: 'row'
        }}>
            <Icon2 name="file-download" size={20} style={{ color: "#626262" }} />
            <Text style={{ color: "#626262" ,fontSize:16}} ellipsizeMode="tail" numberOfLines={1}> {(data.formatExt).toUpperCase()} - {(data.formatAlias).toUpperCase()} {humanFileSize(data.size)}</Text>

        </View>
    </TouchableOpacity>);

})}
{state?.appData?.ads.is_ads_show && (<>
            <View style={{
                justifyContent:'center',
                alignContent:'center',
                alignItems:'center',
                backgroundColor:'transparent',
                marginBottom:10,
            }}>
                <BannerAd
        size={BannerAdSize.BANNER}
        unitId={state?.appData?.ads.banner} 
      />
      </View>
      </>)}

          </BottomSheetScrollView >
        </View>
      </BottomSheet></>)}
        

    </>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 240,
    },
    container: {
        backgroundColor: '#000',
        padding: 4,
        paddingBottom: 20,
    },
    viewsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    product: {
        width: '100%',
        backgroundColor: '#e7e7e7',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1.25,
        shadowRadius: 10,
        elevation: 4,

    },
    images: {
        width: '100%',
        height: 200,
    },
    productTXT: {
        width: '90%',
        color: '#000',
        paddingLeft: 8,
        paddingTop: 0,
        paddingBottom: 10,
        fontSize: 17,
    },
    viewstxt: {
        color: '#c3c3c3',
        fontSize: 12,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        padding: 5,
        fontWeight: '600',
    },

    // =====>>>>> BTN Groupe
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 5,
        marginTop: 10,
    },
    btngrp: {
        backgroundColor: '#000',
        flexDirection: 'row',
        paddingHorizontal: 13,
        paddingVertical: 7,
        marginRight: 15,
        borderRadius: 10,
        shadowColor: '#fff',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 4,
    },
    btnicn: {
        color: '#fff',
        marginRight: 4,
    },
    btntxt: {
        color: '#fff',
        fontSize: 15,
    },
    downloadbtn: {
        backgroundColor: '#547AFF',
        position: 'absolute',
        bottom: 10,
        right: 10,
        height:60,
        width:60,
        padding: 5, 
        borderRadius: 100,
        textAlign:'center'
    },
})