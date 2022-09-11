import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, FlatList } from 'react-native'
import tw from 'twrnc'
import GazerCard from '../components/gazerCard'
import NavBar from '../components/navBar'

const cardRenderer = ({ item }) => (
  <GazerCard login={item.login} avatar={item.avatar_url} />
)

export default Gazers = ({ navigation, route }) => {
  //required for list rendering

  return (
    <SafeAreaView
      style={[
        { marginTop: StatusBar.currentHeight || 0 },
        tw`flex flex-col justify-between bg-gray-800 pt-7 h-full w-full `,
      ]}>
      <NavBar navigation={navigation} barText={route.params.repo} />
      {/* <View
        style={[
          tw`flex flex-row items-center p-1 w-full  px-5 mb-3 rounded-md`,
          { justifyContent: 'space-between' },
        ]}>
        <AnimatedButton Component={chevronLeftIcon} pressFunction={goHome} />
        <Text style={{ fontSize: 20, color: 'gray' }}>{route.params.repo}</Text>
        <AnimatedButton Component={gearIcon} pressFunction={goToSettings} />
      </View> */}
      <FlatList
        style={tw`w-full px-5`}
        data={route.params.data}
        renderItem={cardRenderer}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}
