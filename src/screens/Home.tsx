import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { View, StyleSheet, Pressable, TextInput, Text } from 'react-native'
import { RootStackParamList } from '../App'
import { useState } from 'react'

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Enter the first number'
        value={x.toString()}
        onChangeText={text => {
          const parsedX = parseInt(text)
          setX(parsedX)
        }}
      />
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Enter the second number'
        value={y.toString()}
        onChangeText={text => {
          const parsedY = parseInt(text)
          setY(parsedY)
        }}
        />

      <View style={styles.buttonStack}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Add', { x, y })}>
          <Text>Add</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Sub', { x, y })}>
          <Text>Sub</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Mul', { x, y })}>
          <Text>Mul</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Div', { x, y })}>
          <Text>Div</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    margin: 5,
    width: '80%',
    height: 40,
  },
  buttonStack: {
    flexDirection: 'row'
  },
  button: {
    backgroundColor: 'lightblue',
    margin: 10,
    padding: 10,
    borderRadius: 3
  }
})

export default Home