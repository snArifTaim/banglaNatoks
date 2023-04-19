import { useNavigation } from '@react-navigation/native'
import React, { useEffect , useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, View, Image, Dimensions } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window');
const styles = {
  container: {
    height: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapper: {
    marginTop: 20,
  },

  slide: {
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width,
    height: 250,
  }
}

export default  Slider = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setisloading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    
    fetch('https://test.sohag.tech/api/slidervideos').then(data => data.json()).then(data =>{
      setisloading(false);
      if(data.code == 200){
          // success
          
      setVideos(data.data);

      }else{
          alert('Error');

      }
  }).catch(e =>{
    setisloading(false);
  });
    
  
    return () => {
      // setVideos([]);
    }
  }, [])
  if(isLoading){
    return (<> 
    <SkeletonContent
    isLoading={true}
    layout={[
      {  width: width*0.98, height: 250, margin: 10 ,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',},
        {
          width:'100%',
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
          children: [
              {
                width: width * 0.45,
                height:25
              },
              
              {
                width: width * 0.20,
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                marginRight:5,
                children: [
                  {
                    width:20,
                    height:20,
                    borderRadius:100
                  },
                  {
                    width:20,
                    height:20,
                    borderRadius:100
                  },
                  {
                    width:20,
                    height:20,
                    borderRadius:100
                  },
                ]
              }

          ]
        }
    ]}
    />
    </>);
  }
  if(Object(videos).length == 0 ){
    return null;
  }
  
    return (
      <View style={styles.container}>
        <Swiper
          style={styles.wrapper}
          height={250}
          autoplay
          autoplayTimeout={5}
          dot={
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,.2)',
                width: 5,
                height: 5,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: '#000',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3
              }}
            />
          }
          paginationStyle={{
            bottom: -23,
            left: null,
            right: 20,
          }}
          loop
        >
          {Object(videos).map((data,index) =>{ 
            return (<View
            key={data.videoId}
              style={styles.slide}
              title={
                <Text numberOfLines={1}>{data.title}</Text>
              }
            >
              <TouchableOpacity onPress={() =>{
                navigation.navigate('PlayVideos',data );
              }}>
              <Image
                resizeMode="stretch"
                style={styles.image}
                source={{
                  uri: data.imgSrc
                }} 
              />

              </TouchableOpacity>
            </View>);
          })}
        </Swiper>
      </View>
    );
 
}