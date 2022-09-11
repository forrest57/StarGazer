import { StyleSheet, Text, View } from 'react-native'

import { FontAwesome5 } from '@expo/vector-icons'
import tw from 'twrnc'

export default NoGazers = () => (
  <View style={tw`w-full h-full flex items-center justify-start pt-15`}>
    <FontAwesome5 name='sad-tear' size={150} color='#4078c0' />
    <Text style={styles.text}>No Stargazers?</Text>
  </View>
)
const styles = StyleSheet.create({
  text: {
    fontSize: 35,
    color: 'gray',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
})
