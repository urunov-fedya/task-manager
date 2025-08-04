export type TParams = Partial<{ page: number; limit: number } & Record<string, unknown>>
export type TMeta = {
  total_items: number
  total_pages: number
  current_page: number
  per_page: number
  remaining_count: number
}
