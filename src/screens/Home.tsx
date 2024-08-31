import { View, StyleSheet, Pressable, TextInput, Text, Alert, ActivityIndicator } from 'react-native'
import { useEffect, useState } from 'react'
import * as Linking from 'expo-linking'
import { Operation, SDK } from '../sdk/SDK'

const SCHEME = 'calc://'

const Home = () => {
  const [sdkClient, setSDKClient] = useState<SDK | null>(null)
  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const initSDKClient = async () => {
      const client = new SDK()
      setSDKClient(client)
    }

    initSDKClient()
  }, [])

  const handleOperation = async (oper: Operation) => {
    setLoading(true)

    const callbackUrl = `${SCHEME}home`
    sdkClient?.setLhs(x)
    sdkClient?.setRhs(y)

    await sdkClient?.execute({
      callbackUrl, 
      oper,
      onSuccess: (res) => {
        setLoading(false)
        switch (oper) {
          case Operation.Add:
            Linking.openURL(`${SCHEME}add/${res}`)
            break
          case Operation.Sub:
            Linking.openURL(`${SCHEME}sub/${res}`)
            break
          case Operation.Mul:
            Linking.openURL(`${SCHEME}mul/${res}`)
            break
          case Operation.Div:
            Linking.openURL(`${SCHEME}div/${res}`)
            break
        }
      },
      onError: (err) => {
        setLoading(false)
        Alert.alert(`Error: ${err}`)
      }
    })
  }

  return (
    <View style={styles.container}>
      {!loading && (
        <>
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            placeholder='Enter the first number'
            value={x.toString()}
            onChangeText={text => {
              const parsedX = parseInt(text)
              if (text === '' || isNaN(parsedX)) {
                setX(0)
              } else {
                setX(parsedX)
              }
            }}
          />
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            placeholder='Enter the second number'
            value={y.toString()}
            onChangeText={text => {
              const parsedY = parseInt(text)
              if (text === '' || isNaN(parsedY)) {
                setY(0)
              } else {
                setY(parsedY)
              }
            }}
            />

          <View style={styles.buttonStack}>
            <Pressable style={styles.button} onPress={() => handleOperation(Operation.Add)}>
              <Text>Add</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => handleOperation(Operation.Sub)}>
              <Text>Sub</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => handleOperation(Operation.Mul)}>
              <Text>Mul</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => handleOperation(Operation.Div)}>
              <Text>Div</Text>
            </Pressable>
          </View>
          </>
      )}

      {loading && (
        <View style={styles.spinner}>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      )}
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
  },
  spinner: {
    marginTop: 20
  }
})

export default Home