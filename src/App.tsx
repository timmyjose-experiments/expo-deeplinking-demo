import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Add, { AddParams } from './screens/Add'
import Home from './screens/Home'
import Sub, { SubParams } from './screens/Sub'
import Mul, { MulParams } from './screens/Mul'
import Div, { DivParams } from './screens/Div'

export type RootStackParamList = {
  Home: undefined
  Add: AddParams
  Sub: SubParams
  Mul: MulParams
  Div: DivParams
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <NavigationContainer>
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

