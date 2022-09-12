import { Animated, Pressable } from 'react-native'

import tw from 'twrnc'

export default AnimatedButton = ({
  Component,
  pressFunction,
  width = 'auto',
}) => {
  const animation = new Animated.Value(0)
  const inputRange = [0, 1]
  const outputRange = [1, 0.95]
  const customAnimation = animation.interpolate({ inputRange, outputRange })

  //refactorable in separate file, but I feel it would just be over-engineering
  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
    }).start()
  }
  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
      tension: 200,
    }).start()
  }
  const onPress = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
      delay: 0.15,
      tension: 200,
    }).start()
    pressFunction()
  }
  return (
    <Animated.View
      style={[{ transform: [{ scale: customAnimation }] }, tw` w-${width} `]}>
      <Pressable
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        style={tw` rounded-md flex items-center`}>
        {Component}
      </Pressable>
    </Animated.View>
  )
}
