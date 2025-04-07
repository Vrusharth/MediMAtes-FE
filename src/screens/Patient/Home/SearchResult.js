import { StyleSheet, Text, View, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Status from '../../../components/Status'
import Header from '../../../components/Header'
import { colorTheme, common_styles } from '../../../constant'
import BigButton from '../../../components/Buttons/BigButton'
import { useNavigation } from '@react-navigation/native'
import NormalTextInputWithIcon from '../../../components/Inputs/NormalTextInputWithIcon'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconButton from '../../../components/Buttons/IconButton'
import Underline from '../../../components/Underline'
import ProfileDetailCard from '../../../components/Card/ProfileDetailCard'
import { useSearch } from '../../../Hooks/appointment'
import Loading from '../../../components/Alert/Loading'

export default function SearchResult({ route }) {
  const { query } = route.params;
  const [formValues, setFormValues] = useState({
    search: query,
  })
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useSearch(query);

  const doctors = data?.pages[0]?.data?.doctors.flatMap(page => page) || [];


  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) return <Loading />;


  return (
    <View style={styles.container}>
      <Status />
      <Header title={"Search Result"} />
      <FlatList
        data={doctors}
        keyExtractor={(item) => item?._id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.subContainer}
        ListHeaderComponent={() => (
          <View >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
              <NormalTextInputWithIcon placeholder={'Find doctors...'} setFormValues={setFormValues} value={formValues.search} name={'search'} style={{ borderWidth: 1, width: '90%' }} icon={'magnify'} rightIcon={'close-circle'} />
              <IconButton IconCategory={FontAwesome} color={colorTheme.primaryColor} iconName={'sliders'} size={20} style={{ borderRadius: 10 }} />
            </View>
            <Underline style={{ padding: 0.6, marginTop: 15 }} />
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'baseline' }}>
              <Text style={[common_styles.extra_large_text_large_weight, { fontSize: 25 }]}>70</Text>
              <Text style={[common_styles.large_text_normal_weight, { color: 'gray' }]}>Result Found</Text>
            </View>
          </View>
        )}
        ListFooterComponent={() =>
          isFetchingNextPage ? <ActivityIndicator size="small" color="#28C76F" /> : null
        }
        renderItem={({ item }) => (
          <ProfileDetailCard item={item} />
        )}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: colorTheme.lightappBackGroundColor,
  },
  subContainer: {
    width: '90%',
    alignSelf: 'center',
  },
})