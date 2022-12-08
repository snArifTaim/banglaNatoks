import React, { Component } from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')

const styles = {
    slidercontainer: {
        flex: 1,
    },
    slide: {
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    sliderimage: {
        width: '100%',
    },
}

export default class extends Component {
    render() {
        return (
            <View style={styles.slidercontainer}>
                <Swiper
                    style={styles.wrapper}
                    height={200}
                    // onMomentumScrollEnd={(e, state, context) =>
                    //     // console.log('index:', state.index)
                    // }
                    dot={
                        <View
                            style={{
                                backgroundColor: '#ddd',
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
                        right: 10
                    }}
                    loop
                >
                    <View
                        style={styles.slide}
                        title={
                            <Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>
                        }
                    >
                        <Image
                            resizeMode="stretch"
                            style={styles.sliderimage}
                            source={require('./Assests/download.jpg')}
                        />
                    </View>
                    <View
                        style={styles.slide}
                        title={
                            <Text numberOfLines={1}>Big lie behind Nine’s new show</Text>
                        }
                    >
                        <Image
                            resizeMode="stretch"
                            style={styles.sliderimage}
                            source={require('./Assests/download.jpg')}
                        />
                    </View>
                    <View
                        style={styles.slide}
                        title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}
                    >
                        <Image
                            resizeMode="stretch"
                            style={styles.sliderimage}
                            source={require('./Assests/download.jpg')}
                        />
                    </View>
                    <View
                        style={styles.slide}
                        title={
                            <Text numberOfLines={1}>Learn from Kim K to land that job</Text>
                        }
                    >
                        <Image
                            resizeMode="stretch"
                            style={styles.sliderimage}
                            source={require('./Assests/download.jpg')}
                        />
                    </View>
                </Swiper>
            </View>
        )
    }
}