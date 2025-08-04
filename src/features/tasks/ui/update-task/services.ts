import type { Task } from '@entities'
import { apiService } from '@api'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { TTaskSchema } from '../../model'

export const useUpdateTask = () => {
  const queryClient = useQueryClient()
  return useMutation<Task, Error, TTaskSchema & Pick<Task, 'id'>>({
    mutationFn: ({ id, ...task }) => apiService.patch(`/tasks/${id}`, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
