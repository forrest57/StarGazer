import { StatusBar } from 'expo-status-bar'
import { View, SafeAreaView, FlatList, Text, StyleSheet } from 'react-native'
import tw from 'twrnc'
import { Ionicons } from '@expo/vector-icons'
import { SimpleLineIcons } from '@expo/vector-icons'
import AnimatedButton from '../components/animatedButton'

const chevronLeftIcon = () => (
  <View
    style={tw` bg-gray-700 flex items-center justify-center rounded-md p-4 w-full`}>
    <Ionicons name='chevron-back-sharp' size={25} color='gray' />
  </View>
)
const gearIcon = () => (
  <View
    style={tw` bg-gray-700 flex items-center justify-center rounded-md p-4 w-full `}>
    <SimpleLineIcons name='settings' size={25} color='gray' />
  </View>
)

const ResetButtonText = () => (
  <View
    style={tw` bg-gray-700 flex items-center justify-center rounded-md p-4 w-3/4`}>
    <Text style={styles.buttonText}>Reset app data</Text>
  </View>
)

export default SettingsPage = ({ navigation, route }) => {
  const goBack = () => navigation.goBack(null)

  return (
    <SafeAreaView
      style={[
        { marginTop: StatusBar.currentHeight || 0 },
        tw`flex flex-col bg-gray-800 pt-7 h-full w-full `,
      ]}>
      <View style={tw`flex items-center justify-between flex-row w-3/5 ml-4`}>
        <AnimatedButton Component={chevronLeftIcon} pressFunction={goBack} />
        <Text style={styles.header}>Options</Text>
      </View>
      <View style={tw`h-full items-center justify-center`}>
        <View
          style={tw`flex flex-row 
          bg-gray-700 w-3/4 h-10
          items-center p-1 
          justify-center  px-5 mb-3 rounded-md`}></View>
        <AnimatedButton width='full' Component={ResetButtonText} />
      </View>
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
