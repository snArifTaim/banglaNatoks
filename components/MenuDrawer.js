import { useNavigation } from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  ImageBackground, 
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Linking,
  Share
} from 'react-native';
// import { BannerAd ,BannerAdSize} from '@react-native-admob/admob';
import UserContext from '../auth/context';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Menu = () => {
  const context = React.useContext(UserContext);
  const {drawer,state,dispatch} = context;
  const navigation =  useNavigation();
  const get_menu = () => { 
    fetch('https://api.sohag.xyz/banglanatoks/menu.php').then(data => data.json()).then(data =>{
      dispatch({type: 'set_menu',payload: data });
      AsyncStorage.setItem('menu_data', JSON.stringify(data)).then(() =>{ });
    }).catch(e =>{
  });
  } 
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: typeof state.appData.share_text =='string' ? state.appData.share_text : '',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    get_menu();
    return () => {
    };
  }, [])

   
    return (<>
        <ScrollView style={[styles.navigationContainer,{backgroundColor:'#fff'}]}>
        <View>
          <ImageBackground
            resizeMode="cover"
            style={{width: '100%', height: 160,paddingTop:10,paddingBottom:10}}
            source={{uri: 'https://c.neh.tw/thumb/f/720/comrawpixel2339976.jpg'}}
            blurRadius={40}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                  <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD">
                    <Image
                      style={{height: 80, width: 80, borderRadius: 20}}
                      source={{uri: 'https://api.sohag.xyz/banglanatoks/img/logo.png'}}
                    />
                  </TouchableHighlight>
                  <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD" >
                    <Text
                      style={{color: '#000', fontSize: 18, fontWeight: '900'}}>
                     New Bangla Natok
                    </Text>
                  </TouchableHighlight>
          </View>
          </ImageBackground>
        </View>
  
        <View style={[styles.container,{height:"70%",width:"100%",borderTopColor:"red",borderTopWidth:4,padding:0,margin:0}]} horizontal={false}>
          
        <TouchableHighlight
                    style={{
                      padding: 12,
                      margin: 1,
                      borderColor: '#DDDDDDDD',
                      borderBottomWidth: 1,
                      width: '100%',
                      backgroundColor:'#fff',
                    }}
                    activeOpacity={0.6}
                    underlayColor={'#dddd'}
                    onPress={() => {
                      drawer.current.closeDrawer();
                      navigation.navigate('Home');
                    } }
                    >
                      <View style={{
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'flex-start',
                        alignItems:'center'
                        }}>
                      <Icon name='home' size={20} style={{marginRight:10}} color={"#000"} />
                      <Text style={{fontSize: 16, fontWeight: '600' ,color:'#000'}}>
                      Home
                    </Text>
                    </View>
                  </TouchableHighlight>

        {Object(state.menuData).map(dataX =>{
            return (<TouchableHighlight  style={{
              padding: 15,
              margin: 1,
              borderColor: '#DDDDDDDD',
              borderBottomWidth: 1,
              width: '100%',
              backgroundColor:'#fff',
            }} key={dataX.id} 
            activeOpacity={0.6}
            underlayColor={'#dddd'}
            onPress={()=>{
                if(dataX.navigation.navigation_type =='url'){
                    Linking.openURL(dataX.navigation.navigation_url)
                }else if(dataX.navigation.navigation_type =='screen') {
                    let NavData = dataX.navigation.navigation_object;
                    drawer.current.closeDrawer();
                    setTimeout(() => {
                    navigation.navigate(NavData.screenName,NavData.object);
                      
                    }, 100);
                }
             }} >
              <View style={{
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'flex-start',
                        alignItems:'center'
                        }}>
                        {dataX.icon_type =='icon' ? (<Icon name={dataX.icon_text} size={20} color={dataX.text_bg_color} style={{marginRight:10}}  />) : (<></>)}
                      <Text ellipsizeMode='tail' numberOfLines={1} style={ {fontSize:15,
                  color:'#000' ,
                  fontWeight: '600' ,
                  fontFamily: 'KoHo-Bold',
                 }}>{dataX.title}</Text>
                    </View>
             </TouchableHighlight>);
        })}
         
        <TouchableHighlight
                    style={{
                      padding: 12,
                      margin: 1,
                      borderColor: '#DDDDDDDD',
                      borderBottomWidth: 1,
                      width: '100%',
                      backgroundColor:'#fff',
                    }}
                    activeOpacity={0.6}
                    underlayColor={'#dddd'}
                    onPress={onShare}
                    >
                      <View style={{
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'flex-start',
                        alignContent:'center',
                        alignItems:'center'
                        }}>
                      <Icon name='share' size={16} color={"#000"} style={{marginRight:10}} />
                      <Text style={{fontSize: 15, fontWeight: '600' ,color:'#000',fontFamily: 'KoHo-Bold',}}>
                      Share
                    </Text>
                    </View>
                  </TouchableHighlight>
                  {/* {state.appData.ads.is_ads_show? (<><BannerAd size={BannerAdSize.BANNER} unitId={state.appData.ads.banner} /></>) : (<></>)} */}
        </View>
      </ScrollView>
      <View style={{
        alignItems:'center',
        marginBottom:10
      }}>
        <Text style={{
          colo:'#ddd',
          fontSize:15,
          fontWeight:'500',
          fontFamily: 'KoHo-Bold',
        }}>All Result BD <Text style={{
          fontSize:13,
          fontFamily: 'KoHo-Bold',
        }}>v{DeviceInfo.getVersion()}</Text></Text>
      </View>
      </>);
}
const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    navigationContainer: {
      backgroundColor: '#ffff',
    },
    paragraph: {
      padding: 16,
      fontSize: 15,
      textAlign: 'center',
    },
  });
  
export default Menu;