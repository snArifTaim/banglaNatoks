import React from "react";
import { Alert } from "react-native";
import { RefreshControl } from "react-native";
import { Dimensions } from "react-native";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  
import { BannerAd ,BannerAdSize} from '@react-native-admob/admob';
import SearchSkeleton from "../skeletons/searchVideos";
import UserContext from "../auth/context";
import IntAdsSrz from "../components/IntAds";
 


export default function CategoryView({ navigation, route }) {
    const { params } = route;
    const {kw, title} = params;   
    const context = React.useContext(UserContext);
    const {drawer,state,dispatch} = context;
    const [isLoading, setisLoading] = React.useState(true);
    const [isRefresh, setisRefresh] = React.useState(false); 

    const [searchResults, setsearchResults] = React.useState([]);


    const getSearchResults = (query = '',refresheher =true, skeleton =  true) => {
        let qq = query == '' ? kw : query;
        if(refresheher) setisRefresh(true);
        if(skeleton)  setisLoading(true); 

        fetch('https://test.sohag.tech/api/search?query=' + encodeURI(qq)).then(data => data.json()).then(data => {
             
            if(skeleton) setisLoading(false);
            if(refresheher) setisRefresh(false);
            if (data.code == 200) {
                // success
                setsearchResults(data.data);
            } else {
                alert('Error');

            }
        }).catch(e => {
            if(skeleton) setisLoading(false);
            if(refresheher) setisRefresh(false);
            Alert.alert('Error', 'Connection Error!')
        });

    }


    React.useEffect(() => {

        navigation.setOptions({
            headerTitle:title,
            headerTitleAlign:'center', 
        });
        return () => {

        }
    }, []);

    React.useEffect(() => {

        getSearchResults(kw);
        return () => {
            setsearchResults([]);
        }
    }, []);

    if (isLoading) {
        return (<>
            <SearchSkeleton />
        </>);

    }
    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={isRefresh}
                    onRefresh={() => {
                        getSearchResults(kw);
                    }}
                />
            }
        >
            <IntAdsSrz />
            <View style={styles.container}>
            { state?.appData?.ads.is_ads_show && (<>
            <View style={{
                justifyContent:'center',
                alignContent:'center',
                alignItems:'center',
                backgroundColor:'transparent',
            }}>
                <BannerAd
        size={BannerAdSize.BANNER}
        unitId={state?.appData?.ads.banner} 
      />
      </View>
      </>)}

                {Object(searchResults).map((data , index) => {
                    // console.log(data)
                    return (<View style={styles.product} key={data.videoId}>

                        <TouchableOpacity onPress={() => navigation.navigate('PlayVideos', { ...data, params: params })}>
                            <View style={{ position: 'relative' }}>
 
                                    <Image style={styles.images}
                                        source={{
                                            uri: data.imgSrc
                                        }} />
                                <Text style={styles.ntktxt}>{data.duration}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 10, }}>
                            <View style={styles.viewsContainer}>
                                <Icon style={{ color: '#70737b', marginRight: 4 }} name={'eye'} size={20} />
                                <Text style={styles.viewstxt}>{data.views}</Text>
                            </View>
                            {/* <View style={{ backgroundColor: '#70737b', width: 5, height: 5, borderRadius: 10, marginHorizontal: 10 }} /> */}
                            {/* <Text style={styles.viewstxt}>3 Oct 2022</Text> */}
                        </View>
                        <View style={styles.txtcontent}>
                            <Text style={styles.productTXT} onPress={() => navigation.navigate('PlayVideos')} > {data.title}</Text>
                            <Icon style={{ color: '#000', marginRight: 4 }} name={'dots-vertical'} size={30} />
                        </View>

                    </View>);

                })}

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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    //================ product
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 18,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '90%',
    },
    product: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1.25,
        shadowRadius: 10,
        elevation: 4,
        marginVertical: 10,
    },
    images: {
        width: '100%',
        height: 200,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    productTXT: {
        width: '90%',
        color: '#000',
        paddingLeft: 8,
        paddingTop: 0,
        paddingBottom: 10,
        fontSize: 17,
    },
    viewsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewstxt: {
        color: '#70737b',
        fontSize: 12,
    },
    ntktxt: {
        color: '#fff',
        fontSize: 13,
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#000',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderTopRightRadius: 10,
    },
    txtcontent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        width: Dimensions.get('window').width * 0.70,
        height: 40,
        marginLeft: 0,
        //   marginRight: -100,
        paddingLeft: 12,
        fontSize: 15,
        borderColor: '#fff',
        borderRadius: 10,
        backgroundColor: '#7995F9',
        color: '#fff',
        fontWeight: '700'
    },
})