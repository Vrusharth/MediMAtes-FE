import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colorTheme, common_styles } from '../../../constant';
import IconButton from '../../../components/Buttons/IconButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BigButton from '../../../components/Buttons/BigButton';
import { getItem, removeItem } from '../../../utils/asyncstorage';

export default function Home() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[{ flex: 1 }]}>
        <View style={{ flex: 0.75 }}>
          <View style={[styles.subContainer]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={[
                    common_styles.extra_large_text_large_weight,
                    { color: 'white', fontSize: 25 },
                  ]}>
                  Hey, Dr. Singh!
                </Text>
                <Text
                  style={[
                    common_styles.medium_text_normal_weight,
                    { color: 'white' },
                  ]}>
                  Today is busy day
                </Text>
              </View>
              <IconButton
                color={'black'}
                size={25}
                iconName={'bell-badge-outline'}
                IconCategory={MaterialCommunityIcons}
              />
            </View>
            <View
              style={{
                width: '100%',
                backgroundColor: 'white',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,

                elevation: 8,
                marginBlock: 20,
                padding: 15,
              }}>
              <View
                style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <Image
                  source={require('../../../assets/img/try.jpg')}
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: 'cover',
                    borderRadius: 50,
                  }}
                />
                <View>
                  <Text style={[common_styles.large_text_normal_weight]}>
                    Mr. Vrusharth Nirmal
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 6,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={[
                        common_styles.small_text_normal_weight,
                        { color: colorTheme.lightTextColor },
                      ]}>
                      Migranes
                    </Text>
                    <View
                      style={{
                        backgroundColor: colorTheme.borderColor,
                        width: 8,
                        height: 8,
                        borderRadius: 50,
                      }}
                    />
                    <Text
                      style={[
                        common_styles.small_text_normal_weight,
                        { color: colorTheme.lightTextColor },
                      ]}>
                      Online Visit
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                  padding: 10,
                  backgroundColor: colorTheme.iconWithBlueBackGround,
                  borderRadius: 10,
                  marginBlock: 20,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                  <MaterialCommunityIcons
                    name={'calendar-month'}
                    color={colorTheme.primaryColor}
                    size={20}
                  />
                  <Text
                    style={[
                      common_styles.small_text_normal_weight,
                      { fontSize: 13 },
                    ]}>
                    Monday, May 22
                  </Text>
                </View>
                <View
                  style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                  <MaterialCommunityIcons
                    name={'calendar-month'}
                    color={colorTheme.primaryColor}
                    size={20}
                  />
                  <Text
                    style={[
                      common_styles.small_text_normal_weight,
                      { fontSize: 13 },
                    ]}>
                    11:00 - 12:00 AM
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <BigButton
                  style={{
                    borderWidth: 1,
                    borderColor: colorTheme.borderColor,
                    borderRadius: 10,
                    width: '48%',
                  }}
                  label={'Reschedule'}
                />
                <BigButton
                  style={{
                    borderWidth: 1,
                    borderColor: colorTheme.borderColor,
                    borderRadius: 10,
                    width: '48%',
                    backgroundColor: colorTheme.iconLightBackGroundColor,
                  }}
                  label={'Join Session'}
                  labelStyle={{ color: 'white' }}
                />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderTopEndRadius: 30,
            borderTopLeftRadius: 30,
          }}>
          <View style={[styles.subContainer]}>
            <Text>home</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.primaryColor,
    paddingTop: 25,
  },
  subContainer: {
    width: '90%',
    alignSelf: 'center',
  },
});
