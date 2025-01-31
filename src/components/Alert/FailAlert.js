import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { common_styles } from '../../constant';

export default function FailAlert({ error }) {
    const [canceled, setCanceled] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
          setCanceled(true); // This will hide the alert after 5 seconds
        }, 5000);
    
        return () => clearTimeout(timer); // Clean up the timer on component unmount
      }, []);
      
    return (
        !canceled && (
            <View style={{
                position: 'absolute', bottom: 40, left: 0, right: 0, zIndex: 1
            }}>
                <View style={{
                    width: '90%',
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    elevation: 2,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderRadius: 10,
                    gap: 10
                }}>
                    <View style={{ width: 10, height: 70, backgroundColor: 'red', borderTopStartRadius: 10, borderBottomStartRadius: 10 }} />
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, borderRightWidth: 1 }}>
                        <MaterialCommunityIcons name={'close-circle-outline'} color={'red'} size={35} />
                        <View style={{}}>
                            <Text style={[common_styles.extra_large_text_normal_weight]}>Error</Text>
                            <Text style={[common_styles.small_text_normal_weight, { color: 'gray' }]}>{error}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.2 }}>
                        <Text onPress={()=>setCanceled(true)} style={[common_styles.medium_text_normal_weight, { color: 'gray', textAlign: 'left' }]}>Close</Text>
                    </View>
                </View>
            </View>
        ))
}