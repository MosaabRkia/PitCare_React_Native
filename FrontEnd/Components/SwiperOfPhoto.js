import React from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions, Text, StatusBar, Platform } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function SwiperOfPhoto(props) {
    const handleClick = (e, item) => {
        const { swipeBottom, swipeTop } = props
        if (e.nativeEvent.contentOffset.y < 0) {
            swipeBottom(item)
        } else {
            swipeTop(item)
        }
    }
    const { images, textSize, textColor, textBold, textUnderline, imageHeight } = props
    const height = imageHeight && imageHeight > (screenHeight - Platform.OS === 'ios' ? 0
        : StatusBar.currentHeight) ? (screenHeight - Platform.OS === 'ios' ? 0 : StatusBar.currentHeight) : imageHeight;
    return (
        <ScrollView style={{width:'90%',alignSelf:'center',borderRadius:5}} horizontal={true} pagingEnabled={true} >
            {images &&
                images.map((item, index) => {
                    return (typeof item.url === 'string' && typeof item.name === 'string' ?
                        <ScrollView key={index} onScrollEndDrag={(e) => handleClick(e, item)}>
                            <Image
                                style={{ height: 200, width: screenWidth*0.9,borderRadius:5, }}
                                source={{ uri: item.url }}
                            />
                            <View style={styles.imageText}>
                            </View>
                        </ScrollView>
                        :
                        null
                    )
                })
            }
        </ScrollView>
    );
}

export default SwiperOfPhoto;

const styles = StyleSheet.create({
    imageText: {
        position: 'absolute',
        bottom: 14,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
});
