import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
 
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
const VideoSkeleton = () => {  
     const videoBox = {
         width: 160,
         height:180,
         borderRadius:10,
         marginHorizontal: 5,
         marginVertical: 10,
     }
    return (<> 
        <SkeletonContent
        isLoading={true} 
        containerStyle={{
            marginTop:50,
        
        }}
        layout={
            [
                {
                    width: 75,
                    height: 30,
                    marginLeft:10,
                    alignSelf:'flex-start'
                },
                
                {
                    width: "90%",
                    height: 10,
                    marginTop:5,
                    marginLeft:10,
                },
                {
                    width:'100%',
                    display:'flex',
                    alignSelf: 'center',
                    justifyContent: 'center', 
                    flexDirection:'row',
                    flexWrap:'wrap', 
                    alignContent:'center',
                    margin:10,
                    children:[
                        videoBox,
                        videoBox,
                        videoBox,
                        videoBox,
                        videoBox, 
                        videoBox,
                        videoBox, 
                        videoBox,
                    ]
                }

            ]
        }
        /> 
      </>);
}
 
  
export default VideoSkeleton;