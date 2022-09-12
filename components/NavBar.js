import { StyleSheet, Text, View } from 'react-native'

import AnimatedButton from './AnimatedButton'
import { Ionicons } from '@expo/vector-icons'
import { SimpleLineIcons } from '@expo/vector-icons'
import tw from 'twrnc'

const buttonStyle = tw` bg-gray-700 rounded-md p-4 w-full`
const chevronLeftIcon = () => (
  <View testID={'BackButton'} style={buttonStyle}>
    <Ionicons name='chevron-back-sharp' size={25} color='gray' />
  </View>
)
const gearIcon = () => (
  <View testID={'GearButton'} style={buttonStyle}>
    <SimpleLineIcons name='settings' size={25} color='gray' />
  </View>
)
export default Navbar = ({ navigation, barText, isSettingsShown = true }) => {
  const goBack = () => navigation.goBack(null)
  const goToSettings = () => navigation.navigate('Settings')
  return (
    <View
      style={[
        tw` flex justify-between flex-row items-center  p-1 w-full  px-5 mb-3 rounded-md`,
      ]}>
      <AnimatedButton Component={chevronLeftIcon} pressFunction={goBack} />
      <Text testID='barText' style={styles.text}>
        {barText}
      </Text>
      {isSettingsShown ? (
        <AnimatedButton Component={gearIcon} pressFunction={goToSettings} />
      ) : (
        //required for the flex alignment, so that the spacing is even with or without the gearbutton
        <View style={styles.placeHolderView}></View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'gray',
  },
  placeHolderView: { height: 59, width: 59 },
})
