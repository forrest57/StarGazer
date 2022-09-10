import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, SafeAreaView, FlatList, Text } from 'react-native'
import tw from 'twrnc'
import { Ionicons } from '@expo/vector-icons'
import { SimpleLineIcons } from '@expo/vector-icons'
import AnimatedButton from '../components/animatedButton'
import GazerCard from '../components/gazerCard'

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

export default Gazers = ({ navigation, route }) => {
  const cardRenderer = ({ item }) => (
    <GazerCard login={item.login} avatar={item.avatar_url} />
  )
  return (
    <SafeAreaView
      style={[
        { marginTop: StatusBar.currentHeight || 0 },
        tw`flex flex-col justify-between bg-gray-800 pt-7 h-full w-full `,
      ]}>
      <View
        style={[
          tw`flex flex-row items-center p-1 w-full  px-5 mb-3 rounded-md`,
          { justifyContent: 'space-between' },
        ]}>
        {/* <AnimatedButton text='srata' /> */}
        {/* <Pressable
          style={tw`bg-gray-700 flex items-center justify-center rounded-md py-2 w-1/6 `}> */}
        <AnimatedButton Component={chevronLeftIcon} />
        {/* </Pressable> */}
        <Text style={{ fontSize: 28, color: 'gray' }}>{route.params.repo}</Text>
        {/* <Pressable */}
        <AnimatedButton Component={gearIcon} />
        {/* </Pressable> */}
      </View>
      <FlatList
        style={tw`w-full px-5`}
        data={route.params.data}
        renderItem={cardRenderer}
        keyExtractor={(item) => item.id}
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
    fontSize: 36,
    color: 'gray',
    fontWeight: 'bold',
  },
})
