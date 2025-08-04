// import { toTypedSchema } from '@vee-validate/zod'
import z from 'zod'

export const formSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
})

export type TFormSchemaType = z.infer<typeof formSchema>
