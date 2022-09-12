import { Image, StyleSheet, Text, View } from 'react-native'

import tw from 'twrnc'

export default gazerCard = ({ login, avatar }) => {
  return (
    <View style={tw`bg-gray-700 p-4 my-2 rounded-md flex flex-row`}>
      <Image style={tw`aspect-square rounded-full`} source={{ uri: avatar }} />
      <Text style={styles.text}>{login}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  text: { marginLeft: 15, fontSize: 22, color: 'gray' },
})
