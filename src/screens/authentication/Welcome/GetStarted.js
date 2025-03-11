import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colorTheme, common_styles } from '../../../constant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import FullCarousel from '../../../components/Carousel/FullCarousel';
import BigButton from '../../../components/Buttons/BigButton';
import { GetStartedCarouselData } from '../../../assets/Data/AuthData';
import Status from '../../../components/Status';
import { removeItem } from '../../../utils/asyncstorage';

export default function GetStarted() {
    const navigation = useNavigation();

    const SampleComponent = ({ index, data }) => (
        <View style={{ flex: 1, alignItems: 'center', paddingVertical: 30, justifyContent: 'space-between', paddingInline: 30 }}>
            <LottieView
                source={data.lottie}
                autoPlay
                loop
                style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 0 }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-start', }}>
                <View style={{ width: 15, height: 15, backgroundColor: colorTheme.primaryColor, borderRadius: '50%' }} />
                <Text style={[common_styles.extra_large_text_normal_weight, { fontSize: 30 }]}>MediMate</Text>
                <View style={{ width: 15, height: 15, backgroundColor: colorTheme.primaryColor, borderRadius: '50%' }} />
            </View>
            <View style={{ width: '100%', marginBlock: 20, }}>
                <Text style={[common_styles.extra_large_text_normal_weight]}>{data.title}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Status />
            <View style={{ flex: 1 }}>
                <FullCarousel
                    Component={SampleComponent}
                    data={GetStartedCarouselData}
                    autoPlay={false}
                    fastInterval={1500}
                    loop={true}
                    componentWidth={0}
                    dynamicHeight={1.5}
                    style={{ flex: 1 }}
                    onSnapToItem={(index) => console.log('Snapped to item:', index)}
                />
            </View>
            <View style={{ flex: 0.4, justifyContent: 'center', gap: 20, backgroundColor: colorTheme.primaryColor, paddingHorizontal: 30, }}>
                <Text onPress={() => { removeItem("user") }} style={[common_styles.large_text_normal_weight, { color: 'white' }]}>Let's Get Started! Enter Your Mobile Number or Email</Text>
                <BigButton
                    IconCategory={MaterialCommunityIcons}
                    iconName={'login'}
                    label={'Login to your account'}
                    navigateTo={'LoginNavigator'}
                    style={{ padding: 5 }}
                />
                <BigButton
                    IconCategory={MaterialCommunityIcons}
                    iconName={'email'}
                    label={'Signup with email'}
                    navigateTo={'SignUpNavigator'}
                    style={{ padding: 5 }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.lightappBackGroundColor,
    },
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
    changeButtonText: {
        color: colorTheme.iconWithBlueBackGround,
        padding: 10,
        fontSize: 16,
        fontWeight: '500',
    },
    mainText: {
        fontFamily: colorTheme.appcommonfont,
        color: 'black',
    },
    subText: {
        fontFamily: colorTheme.appcommonfont,
        color: 'black',
    },
});
