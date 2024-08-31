// Simulating an SDK library
import * as Linking from 'expo-linking'

export enum Operation {
  Add,
  Sub,
  Mul,
  Div
}

interface ExecuteParams {
  callbackUrl: string
  oper: Operation
  onSuccess: (res: number) => void
  onError: (err: any) => void
}

export class SDK {
  private lhs: number
  private rhs: number

  constructor() {
    this.lhs = this.rhs = 0
  }

  setLhs = (lhs: number) => {
    this.lhs = lhs
  }

  setRhs = (rhs: number) => {
    this.rhs = rhs
  }

  private sleep = async (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private getRandomMs = (low: number, high: number) => {
    return Math.floor(Math.random() * (high - low + 1)) + low
  }

  execute = async ({ callbackUrl, oper, onSuccess, onError} : ExecuteParams) => {
    await this.sleep(this.getRandomMs(1000, 5000))

    await Linking.openURL(callbackUrl)

    switch (oper) {
      case Operation.Add:
        onSuccess(this.lhs + this.rhs)
        break
      case Operation.Sub:
        onSuccess(this.lhs - this.rhs)
        break
      case Operation.Mul:
        onSuccess(this.lhs * this.rhs)
        break
      case Operation.Div:
        if (this.rhs === 0) {
          onError('Cannot divide by zero')
        } else {
          onSuccess(this.lhs / this.rhs)
        }
        break
    }
  }
}