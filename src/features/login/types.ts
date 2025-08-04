import type { User } from '@entities'

export type TLoginResponse = {
  data: TLoginData
  token: string
}

export type TLoginData = Omit<User, 'password' | 'token'>
