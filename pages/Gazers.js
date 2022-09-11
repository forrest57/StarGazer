import { FlatList, SafeAreaView } from 'react-native'

import GazerCard from '../components/GazerCard'
import NavBar from '../components/NavBar'
import NoGazers from '../components/NoGazers'
import { StatusBar } from 'expo-status-bar'
import tw from 'twrnc'

const cardRenderer = ({ item }) => (
  <GazerCard login={item.login} avatar={item.avatar_url} />
)

export default Gazers = ({ navigation, route }) => {
  //required for list rendering
  console.log(route.params.data.length)
  const CustomFlatList = () => (
    <FlatList
      style={tw`w-full px-5 `}
      data={route.params.data}
      renderItem={cardRenderer}
      keyExtractor={(item) => item.id}
    />
  )
  return (
    <SafeAreaView
      style={[
        { marginTop: StatusBar.currentHeight || 0 },
        tw`flex flex-col justify-between bg-gray-800 pt-7 h-full w-full `,
      ]}>
      <NavBar navigation={navigation} barText={route.params.repo} />
      {route.params.data.length ? <CustomFlatList /> : <NoGazers />}
    </SafeAreaView>
  )
}
