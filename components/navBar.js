import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet } from 'react-native'
import AnimatedButton from '../components/animatedButton'
import { Ionicons } from '@expo/vector-icons'
import { SimpleLineIcons } from '@expo/vector-icons'
import tw from 'twrnc'

const chevronLeftIcon = () => (
  <View
    testID={'BackButton'}
    style={tw` bg-gray-700 flex items-center justify-center rounded-md p-4 w-full`}>
    <Ionicons name='chevron-back-sharp' size={25} color='gray' />
  </View>
)
const gearIcon = () => (
  <View
    testID={'GearButton'}
    style={tw` bg-gray-700 flex items-center justify-center rounded-md p-4 w-full `}>
    <SimpleLineIcons name='settings' size={25} color='gray' />
  </View>
)
export default Navbar = ({ navigation, barText, isSettingsShown = true }) => {
  const goBack = () => navigation.goBack(null)
  const goToSettings = () => navigation.navigate('Settings')
  return (
    <View
      style={[
        tw` flex justify-between flex-row items-center text-center p-1 w-full  px-5 mb-3 rounded-md`,
      ]}>
      <AnimatedButton Component={chevronLeftIcon} pressFunction={goBack} />
      <Text testID='barText' style={styles.text}>
        {barText}
      </Text>
      {isSettingsShown ? (
        <AnimatedButton Component={gearIcon} pressFunction={goToSettings} />
      ) : (
        <View style={{ height: 59, width: 59 }}></View>
      )}
      <StatusBar style='light' />
    </View>
  )
}
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'gray',
  },
})
