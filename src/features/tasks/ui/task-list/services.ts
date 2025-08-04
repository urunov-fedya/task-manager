import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query'
import { apiService } from '@api'
import { useUserStore, type Task } from '@entities'
import type { TParams, TMeta } from '@/shared/types/api.types'
import { computed, toValue } from 'vue'
import { useRoute } from 'vue-router'

export type PaginatedResponse = Record<string, unknown> & {
  items: Task[]
  meta: TMeta
}

type QueryResult<T> = T extends undefined ? Task[] : PaginatedResponse

export function useTaskList(): UseQueryReturnType<Task[], Error>
export function useTaskList<T extends TParams>(
  params: () => T
): UseQueryReturnType<PaginatedResponse, Error>

export function useTaskList<T extends TParams | undefined>(paramsGetter?: () => T) {
  const route = useRoute()
  const userStore = useUserStore()
  return useQuery<QueryResult<T>, Error>({
    queryKey: computed(() => ['tasks', toValue(paramsGetter)]),
    queryFn: async () => {
      const params = paramsGetter?.()
      return apiService
        .get('/tasks', {
          params: {
            user_id: userStore.user?.id,
            ...route.query,
            ...params,
            ...(params?.name ? { name: `*${params?.name}` } : {}),
            ...(params?.description ? { description: `*${params?.description}` } : {}),
          },
        })
        .then(res => res.data)
    },
    enabled: !!userStore.isAuthenticated,
  })
}
