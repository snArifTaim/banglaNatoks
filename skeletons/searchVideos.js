import SkeletonContent from 'react-native-skeleton-content-nonexpo';
const SearchSkeleton = () => {  
     const videoBox = {
         width: "87%",
         borderRadius: 15,
         height:250, 
         margin:10,
     }
    return (<> 
        <SkeletonContent
        isLoading={true} 
        containerStyle={{  
        }}
        layout={
            [   
                {  
                    marginTop: 18, 
                    alignItems:'center',
                    children: [
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
 
  
export default SearchSkeleton;