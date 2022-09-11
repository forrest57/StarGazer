import { StatusBar } from 'expo-status-bar'
import { FlatList, View, Text, SafeAreaView, StyleSheet } from 'react-native'
import tw from 'twrnc'
import AnimatedButton from '../components/animatedButton'
import NavBar from '../components/navBar'

//necessary for passing a propped component to AnimatedButton
const cardRenderer = ({ item }) => {
  console.log(item)
  const CustomText = <CardComponent text={item} />
  return <AnimatedButton Component={CustomText} />
}
const CardComponent = ({ text }) => (
  <View
    style={tw`bg-gray-700 p-4 my-2 rounded-md flex w-full  justify-center flex-row`}>
    <Text style={styles.buttonText}>{text}</Text>
  </View>
)
export default RecentsPage = ({ navigation, route }) => {
  console.log(route.params.repos)
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
        keyExtractor={(_, index) => index.toString()}
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
