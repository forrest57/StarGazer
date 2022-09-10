import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native'
import tw from 'twrnc'
import AnimatedButton from '../components/animatedButton'
import GazerCard from '../components/gazerCard'

export default Home = () => {
  // const data = [
  //   { id: 1, text: 'loremipsum' },
  //   { id: 5, text: 'loremipsum' },
  //   { id: 3, text: 'loremipsum' },
  //   { id: 2, text: 'loremipsum' },
  //   { id: 4, text: 'loremipsum' },
  //   { id: 6, text: 'loremipsum' },
  //   { id: 7, text: 'loremipsum' },
  //   { id: 8, text: 'loremipsum' },
  //   { id: 9, text: 'loremipsum' },
  //   { id: 10, text: 'loremipsum' },
  // ]
  const [repo, setRepo] = useState('')
  const [user, setUser] = useState('')
  //required in order to not have to destructure props multiple times
  const cardRenderer = ({ item }) => <GazerCard text={item.text} />

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
          style={[tw` w-5/12 p-3 bg-gray-700  rounded-md`, styles.TextInput]}
          placeholder='User'
          placeholderTextColor={'gray'}
          onChangeText={(newUser) => setUser(newUser)}
        />
        <Text style={[{ fontSize: 46, color: 'gray' }, tw`w-1/12 `]}>/</Text>
        <TextInput
          cursorColor='white'
          style={[tw` w-5/12 p-3 bg-gray-700  rounded-md`, styles.TextInput]}
          placeholder='Repo'
          onChangeText={(newRepo) => setRepo(newRepo)}
          placeholderTextColor={'gray'}
        />
      </View>
      <AnimatedButton text={'Look gazers up'} />
      <AnimatedButton text={'Recent repos'} />
      {/* <Animated.View style={[{ transform: [{ scale }] }, tw`w-3/4 my-2 flex `]}>
        <Pressable
          activeOpacity={1}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={onPress}
          style={tw`bg-gray-700 p-2 w-full rounded-md flex items-center`}>
          <Text style={styles.buttonText}>let's gooo</Text>
        </Pressable>
      </Animated.View> */}
      {/* <View style={tw`flex flex-row bg-gray-700 p-1  m-2 mt-7 rounded-md`}>
        <TextInput
          autoFocus={true}
          cursorColor='white'
          style={[tw`  w-6/7 p-3`, { fontSize: 28, color: 'white' }]}
          placeholder='User/repo'
        />
        <Pressable style={tw` flex items-center justify-center flex-1`}>
          <FontAwesome name='search' size={32} color='gray' />
        </Pressable>
      </View>
      <FlatList
        data={data}
        renderItem={cardRenderer}
        keyExtractor={(item) => item.id}
      /> */}
      <StatusBar style='auto' />
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
