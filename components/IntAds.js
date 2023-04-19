import React, { useEffect , useState } from 'react' 
import {BannerAd, TestIds, BannerAdSize, InterstitialAd } from '@react-native-admob/admob';
import UserContext from '../auth/context';
const IntAdsSrz = () => {
    const context = React.useContext(UserContext);
    const {drawer,state,dispatch} = context; 
  const [isShow, setisShow] = useState(true);
  const [isLoaded, setIsloaded] = useState(false);
  useEffect(() => {

    const timeStamp =  new Date().getTime();
    const sec_calc = state.appData.ads.init_seconds_after; 
    const is_cc = state.initAd !== '' && ((timeStamp - state.initAd)/1000) < sec_calc ? false : true;
    if(state.appData.ads.is_ads_show_init && isShow && is_cc){
      const interstitial = InterstitialAd.createAd(state.appData.ads.int ,{
        requestNonPersonalizedAdsOnly: true,
      });
      interstitial.load().then( () =>{

        if(state.initAd == ''){
            setTimeout(() => {
            interstitial?.show().then(() =>{ 
              setisShow(false);
              dispatch({type:'set_ads_time',payload: timeStamp });
          });
          }, 15000);

          }else{
            interstitial?.show().then(() =>{ 
              setisShow(false);
              dispatch({type:'set_ads_time',payload: timeStamp });
          });
          }

      })
      
  }  
  
    return () => { 
    }
  }, [isShow]) ;

  return (<></>);
}
export default IntAdsSrz;