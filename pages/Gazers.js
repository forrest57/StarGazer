import { Alert, FlatList, SafeAreaView } from 'react-native'
import { useEffect, useState } from 'react'

import GazerCard from '../components/GazerCard'
import NavBar from '../components/NavBar'
import NoGazers from '../components/NoGazers'
import { StatusBar } from 'expo-status-bar'
import { loadNextPage } from '../sharedLogic/apiManager'
import tw from 'twrnc'

const cardRenderer = ({ item }) => (
  <GazerCard login={item.login} avatar={item.avatar_url} />
)

export default Gazers = ({ navigation, route }) => {
  const [repos, setRepos] = useState(route.params.data)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  //when when no more pages can be found,
  //it stays in a constant loading state, thus not rendering more.
  const loadNew = async () => {
    setIsLoading(true)
    try {
      const res = await loadNextPage(route.params.repo, currentPage)
      if (res.data.length) {
        console.log(res.data)
        setRepos([...repos, ...res.data])
        setIsLoading(false)
      }
    } catch (err) {
      Alert.alert(...err)
    }
  }

  useEffect(() => {
    loadNew()
    console.log('page:', currentPage) //side effect will run on each currentPage update
  }, [currentPage])

  const tryFetchMore = () => !isLoading && setCurrentPage(currentPage + 1)

  const LoadingMoreComponent = () => <GazerCard login={'loading more...'} />

  const CustomFlatList = () => (
    <FlatList
      style={tw`w-full px-5 `}
      data={repos}
      renderItem={cardRenderer}
      keyExtractor={(item) => item.id}
      onEndReached={tryFetchMore}
      onEndReachedThreshold={0.2}
      refreshing={isLoading}
      ListFooterComponent={LoadingMoreComponent}
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
