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
  const [repos, setRepos] = useState({ data: route.params.data })
  const [currentPage, setCurrentPage] = useState({ value: 1 })
  const [isLoading, setIsLoading] = useState(false)

  //when when no more pages can be found, or an error is thrown
  //it stays in a constant loading state, thus not rendering more.
  const loadNew = async () => {
    setIsLoading(true)
    try {
      const res = await loadNextPage(route.params.repo, currentPage.value)
      if (res.data.length) {
        //tried this, to force no shallow equality of keys, in order to rerender, but to no avail
        // const data = {
        //   data: [...repos.data, ...res.data].map((item) => (
        //     {id:item.id+1,avatar_url:item.avatar_url,login:item.login}
        //     )),
        // }
        setRepos((oldRepos) => ({ data: [...oldRepos.data, ...res.data] }))
        setIsLoading(false)
        //still sometimes renders 2x the same gazer, maybe an observable would fix this
      } else {
        return
      }
    } catch (err) {
      Alert.alert(...err)
    }
  }

  useEffect(() => {
    //side effect will run on each currentPage update
    !isLoading && loadNew()
  }, [currentPage.value])

  const tryFetchMore = () => {
    return !isLoading && setCurrentPage({ value: currentPage.value + 1 })
  }

  const LoadingMoreComponent = () =>
    isLoading && <GazerCard login={'loading more...'} />

  return (
    <SafeAreaView
      style={[
        { marginTop: StatusBar.currentHeight || 0 },
        tw`flex flex-col justify-between bg-gray-800 pt-7 h-full w-full `,
      ]}>
      <NavBar navigation={navigation} barText={route.params.repo} />
      {repos.data.length ? (
        <FlatList //i wanted to take it outside of here, but it gives re-rendering problems
          testID='List'
          style={tw`w-full px-5 `}
          data={repos.data}
          renderItem={cardRenderer}
          keyExtractor={(item, index) => String(index)} //only way to make it fail gracefully, instead of using index
          onEndReached={tryFetchMore}
          onEndReachedThreshold={1}
          refreshing={isLoading}
          ListFooterComponent={LoadingMoreComponent}
        />
      ) : (
        <NoGazers />
      )}
      <StatusBar style='light' />
    </SafeAreaView>
  )
}
