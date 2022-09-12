import { Alert, FlatList, SafeAreaView } from 'react-native'

import AnimatedButton from '../components/AnimatedButton'
import NavBar from '../components/NavBar'
import RecentsCard from '../components/RecentsCard'
import { StatusBar } from 'expo-status-bar'
import tw from 'twrnc'
import { useState } from 'react'
import { validateRequest } from '../sharedLogic/apiManager'

export default RecentsPage = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false)
  const repos = route.params.repos

  const redirectToGazers = async (repoString) => {
    const splitted = repoString.split('/')
    setIsLoading(true)
    try {
      const res = await validateRequest(...splitted)
      setIsLoading(false)
      navigation.navigate('Gazers', { data: res.data, repo: repoString })
    } catch (errorMsg) {
      setIsLoading(false)
      Alert.alert(...errorMsg)
    }
  }

  const cardRenderer = ({ item }) => {
    const onClick = () => !isLoading && redirectToGazers(item)
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
        data={repos}
        renderItem={cardRenderer}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style='light' />
    </SafeAreaView>
  )
}
