import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native'
import tw from 'twrnc'
import AnimatedButton from '../components/animatedButton'
import {
  getRepoHistory,
  appendRepoToHistory,
  validateRequest,
} from '../sharedLogic'

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
          await appendRepoToHistory(routeName)
          setIsLoading(false)
          navigation.navigate('Gazers', { data: res.data, repo: routeName })
        } catch (errorMsg) {
          setIsLoading(false)
          Alert.alert(...errorMsg)
        }
      }

      //TESTING FUNCTION
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

      return (
        <SafeAreaView
          style={[
            { marginTop: StatusBar.currentHeight || 0 },
            tw`flex flex-col items-center justify-center bg-gray-800 h-full  `,
          ]}>
          <Text style={styles.title}>Stargazer</Text>

          <View style={tw`flex flex-row w-3/4 items-center justify-between`}>
            <TextInput
              testID='textInput'
              autoFocus={true}
              cursorColor='white'
              style={[
                tw` w-5/12 p-3 bg-gray-700  rounded-md`,
                styles.TextInput,
              ]}
              placeholder='User'
              placeholderTextColor={'gray'}
              onChangeText={(newUser) => setUser(newUser)}
            />
            <Text style={[{ fontSize: 46, color: 'gray' }, tw`w-1/12 `]}>
              /
            </Text>
            <TextInput
              testID='textInput'
              cursorColor='white'
              style={[
                tw` w-5/12 p-3 bg-gray-700  rounded-md`,
                styles.TextInput,
              ]}
              placeholder='Repo'
              onChangeText={(newRepo) => setRepo(newRepo)}
              placeholderTextColor={'gray'}
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
    fontSize: 28,
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
