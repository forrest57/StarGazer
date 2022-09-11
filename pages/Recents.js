import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native'
import tw from 'twrnc'
import AnimatedButton from '../components/animatedButton'
import NavBar from '../components/navBar'
import { getGazers } from '../sharedLogic/apiManager'

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
    console.log(item)
    const onClick = () => !isLoading && redirectToGazers(item)
    const CustomText = <CardComponent text={item} />
    return <AnimatedButton Component={CustomText} pressFunction={onClick} />
  }

  const CardComponent = ({ text }) => (
    <View
      style={tw`bg-gray-700 p-4 my-2 rounded-md flex w-full  justify-center flex-row`}>
      <Text style={styles.buttonText}>{text}</Text>
    </View>
  )
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

const styles = StyleSheet.create({
  buttonText: {
    color: 'gray',
    fontSize: 28,
    fontWeight: 'bold',
  },
})
