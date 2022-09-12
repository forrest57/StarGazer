import { StyleSheet, Text, View } from 'react-native'

import { FontAwesome5 } from '@expo/vector-icons'

export default NoGazers = () => (
  <View style={styles.absoluteCenter}>
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
  absoluteCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
