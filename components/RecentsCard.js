import { View, Text, StyleSheet } from 'react-native'
import tw from 'twrnc'

export default CardComponent = ({ text }) => (
  <View
    style={tw`bg-gray-700 p-4 my-2 rounded-md flex w-full  justify-center flex-row`}>
    <Text style={styles.buttonText}>{text}</Text>
  </View>
)

const styles = StyleSheet.create({
  buttonText: {
    color: 'gray',
    fontSize: 28,
    fontWeight: 'bold',
  },
})
