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
        style={tw` bg-gray-700 flex items-center justify-center rounded-md p-4 w-3/4`}>
        <Text style={styles.buttonText}>Check Gazers</Text>
      </View>
    )
    const RecentButtonText = () => (
      <View
        style={tw` bg-gray-700 flex items-center justify-center rounded-md p-4 w-3/4`}>
        <Text style={styles.buttonText}>Recent repos</Text>
      </View>
    )

    export default Home = ({ navigation }) => {
      const [repo, setRepo] = useState('')
      const [user, setUser] = useState('')
      const [isLoading, setIsLoading] = useState(false)

      const validateAndRedirect = async () => {
        const routeName = `${user}/${repo}`
        setIsLoading(true)
        try {
          const res = await validateRequest(user, repo)
          const isPushed = await appendRepoToHistory(routeName)
          console.log('IsPushed:', isPushed)
          setIsLoading(false)
          navigation.navigate('Gazers', { data: res.data, repo: routeName })
        } catch (errorMsg) {
          setIsLoading(false)
          Alert.alert(...errorMsg)
        }
      }

      //TESTING FUNCTION
      const logRecent = async () => {
        const res = await getRepoHistory()
        console.log('repo history:', res)
      }

      const goToGazers = async () => !isLoading && (await validateAndRedirect())
      const goToRecent = () => !isLoading && navigation.navigate('recent')

      //made for AnimatedButton reusability

      return (
        <SafeAreaView
          style={[
            { marginTop: StatusBar.currentHeight || 0 },
            tw`flex flex-col items-center justify-center bg-gray-800 h-full  `,
          ]}>
          <Text style={styles.title}>Stargazer</Text>

          <View style={tw`flex flex-row w-3/4 items-center justify-between`}>
            <TextInput
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
            pressFunction={logRecent}
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
