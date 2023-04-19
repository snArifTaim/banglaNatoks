import React,{useState,useEffect,useRef,useReducer} from 'react';
import { NavigationContainer } from "@react-navigation/native"; 
import HomeScreen from "./Screens/HomeScreen";
import SearchScreen from "./Screens/Search";
import VideoScreen from "./Screens/VideoScreen";
import SearchpageScreen from "./Screens/SearchPage"; 
import DeviceInfo from 'react-native-device-info'; 
import UserContext from './auth/context'; 
import initialState from './auth/states'; 
import SplashScreen from 'react-native-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Dimensions,
  StyleSheet, 
  TextInput,
  TouchableOpacity,
  DrawerLayoutAndroid, 
  BackHandler,
  Linking,
  Alert,
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Menu from './components/MenuDrawer';
import SplashScreenX from './Screens/SplashScreen';
import CategoryView from './Screens/CategoryView';
import VideoScreen2 from './Screens/VideoScreen2';

const config = {
  screens: {
    CategoryView: {
      path: 'category/:kw/:title',
    },
    PlayVideos2: {
      path:'link/:videoId'},
  },
};

const linking = {
  prefixes: ['bngntk://'],
  config,
};

const Stack = createSharedElementStackNavigator();

function TopBox() {
  const [text] = React.useState(null);
  return (
    <TextInput
      style={styles.input}
      value={text}
      placeholder="Search value"
      keyboardType="default"
      placeholderTextColor={'#fff'}
    />
  );
}

