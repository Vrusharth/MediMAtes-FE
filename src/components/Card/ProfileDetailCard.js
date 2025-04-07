import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BigButton from '../Buttons/BigButton'
import { colorTheme, common_styles } from '../../constant'
import IconButton from '../Buttons/IconButton'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { navigate } from '../../utils/navRef'

export default function ProfileDetailCard({ item, style }) {
    function calculateTotalExperience(experiences) {
        let totalMonths = 0;
        experiences.forEach((exp) => {
            const from = new Date(exp?.fromdate);
            const to = new Date(exp?.todate);
            const months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
            totalMonths += months;
        });

        const years = Math.floor(totalMonths / 12);

        return `${years} years EXP`;
    }

    function handleClick(id) {
        navigate('Details', { id: id })
    }
    return (
        <View style={{ marginTop: 10, elevation: 5, backgroundColor: 'white', padding: 10, borderRadius: 10, ...style }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <Image source={{ uri: item?.profile_picture }} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 50 }} />
                    <View>
                        <Text style={[common_styles.large_text_normal_weight]}>{item?.doctor_name}</Text>
                        <Text style={[common_styles.small_text_normal_weight, { color: 'gray' }]}>{`${item?.education_qualifications[0]?.specialization} ${calculateTotalExperience(item?.experience)}`}</Text>
                    </View>
                </View>
                <IconButton style={{ backgroundColor: colorTheme.iconBg, paddingInline: 10 }} label={`${item?.doctor?.avg_rating}`} IconCategory={MaterialIcons} iconName={'star'} color={colorTheme.primaryColor} size={15} />
            </View>
            <View style={{ backgroundColor: colorTheme.iconBg, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, padding: 10, borderRadius: 5 }}>
                <View>
                    <Text style={[common_styles.medium_text_normal_weight]}>Available Now</Text>
                    <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center', }}>
                        <IconButton IconCategory={MaterialIcons} iconName={'videocam'} color={'#28C76F'} size={20} />
                        <Text style={[common_styles.small_text_normal_weight, { color: '#28C76F', marginBottom: 2 }]}>Video Consult</Text>
                    </View>
                </View>
                <View style={{ width: 2, backgroundColor: colorTheme.borderColor }} />
                <View>
                    <Text style={[common_styles.medium_text_normal_weight]}>₹{item?.appointments[0]?.consultation_type?.video_call?.consultation_fee}</Text>
                    <Text style={[common_styles.small_text_normal_weight,]}>Consultion Fees</Text>
                </View>
            </View>
            <BigButton
                label={"View Profile"}
                labelStyle={{ color: 'white' }}
                style={{ backgroundColor: colorTheme.primaryColor, marginTop: 10 }}
                onPress={()=>handleClick(item?.doctor?._id)}
            />
        </View>
    )
}

const styles = StyleSheet.create({})