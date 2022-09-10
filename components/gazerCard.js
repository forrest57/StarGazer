import { Text, View } from 'react-native'
import tw from 'twrnc'
export default gazerCard = ({ text }) => {
  return (
    <View style={tw`bg-gray-700 p-4 m-2 rounded-md flex flex-row`}>
      <Text testID='test-cardText' style={{ fontSize: 22, color: 'gray' }}>
        {text}
      </Text>
    </View>
  )
}
