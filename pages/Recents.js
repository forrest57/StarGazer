import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet } from 'react-native'
import tw from 'twrnc'
import NavBar from '../components/navBar'

export default RecentsPage = ({ navigation, route }) => {
  return (
    <SafeAreaView
      style={[
        { marginTop: StatusBar.currentHeight || 0 },
        tw`flex flex-col bg-gray-800 pt-7 h-full w-full `,
      ]}>
      <NavBar navigation={navigation} barText={'Recent repos'} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    marginLeft: 8,
    color: 'gray',
    fontSize: 28,
  },
  buttonText: {
    color: 'gray',
    fontSize: 28,
    fontWeight: 'bold',
  },
})
