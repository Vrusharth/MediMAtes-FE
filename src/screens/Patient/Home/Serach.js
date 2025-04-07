import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colorTheme, common_styles } from '../../../constant'
import { ScrollView } from 'react-native-gesture-handler'
import NormalTextInputWithIcon from '../../../components/Inputs/NormalTextInputWithIcon'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Underline from '../../../components/Underline'
import { useNavigation } from '@react-navigation/native'
import IconButton from '../../../components/Buttons/IconButton'

export default function Search() {
    const [formValues, setFormValues] = useState({
        search: '',
    })
    const navigation = useNavigation();
    function onSearch() {
        navigation.navigate('SearchResult', { query: formValues.search });
    }
    return (
        <View style={styles.container}>
            <View style={[styles.subContainer, { flex: 1, justifyContent: 'space-between' }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <MaterialCommunityIcons name={'chevron-left'} size={30} onPress={() => navigation.goBack()} />
                        <NormalTextInputWithIcon enterKeyHint={'search'} placeholder={'Find doctors...'} setFormValues={setFormValues} value={formValues.search} name={'search'} style={{ borderWidth: 1, width: '90%' }} rightIcon={'close-circle'} submitEdit={onSearch} />
                    </View>
                </View>
                <Underline />
                <ScrollView contentContainerStyle={[]} showsVerticalScrollIndicator={false}>
                    <View style={{ padding: 10 }}>
                        <Text style={[common_styles.large_text_normal_weight, { color: 'gray', marginBottom: 10 }]}>Suggested Doctors</Text>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <MaterialCommunityIcons name={'arrow-top-right'} size={25} color={'gray'} />
                            <Text style={[common_styles.medium_text_normal_weight, { color: 'gray', marginBottom: 5 }]}>Sharvesh Singh</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: colorTheme.lightappBackGroundColor,
    },
    subContainer: {
        width: '90%',
        alignSelf: 'center',
    },
})