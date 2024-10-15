export interface APIResponse {
  errors?: Array<APIErrors>
  data?: any
}

interface APIErrors {
  status: number
  title: string
  detail: string
}