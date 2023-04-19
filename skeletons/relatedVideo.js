import SkeletonContent from 'react-native-skeleton-content-nonexpo';
const RelatedSkeleton = () => {  
     const videoBox = {
         width: "98%",
         height:280,
         borderRadius:0,
         marginBottom:10,
     }
    return (<> 
        <SkeletonContent
        isLoading={true} 
        containerStyle={{
            marginTop:10, 
        }}
        layout={
            [ 
                {
                    width:50,
                    height:25
                },
                {
                    width:'90%',
                    marginTop:10,
                    children:[
                        {
                            height:30,
                            width:'100%',
                        },
                        
                        {
                            height:30,
                            marginTop:5,
                            width:'85%',
                        }
                    ]
                },
                {
                    
                    marginTop:10,
                    display:'flex',
                    flexDirection:'row',
                    flexWrap:'nowrap',
                    marginLeft:15,
                    children:[
                        {
                            height:45,
                            width:90,
                            marginRight:10,
                            borderRadius:10,
                        },
                        { 
                            height:45,
                            width:90,
                            borderRadius:10,
                        }
                    ]
                },
                {
                    marginTop:15,

                    children: [
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
 
  
export default RelatedSkeleton;