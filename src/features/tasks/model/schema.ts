import { z } from 'zod'

export const taskSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  status: z.enum(['pending', 'inProgress', 'completed']),
  deadline: z.string(),
})

export type TTaskSchema = z.infer<typeof taskSchema>
