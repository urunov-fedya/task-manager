import type { Task } from '@entities'
import { apiService } from '@api'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { TTaskSchema } from '../../model'
import { useUserStore } from '@entities'

export const useCreateTask = () => {
  const userStore = useUserStore()
  const queryClient = useQueryClient()
  return useMutation<Task, Error, TTaskSchema>({
    mutationFn: task => apiService.post('/tasks', { ...task, user_id: userStore.user?.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
