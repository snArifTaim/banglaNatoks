import React, { useEffect, useRef, useState } from "react";
import {
    StatusBar,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import Slider from "../components/slider";
import Icon from 'react-native-vector-icons/Octicons';
import { Alert } from "react-native";
import { RefreshControl } from "react-native";
import { ActivityIndicator } from "react-native";
import { SharedElement } from 'react-navigation-shared-element';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import VideoSkeleton from "../skeletons/video_section";
import { SafeAreaView } from "react-native";
import CateSection from "../components/Categories";

export default function HomeScreen({ navigation, props }) {

    const [videos, setVideos] = useState([]);

    const [isLoading, setisLoading] = React.useState(true);
    const [isRefresh, setisRefresh] = React.useState(false);

    const  getVideos = () =>{
        setisRefresh(true);
        fetch('https://test.sohag.tech/api/section/home').then(data => data.json()).then(data =>{
            setisLoading(false);
            setisRefresh(false);
            if(data.code == 200){
                // success
                
            setVideos(data.data);

            }else{
                alert('Error');

            }
        }).catch(e => {
            setisLoading(false);
            setisRefresh(false);
            Alert.alert('Error','Connection Error!')
        });

    }
    useEffect(() => {
        getVideos();
        
    
      return () => {
        
      }
    }, []);

    return (
        <>
            <StatusBar hidden />
            <ScrollView
            refreshControl={
                <RefreshControl
                  refreshing={isRefresh}
                  onRefresh={ () =>{
                    getVideos();
                  }}
                />
              }
              >
                <CateSection />
            <Slider />
            <View>
                {/* Body top */}
               

                {/* Product */}
                    {isLoading  && (<>  
                    <VideoSkeleton />
                    </>) }
        
         {!isLoading && (<>
           

        {Object(videos).map(data => { 

                    return (<>
                    
                    <View style={{ marginTop: 20 }} key={data.id}>
                    <Text style={{
                        color: '#547AFF',
                        fontSize: 17,
                        fontWeight: '700',
                        padding: 10,
                        marginLeft: 20
                    }}>{data.section_title}</Text>
                    <View style={{ backgroundColor: '#547AFF', padding: 3, width: '90%', alignSelf: 'center', borderRadius: 10 }} />
                </View>
                <View style={styles.container}>
                {Object(data.videos).map(data =>{
                    return (
                        <View style={styles.product} key={data.videoId}>
                                <TouchableOpacity onPress={() => navigation.navigate('PlayVideos',data )}>
                                    <View style={{ position: 'relative' }}>
                                    <SharedElement id={`item.${data.videoId}.photo`}>
                                    <Image style={styles.images}
                                            source={{
                                                uri: data.imgSrc
                                            }} />
                                            </SharedElement>
        
                                       
                                        <View style={styles.viewsContainer}>
                                            <Icon style={{ color: '#fff', marginRight: 4 }} name={'eye'} size={13} />
                                            <Text style={styles.viewstxt}>{data.views}</Text>
                                        </View>
        
                                        <View style={styles.durationContainer}>
                                            <Icon style={{ color: '#fff', marginRight: 4 }} name={'eye'} size={13} />
                                            <Text style={styles.viewstxt}>{data.duration}</Text>
                                        </View>
        
                                    </View>
                                    <View>
                                    <SharedElement id={`item.${data.videoId}.title`}>
                                        <Text style={styles.productTXT}>{data.title}</Text>
                                        </SharedElement>
                                    </View>
                                </TouchableOpacity>
                            </View>
                             );

                })}
                
                </View>
                    </>
                    );
                })}
                </>)}
              
                     
            </View>
            
            </ScrollView>
        </>

    );
};

const styles = StyleSheet.create({
    Header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#547AFF',
        height: 55,
        paddingHorizontal: 20,
    },
    //================ product
    container: {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginTop: 18,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '100%',
        flexWrap:'wrap'
    },
    product: {
        width: 160,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: 10,
        shadowColor: '#000',
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
        height: 100,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    productTXT: {
        color: '#000',
        padding: 5,
        fontSize: 13,
    },
    viewsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#547AFF',
        padding: 5,
        borderTopRightRadius: 10,
    },
    durationContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#000',
        padding: 5,
        borderTopLeftRadius: 10,
    },
    viewstxt: {
        color: '#fff',
        fontSize: 12,
    },
});