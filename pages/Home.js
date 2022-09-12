import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import React, { useState } from 'react'

import AnimatedButton from '../components/AnimatedButton'
import { StatusBar } from 'expo-status-bar'
import { getRepoHistory } from '../sharedLogic/asyncStorageManager'
import tw from 'twrnc'
import { validateRequest } from '../sharedLogic/apiManager'

const SearchButtonText = () => (
  <View
    style={tw` mt-3 bg-gray-700 flex items-center justify-center rounded-md p-4 w-3/4`}>
    <Text style={styles.buttonText}>Check Gazers</Text>
  </View>
)
const RecentButtonText = () => (
  <View
    style={tw`mt-3 bg-gray-700 flex items-center justify-center rounded-md p-4 w-3/4`}>
    <Text style={styles.buttonText}>Recent repos</Text>
  </View>
)

export default Home = ({ navigation }) => {
  const [repo, setRepo] = useState('')
  const [user, setUser] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validateAndRedirectToGazers = async () => {
    const routeName = `${user}/${repo}`
    setIsLoading(true)
    try {
      const res = await validateRequest(user, repo)
      setIsLoading(false)
      navigation.navigate('Gazers', { data: res.data, repo: routeName })
    } catch (errorMsg) {
      setIsLoading(false)
      Alert.alert(...errorMsg)
    }
  }

  const navigateToRecent = async () => {
    const res = await getRepoHistory()
    if (res.length) {
      navigation.navigate('Recent', { repos: res })
    } else {
      Alert.alert(
        'No recent repos',
        "Look some repos up and they'll be added to your history."
      )
    }
  }

  const goToGazers = async () =>
    !isLoading && (await validateAndRedirectToGazers())

  const goToRecent = async () => !isLoading && (await navigateToRecent())

  const textInputSettings = {
    testID: 'textInput',
    cursorColor: 'white',
    style: [tw` w-5/12 p-3 bg-gray-700  rounded-md`, styles.TextInput],
    placeholderTextColor: 'gray',
    returnKeyType: 'next',
    autoComplete: 'off',
  }
  const refInputRepo = React.useRef()

  return (
    <SafeAreaView
      style={[
        { marginTop: StatusBar.currentHeight || 0 },
        tw`flex items-center justify-center bg-gray-800 h-full  `,
      ]}>
      <Text style={styles.title}>Stargazer</Text>

      <View style={tw`flex flex-row w-3/4 items-center justify-between`}>
        <TextInput
          {...textInputSettings}
          autoFocus={true}
          placeholder='User'
          onChangeText={(newUser) => setUser(newUser)}
          onSubmitEditing={() => refInputRepo.current.focus()}
        />
        <Text style={[{ fontSize: 46, color: 'gray' }, tw`w-1/12 `]}>/</Text>
        <TextInput
          {...textInputSettings}
          placeholder='Repo'
          onChangeText={(newRepo) => setRepo(newRepo)}
          ref={refInputRepo}
          onSubmitEditing={goToGazers}
        />
      </View>

      <AnimatedButton
        width={'full'}
        Component={SearchButtonText}
        pressFunction={goToGazers}
      />
      <AnimatedButton
        width={'full'}
        Component={RecentButtonText}
        pressFunction={goToRecent}
      />

      <StatusBar style='light' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  TextInput: {
    fontSize: 20,
    height: 70,
    color: 'white',
  },
  title: {
    fontSize: 46,
    color: 'gray',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  buttonText: {
    fontSize: 32,
    color: 'gray',
    fontWeight: 'bold',
  },
})
