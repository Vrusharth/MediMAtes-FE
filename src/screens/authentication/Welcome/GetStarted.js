import { StyleSheet, Text, View, StatusBar, useColorScheme, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { colorTheme } from '../../../constant';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import FullCarousel from '../../../components/Carousel/FullCarousel';

export default function GetStarted() {

    const colorScheme = useColorScheme();
    const styles = colorScheme === 'dark' ? darkStyles : lightStyles;
    const navigation = useNavigation()

    const SampleComponent = ({ index, data }) => (
        <View style={{ flex: 1,  alignItems: 'center',paddingVertical:30,justifyContent:'space-between' }}>
            <LottieView
                source={require('../../../assets/lottie/getStartedAi.json')}
                autoPlay
                loop
                style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 0 }}
            />
            <Text>hello</Text>
            <Text>sjjsjsj</Text>
        </View>
    );

    const data = [
        { title: 'First Item' },
        { title: 'Second Item' },
        { title: 'Third Item' },
    ];

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={colorScheme === 'light' ? 'light-content' : 'light-content'}
                backgroundColor="transparent"
                translucent={true}
            />
            <View style={{ flex: 1, }}>
                <FullCarousel
                    Component={SampleComponent}
                    data={data}
                    autoPlay={false}
                    fastInterval={1500}
                    loop={true}
                    componentWidth={0}
                    dynamicHeight={1.5}
                    style={{  flex: 1 }}
                    onSnapToItem={(index) => console.log('Snapped to item:', index)}
                />
            </View>
            <View style={{ flex: 0.4, }}>
                <View style={{ flex: 1, justifyContent: 'center', gap: 20, backgroundColor: colorTheme.primaryColor }}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUpNavigator')} style={[styles.button, { marginHorizontal: 30, backgroundColor: '#FFFFFF' }]}>
                        <MaterialCommunityIcons name={'email'} color={colorTheme.primaryColor} size={25} />
                        <Text style={[styles.changeButtonText, { color: 'black', padding: 8 }]}>New User ?  <Text style={{ color: '#000080' }}>Signup</Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginNavigator')} style={[styles.button, { backgroundColor: 'white', marginHorizontal: 30 }]}>
                        <MaterialCommunityIcons name={'login'} color={colorTheme.iconWithBlueBackGround} size={25} />
                        <Text style={[styles.changeButtonText, { color: 'black' }]}>Existing User ?  <Text style={{}}>Login</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const baseStyles = {
    button: {
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        padding: 10,
        fontSize: 16,
        fontWeight: '500',
    },
    mainText: {
        fontFamily: colorTheme.appcommonfont,
    },
    subText: {
        fontFamily: colorTheme.appcommonfont,
    },
};

const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.lightappBackGroundColor,
    },
    backgroundColorHandler: {
        backgroundColor: colorTheme.lightappBackGroundColor
    },
    mainText: {
        ...baseStyles.mainText,
        color: 'black',
    },
    subText: {
        ...baseStyles.subText,
        color: 'black',
    },
    button: {
        ...baseStyles.button,
    },
    buttonText: {
        ...baseStyles.buttonText,
    },
    changeButtonText: {
        ...baseStyles.buttonText,
        color: colorTheme.iconWithBlueBackGround
    }
});

const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.darkappBackGroundColor,
    },
    backgroundColorHandler: {
        backgroundColor: colorTheme.darkappBackGroundColor
    },
    mainText: {
        ...baseStyles.mainText,
        color: 'white',
    },
    subText: {
        ...baseStyles.subText,
        color: 'white',
    },
    button: {
        ...baseStyles.button,
    },
    buttonText: {
        ...baseStyles.buttonText,
    },
    changeButtonText: {
        ...baseStyles.buttonText,
    }
});