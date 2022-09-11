import { Alert, FlatList, SafeAreaView, StyleSheet } from 'react-native'

import AnimatedButton from '../components/AnimatedButton'
import NavBar from '../components/NavBar'
import RecentsCard from '../components/RecentsCard'
import { StatusBar } from 'expo-status-bar'
import { getGazers } from '../sharedLogic/apiManager'
import tw from 'twrnc'
import { useState } from 'react'

//necessary for passing a propped component to AnimatedButton

export default RecentsPage = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false)
  //this could be refactored to a reusable function by using global reactive state for loading.
  //That said, I  feel that it would be taxing on the development time,
  //compared to the cost of writing the same function twice in an app this small.
  console.log(route.params.repos)
  const redirectToGazers = async (repoString) => {
    const splitted = repoString.toLowerCase().split('/')
    setIsLoading(true)
    try {
      const res = await getGazers(...splitted)
      setIsLoading(false)
      navigation.navigate('Gazers', { data: res.data, repo: repoString })
    } catch (errorMsg) {
      setIsLoading(false)
      Alert.alert(errorMsg)
    }
  }

  const cardRenderer = ({ item }) => {
    const onClick = () => !isLoading && redirectToGazers(item)
    console.log(item)
    const CustomText = <RecentsCard text={item} />
    return <AnimatedButton Component={CustomText} pressFunction={onClick} />
  }

  return (
    <SafeAreaView
      style={[
        { marginTop: StatusBar.currentHeight || 0 },
        tw`flex flex-col bg-gray-800 pt-7 h-full w-full `,
      ]}>
      <NavBar navigation={navigation} barText={'Recent repos'} />
      <FlatList
        style={tw`w-full px-5`}
        data={route.params.repos}
        renderItem={cardRenderer}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style='light' />
    </SafeAreaView>
  )
}
