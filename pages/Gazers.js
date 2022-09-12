import { FlatList, SafeAreaView } from 'react-native'

import GazerCard from '../components/GazerCard'
import NavBar from '../components/NavBar'
import NoGazers from '../components/NoGazers'
import { StatusBar } from 'expo-status-bar'
import tw from 'twrnc'
import { useState } from 'react'

const cardRenderer = ({ item }) => (
  <GazerCard login={item.login} avatar={item.avatar_url} />
)

export default Gazers = ({ navigation, route }) => {
  const [repos, setRepos] = useState(route.params.data) //refactored to stateful for scrollDown rendering
  const CustomFlatList = () => (
    <FlatList
      style={tw`w-full px-5 `}
      data={repos}
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
      {repos.length ? <CustomFlatList /> : <NoGazers />}
      <StatusBar style='light' />
    </SafeAreaView>
  )
}
