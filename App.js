import HomeScreen from './pages/Home'
import Gazers from './pages/Gazers'
// import Settings from './pages/Settings'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import tw from 'twrnc'
import Settings from './pages/Settings'
const Stack = createNativeStackNavigator()
const MyTheme = {
  dark: true,
  colors: {
    primary: '#374151',
    background: '#374151',
  },
}
export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Gazers'
          component={Gazers}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Settings'
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
