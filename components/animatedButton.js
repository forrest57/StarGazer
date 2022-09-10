import { Text, Animated, Pressable } from 'react-native'
import tw from 'twrnc'
export default AnimatedButton = ({
  Component,
  pressFunction,
  width = 'auto',
}) => {
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
      delay: 0.15,
      tension: 200,
      // bounciness: 200,
    }).start()
    pressFunction()
  }
  return (
    <Animated.View
      style={[{ transform: [{ scale }] }, tw` mt-2 flex w-${width} `]}>
      <Pressable
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        style={tw` rounded-md flex items-center`}>
        {/* <Text style={styles.buttonText}>{text}</Text> */}
        {Component}
      </Pressable>
    </Animated.View>
  )
}
