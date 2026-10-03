export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export type ApiErrorBody = {
  message: string
  code?: string
  errors?: Record<string, string[]>
}

export type ApiErrorPayload = {
  status: number
  statusText: string
  body: ApiErrorBody | null
}

export type RequestOptions = {
  method?: HttpMethod
  body?: unknown
  query?: Record<string, string | number | boolean | undefined | null>
  headers?: Record<string, string>
  signal?: AbortSignal
  next?: { revalidate?: number | false; tags?: string[] }
}

export type QueryKey<TArgs extends readonly unknown[] = readonly []> = readonly [
  string,
  ...TArgs,
]

export type ClientConfig = {
  baseUrl: string
  defaultHeaders?: Record<string, string>
  timeoutMs?: number
  retries?: number
}