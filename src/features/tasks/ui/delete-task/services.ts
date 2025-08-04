import { apiService } from '@api'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Task } from '@entities'

export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  return useMutation<Task, Error, Task['id']>({
    mutationFn: id => apiService.delete(`/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
