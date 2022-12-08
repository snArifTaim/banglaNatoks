import React from "react";
import { Alert } from "react-native";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
} from "react-native";

import Icon from 'react-native-vector-icons/Ionicons';

export default function SearchScreen({ navigation, props }) { 
    const [query, setQuery] = React.useState('');
    const [relatedkw, setkws] = React.useState([]);
    React.useEffect(() => {
         if(query ==''){
            setkws([]);
            return;
        }
        getReleatedkw(query);
        
      return () => { 
      }
    }, [query]);
    
    const getReleatedkw = (kw) =>{
        if(kw ==''){
            setkws([]);
            return;
        }
        fetch('https://google.com/complete/search?client=chrome&q='+kw).then(data => data.json()).then(data =>{ 
            setkws(data[1]);
        }).catch(e =>{});

    }
    return (
    <ScrollView>
        <StatusBar hidden/>
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={query}
                placeholder="Type here..."
                keyboardType="default"
                placeholderTextColor={'#000'}
                onChangeText={e => {
                    setQuery(e);
                    // getReleatedkw(e);
                }}
                returnKeyType='search'
                onSubmitEditing={() =>{
                    
                if(query ==''){
                    Alert.alert('Empty Query!','Type your search query!')
                    return;
                }
                navigation.navigate('Searchpage', query);
                }}
            />
            <TouchableOpacity
            onPress={() =>{ 
                if(query ==''){
                    Alert.alert('Empty Query!','Type your search query!')
                    return;
                }
                navigation.navigate('Searchpage', query);
            }}
                style={styles.sbtn}>
                <Icon style={styles.sbtntxt} name={'search'} size={25}/>
            </TouchableOpacity>
        </View>
        {Object(relatedkw).length > 0  && (<>
        <View style={{
            
        width: '90%',
        position: 'relative',
        display: 'flex', 
        alignItems: 'center', 
        alignSelf: 'center', 
        marginTop:-13,
        borderRadius:10,
        backgroundColor:'#ddd',

        }}>
            {Object(relatedkw).map((names , index) =>{
                 return (<TouchableOpacity key={index} style={{
                    padding:5,
                    // borderWidth:1,
                    borderColor:'grey',
                    width:'100%',
                    // marginBottom:2, 
                    // borderRadius:10,
                    flexDirection:'row',
                    marginLeft:10,
                 }} onPress={() =>{
                    
                navigation.navigate('Searchpage', names);
                 }}>
                    
                <Icon style={{}} name={'search'} size={25}/>

                    <Text style={{
                        fontSize:18,
                        marginLeft:5,
                    }}>{names}</Text>
                 </TouchableOpacity>)
            })}
        </View>
        </>)}

        <View style={styles.ads}>
            <Text style={styles.adstxt}>ADS</Text>
        </View>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: 17,
    },
    input: {
        width: '80%',
        height: 45,
        margin: 12,
        marginLeft: 0,
        marginRight: 0,
        borderWidth: 1,
        paddingLeft: 15,
        fontSize: 15,
        borderWidth: 1,
        borderColor:'#ddd',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    sbtn: {
        width: '20%',
        height: 45,
        backgroundColor: '#547AFF',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10,
    },
    sbtntxt: {
        color: '#fff',
    },
    // ====================>>>>> ADS
    ads: {
        width: '90%',
        marginTop: 20,
        marginBottom: 15,
        height: 200,
        backgroundColor: '#d5d5d5',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    adstxt: {
        color: '#000',
        fontSize: 50,
        textAlign: 'center',
        display: 'flex',
    },
});