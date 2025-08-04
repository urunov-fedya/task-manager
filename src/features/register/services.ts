import { useMutation } from '@tanstack/vue-query'
import { apiService } from '@api'
import type { TFormSchemaType } from './schema'
import type { TRegisterResponse } from './types'

export const useRegister = () => {
  return useMutation<TRegisterResponse, Error, TFormSchemaType>({
    mutationFn: data => apiService.post('/register', data).then(res => res.data),
  })
}
