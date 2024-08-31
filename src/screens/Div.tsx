import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { RootStackParamList } from '../App'

export interface DivParams {
  quot: number
}

const Div = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const route = useRoute<RouteProp<RootStackParamList, 'Div'>>()
  const { quot } = route.params || {}

  return (
    <View style={styles.container}>
      <Text>Quotient: {quot} </Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text> Go Home</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'lightblue',
    margin: 10,
    padding: 10,
    borderRadius: 3
  }
})

export default Div
