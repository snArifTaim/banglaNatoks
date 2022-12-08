import { useNavigation } from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  ImageBackground, 
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList
} from 'react-native'; 
import UserContext from '../auth/context';  
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
const CateSection = () => {
  const context = React.useContext(UserContext);
  const [categories, setcategories] = React.useState([]);
  const [isLoading, setisLoading] = React.useState(true);
  const navigation =  useNavigation();
  const get_cats = () => { 
    setisLoading(true);
    fetch('https://api.sohag.xyz/banglanatoks/categories.php').then(data => data.json()).then(data =>{ 
        setisLoading(false);
        if(data.code == 200){
            setcategories(data.data);
        }else{
            alert('Error');
        }
    }).catch(e =>{ 
        setisLoading(false);
    });
  } 
 

  useEffect(() => { 
    get_cats();
    return () => {
        setcategories([]);
    };
  }, []);

   if(isLoading){
    return (<> 
    <SkeletonContent
        isLoading={true} 
        containerStyle={{ 
        
            marginTop:10,
        }}
        layout={ 
            [
                {
                    display:'flex',
                    flexDirection:'row',
                    flexWrap:'nowrap',
                    children: [
                        {
                            height:40,
                            width:90,
                            borderRadius:15,
                            margin:5,
                        },{
                            height:40,
                            width:90,
                            borderRadius:15,
                            margin:5,
                        },
                        {
                            height:40,
                            width:70,
                            borderRadius:15,
                            margin:5,
                        },
                        {
                            height:40,
                            width:85,
                            borderRadius:15,
                            margin:5,
                        },
                        {
                            height:40,
                            width:65,
                            borderRadius:15,
                            margin:5,
                        },
                        {
                            height:40,
                            width:60,
                            borderRadius:15,
                            margin:5,
                        },
                        {
                            height:40,
                            width:85,
                            borderRadius:15,
                            margin:5,
                        },
                        {
                            height:40,
                            width:65,
                            borderRadius:15,
                            margin:5,
                        },
                        {
                            height:40,
                            width:60,
                            borderRadius:15,
                            margin:5,
                        },
                        {
                            height:40,
                            width:85,
                            borderRadius:15,
                            margin:5,
                        },
                        {
                            height:40,
                            width:65,
                            borderRadius:15,
                            margin:5,
                        },
                        {
                            height:40,
                            width:60,
                            borderRadius:15,
                            margin:5,
                        }
                    ]
                }
            ]
        } 
        />
    </>);
   }
    return (<> 
    
    <SafeAreaView style={{
        marginTop:10,
    }}>
    <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) =>{
            return (<TouchableOpacity
            onPress={() =>{
                navigation.navigate('CategoryView',item);
            }}
            style={{
                padding:12,
                backgroundColor:'#fff',
                margin:5,
                elevation:1,
                borderRadius:15
            }}
            >
                <Text
                style={{
                    fontSize:15
                }}>{item.title}</Text>
            </TouchableOpacity>);
        }}
        keyExtractor={item => item.id}
      />

                    {/* <View>
                        <TouchableOpacity onPress={() =>{
                            navigation.navigate('CategoryView',{
                                title:'Hits',
                                kw:'hit natoks'
                            })
                        }}>
                            <Text>Hello </Text> 
                        </TouchableOpacity>
                    </View> */}
                 </SafeAreaView>

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
  
export default CateSection;