import { Text, Animated, Pressable, StyleSheet } from 'react-native'
import tw from 'twrnc'
export default AnimatedButton = ({ text }) => {
  const animation = new Animated.Value(0)
  const inputRange = [0, 1]
  const outputRange = [1, 0.95]
  const scale = animation.interpolate({ inputRange, outputRange })

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
      // bounciness: 200,
    }).start()
  }
  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
      tension: 200,
      // bounciness: 200,
    }).start()
  }
  const onPress = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
      delay: 0.75,
      tension: 200,
      // bounciness: 200,
    }).start()
  }
  return (
    <Animated.View style={[{ transform: [{ scale }] }, tw`w-3/4 mt-2 flex `]}>
      <Pressable
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        style={tw`bg-gray-700 p-2 w-full rounded-md flex items-center`}>
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  buttonText: {
    fontSize: 32,
    color: 'gray',
    fontWeight: 'bold',
  },
})
