import { StatusBar } from 'expo-status-bar'
import { View, SafeAreaView, Text, StyleSheet, Alert } from 'react-native'
import tw from 'twrnc'
import { Ionicons } from '@expo/vector-icons'
import AnimatedButton from '../components/animatedButton'
import { clearRepoHistory } from '../sharedLogic'

const chevronLeftIcon = () => (
  <View
    style={tw` bg-gray-700 flex items-center justify-center rounded-md p-4 w-full`}>
    <Ionicons name='chevron-back-sharp' size={25} color='gray' />
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
  const resetHisory = async () => {
    const res = await clearRepoHistory()
    Alert.alert(...res)
  }
  return (
    <SafeAreaView
      style={[
        { marginTop: StatusBar.currentHeight || 0 },
        tw`flex flex-col bg-gray-800 pt-7 h-full w-full `,
      ]}>
      <View style={tw`flex items-center justify-between flex-row w-3/5 ml-4`}>
        <AnimatedButton Component={chevronLeftIcon} pressFunction={goBack} />
        <Text style={styles.header}>Settings</Text>
      </View>
      <View style={tw`h-full items-center justify-center`}>
        <AnimatedButton
          width='full'
          Component={ResetButtonText}
          pressFunction={resetHisory}
        />
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
