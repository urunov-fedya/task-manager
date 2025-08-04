import type { User } from '@entities'

export type TRegisterResponse = {
  data: TRegisterData
  token: string
}

export type TRegisterData = Omit<User, 'password' | 'token'>
