import React from 'react';
import { View, Text, Pressable, Image, ScrollView, StyleSheet } from 'react-native';
import { colorTheme, common_styles } from '../../../../constant';
import IconButton from '../../../../components/Buttons/IconButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const CompletePatientProfilePage2 = ({ formValues, pickImage, removeImage }) => {
    return (
        <View style={[ { flex: 1 }]} >
            <Text style={[common_styles.extra_large_text_large_weight, { marginTop: 10, fontSize: 25 }]}>Upload profile picture</Text>
            <View style={{ marginTop: 20, flex: 1, justifyContent: 'center' }}>
                {!formValues.profile_picture ?
                    <Pressable onPress={pickImage} style={{ borderWidth: 1, borderStyle: 'dashed', height: 500, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ alignItems: 'center' }}>
                            <IconButton onPress={pickImage} IconCategory={MaterialCommunityIcons} color={colorTheme.primaryColor} size={80} iconName={'cloud-upload'} />
                            <Text style={[common_styles.extra_large_text_large_weight, { marginBottom: 10 }]}>Choose your image here</Text>
                        </View>
                    </Pressable>
                    :
                    <View style={{ position: 'relative' }}>
                        <Image
                            source={{ uri: formValues.profile_picture.uri }}
                            style={{ width: '100%', height: 500, borderRadius: 10,objectFit:'cover' }}
                        />
                        <View style={{ position: 'absolute', top: 10, right: 10 }}>
                            <IconButton IconCategory={Fontisto} color={"white"} size={30} iconName={'close'} onPress={removeImage} />
                        </View>
                    </View>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBlock: 5,
        backgroundColor: colorTheme.lightappBackGroundColor,
    },
    subContainer: {
        width: '90%',
        alignSelf: 'center',
    },
});

export default CompletePatientProfilePage2;