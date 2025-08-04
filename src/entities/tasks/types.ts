export type Task = {
  id: number
  name: string
  description?: string
  status: 'pending' | 'inProgress' | 'completed'
  deadline: string
}
