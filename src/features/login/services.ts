import { useMutation } from '@tanstack/vue-query'
import { apiService } from '@api'
import type { TFormSchemaType } from './schema'
import type { TLoginResponse } from './types'

export const useLogin = () => {
  return useMutation<TLoginResponse, Error, TFormSchemaType>({
    mutationFn: data => apiService.post('/auth', data).then(res => res.data),
  })
}
