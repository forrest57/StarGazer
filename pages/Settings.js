import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import AnimatedButton from '../components/AnimatedButton'
import NavBar from '../components/NavBar'
import { StatusBar } from 'expo-status-bar'
import { clearRepoHistory } from '../sharedLogic/asyncStorageManager'
import tw from 'twrnc'

const ResetButtonText = () => (
  <View
    style={tw`bg-gray-700 flex items-center justify-center rounded-md p-4 w-3/4`}>
    <Text style={styles.buttonText}>Reset app data</Text>
  </View>
)

export default SettingsPage = ({ navigation, route }) => {
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
      <NavBar
        barText={'Settings'}
        navigation={navigation}
        isSettingsShown={false}
      />
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
