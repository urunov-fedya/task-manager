export type User = {
  id: number
  email: string
  name: string
  fullName?: string
  password?: string
  token: string
  createdAt: Date | number | string
}