export default function app() {

  const drawer = useRef(null);
  const [isLoading, setIsLoading] = useState(true); 
    

  const reducer = (state, action) => {
    switch (action.type) {
      case 'set_init':
        return { ...state, initAd: action.payload };
      case 'set_appdata':
          return { ...state, appData: action.payload };
      case 'set_app':
        return { ...state, appJsonData: action.payload };
      case 'set_menu':
        return { ...state, menuData: action.payload };
      case 'set_profile':
        return { ...state,profileData: action.payload };
      case 'set_title':
        return { ...state, currentTitle: action.payload } 
      case 'set_actions':
        return { ...state, useractions: action.payload };
        case 'set_banner':
            return { ...state, bannerId: action.payload };
        case 'set_news':
          return { ...state, news: action.payload };
        case 'set_ads_time':
          return { ...state, initAd: action.payload };
      default: 
    }
  }
   
  const [state, dispatch] = useReducer(reducer, initialState);

  
  const appInit = () => { 
    // site api datas
    fetch('https://api.sohag.xyz/banglanatoks/api.php?v=' + DeviceInfo.getVersion() ).then(res => res.json()).then(data => { 
        AsyncStorage.getItem('storedValue').then(value => { 
          dispatch({type: 'set_appdata',payload: data });
          //check if not null
          if (value !== null) {
            // parse json
            let jsParsed = JSON.parse(value);
            // if build version mismatch then update localstorage
            if (jsParsed.build_v != data.build_v) {
              AsyncStorage.setItem('storedValue', JSON.stringify(data)).then(
                value => {},
              );
            }
          } else {
            // null so update localstorage
            AsyncStorage.setItem('storedValue', JSON.stringify(data)).then(
              value => {},
            );
          }
        }); 
 
        // notice control
        AsyncStorage.getItem('notice').then(idX => {
          if (idX == null) {
            //if ntc available then
            if (typeof data.ntc !== 'undefined') {
              let title =
                typeof data.ntc.title !== 'undefined'
                  ? data.ntc.title
                  : 'Notice!';

              let message =
                typeof data.ntc.msg !== 'undefined' ? data.ntc.msg : 'Notice!';

              let id = typeof data.ntc.id !== 'undefined' ? data.ntc.id : 1;

              let is_next =
                typeof data.ntc.is_next !== 'undefined'
                  ? data.ntc.is_next
                  : true;

              let is_exit =
                typeof data.ntc.is_exit !== 'undefined'
                  ? data.ntc.is_exit
                  : false;
              let is_show =
                typeof data.ntc.is_show !== 'undefined'
                  ? data.ntc.is_show
                  : false;

              let is_url =
                typeof data.ntc.is_show_url !== 'undefined'
                  ? data.ntc.is_show_url
                  : false;
              let url =
                typeof data.ntc.url !== 'undefined'
                  ? data.ntc.url
                  : 'https://play.google.com/store/apps/details?id=com.mlwbd';

              let btn = [];
              if (is_show) {
                if (is_exit)
                  btn.push({
                    text: 'Exit',
                    onPress: () => BackHandler.exitApp(),
                  });
                if(is_url){
                  btn.push({
                    text: 'Open',
                    onPress: () => Linking.openURL(url),
                  });
                }
                if (is_next)
                  btn.push({
                    text: 'Continue',
                    onPress: () => {
                      AsyncStorage.setItem('notice', id).then(value => {
                        setIsLoading(false);
                      });
                    },
                    style: 'cancel',
                  });
                Alert.alert(title, message, btn);
              } else { 
                setIsLoading(false);
              }
            }
          } else {
            // notice already shown check id again
            //if ntc available then
            if (typeof data.ntc !== 'undefined') {
              let id = typeof data.ntc.id !== 'undefined' ? data.ntc.id : false;
              if (id != idX && id !== false) {
                let title =
                  typeof data.ntc.title !== 'undefined'
                    ? data.ntc.title
                    : 'Notice!';
                let message =
                  typeof data.ntc.msg !== 'undefined'
                    ? data.ntc.msg
                    : 'Notice!';
                let is_next =
                  typeof data.ntc.is_next !== 'undefined'
                    ? data.ntc.is_next
                    : true;
                let is_exit =
                  typeof data.ntc.is_exit !== 'undefined'
                    ? data.ntc.is_exit
                    : false;
                let is_show =
                  typeof data.ntc.is_show !== 'undefined'
                    ? data.ntc.is_show
                    : false; 
                let is_url =
                    typeof data.ntc.is_show_url !== 'undefined'
                      ? data.ntc.is_show_url
                      : false;
                  let url =
                    typeof data.ntc.url !== 'undefined'
                      ? data.ntc.url
                      : 'https://play.google.com/store/apps/details?id=com.mlwbd';
    
                let btn = [];
                if  (is_show) {
                  if  (is_exit)
                    btn.push({
                      text: 'Exit',
                      onPress: () => BackHandler.exitApp(),
                    });
                    if(is_url){
                      btn.push({
                        text: 'Open',
                        onPress: () =>{ Linking.openURL(url); },
                      });
                    }

                  if (is_next)
                    btn.push({
                      text: 'Continue',
                      onPress: () => {
                        AsyncStorage.setItem('notice', id).then(value => {
                          setIsLoading(false);
                        });
                      },
                      style: 'cancel',
                    });
                  Alert.alert(title, message, btn);
                } else{
                  setIsLoading(false);
                }
             } else  {
                // continue the app
                setIsLoading(false);
              }
            }  else  {
              // continue the app
              setIsLoading(false);
            }
          }
         
        });

      })
      .catch(error => {
        // settotalyready(false);
        // setappready(true); 
        Alert.alert("Connection Problem",
         'Check Your Internet Connection, There was a problem with your internet!', [
          {
            text: 'Retry',
            onPress: () => appInit(),
          },{
            text: 'Exit',
            onPress: () => BackHandler.exitApp(),
          }
         ]
         );

      }).catch(e=> {}) ;
  };



  useEffect(() => {
    SplashScreen.hide();
    appInit();

    return () => {
      
    }
  }, []);
  
 
  const datas  = { drawer ,state ,dispatch } ;
  if(isLoading){
    return (<SplashScreenX />);
  }

  return (
    
    <UserContext.Provider value={datas} >
      <NavigationContainer linking={linking}>
         <DrawerLayoutAndroid
      drawerBackgroundColor='#fff'
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={ () => <Menu />}
    >
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }} >
          <Stack.Screen name="Home" component={HomeScreen}
            options={({ navigation }) => ({
              title: 'Bangla Natoks',
              headerTitleAlign: 'center',
              headerShown: true,
              headerStyle: { backgroundColor: '#547AFF', },
              headerTitleStyle: { color: '#fff' },
              headerTintColor: '#fff',
              headerRight: () => {
                return (<TouchableOpacity style={{paddingRight:10}}
                  onPress={() => {
                    navigation.navigate('Searches')
                  }}
                >
                  <Icon name={'magnify'} color={'#fff'} size={30} />
                </TouchableOpacity>)
              },
              headerLeft: () => {
                return (<TouchableOpacity style={{paddingLeft: 10}}
                  onPress={() => drawer.current.openDrawer()}
                >
                  <Icon name={'menu'} color={'#fff'} size={30} />
                </TouchableOpacity>)
              },
            })}
          /> 
          <Stack.Screen name="Searches" component={SearchScreen}
            options={{
              title: 'Search',
              headerShown: true,
              headerStyle: { backgroundColor: '#547AFF' },
              headerTitleStyle: { color: '#fff' },
              headerTintColor: '#fff',
              animation: 'slide_from_right'
            }}
          />
          <Stack.Screen name="CategoryView" component={CategoryView}
            options={{
              title: 'Category',
              headerShown: true,
              headerStyle: { backgroundColor: '#547AFF' },
              headerTitleStyle: { color: '#fff' },
              headerTintColor: '#fff',
              // animation: 'slide_from_right'
            }}
             

          />
          <Stack.Screen name="PlayVideos" component={VideoScreen}
          
            options={{ 
              animationEnabled: false,
            }}  
          />

          
<Stack.Screen name="PlayVideos2" component={VideoScreen2}
          
          options={{ 
            animationEnabled: false,
          }}  
        />

          <Stack.Screen name="Searchpage" component={SearchpageScreen}
            style={{ marginRight: -20 }}
            options={{
              headerTitle: (props) => <TopBox {...props} />,
              headerShown: true,
              headerStyle: { backgroundColor: '#547AFF' },
              headerTitleStyle: { color: '#fff' },
              headerTintColor: '#fff',
              animation: 'slide_from_right',
            }}

          />
        </Stack.Navigator>
    </DrawerLayoutAndroid>
      </NavigationContainer>
      
      </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#547AFF',
    paddingVertical: 20,
    position: 'relative',
  },
  input: {
    width: Dimensions.get('screen').width * 0.50,
    height: 40,
    marginLeft: 0,
    marginRight: -100,
    paddingLeft: 12,
    fontSize: 15,
    borderColor: '#fff',
    borderRadius: 10,
    backgroundColor: '#7995F9',
  },
  catgcontent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    padding: 7,
    // marginVertical: 5,
  },
  catgTxt: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
    paddingLeft: 10,
    fontFamily: 'semi-Bold'
  },
})