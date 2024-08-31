import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Add, { AddParams } from './screens/Add'
import Home from './screens/Home'
import Sub, { SubParams } from './screens/Sub'
import Mul, { MulParams } from './screens/Mul'
import Div, { DivParams } from './screens/Div'
import * as Linking from 'expo-linking'

const prefix = Linking.createURL('/')

export type RootStackParamList = {
  Home: undefined
  Add: AddParams
  Sub: SubParams
  Mul: MulParams
  Div: DivParams
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  const linking = {
    prefixes: [prefix, 'calc://'],
    config: {
      screens: {
        Home: {
          path: 'home'
        },
        Add: {
          path: 'add/:sum',
          parse: {
            sum: (sum: string) => parseInt(sum),
          }
        },
        Sub: {
          path: 'sub/:diff',
          parse: {
            diff: (diff: string) => parseInt(diff)
          }
        },
        Mul: {
          path: 'mul/:prod',
          parse: {
            prod: (prod: string) => parseInt(prod)
          }
        },
        Div: {
          path: 'div/:quot',
          parse: {
            quot: (quot: string) => parseInt(quot)
          }
        }
      }
    }
  }

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Add' component={Add} />
        <Stack.Screen name='Sub' component={Sub} />
        <Stack.Screen name='Mul' component={Mul} />
        <Stack.Screen name='Div' component={Div} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

