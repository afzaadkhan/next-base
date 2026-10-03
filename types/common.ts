export type Primitive = string | number | boolean | bigint | symbol | null | undefined

export type Nullable<T> = T | null

export type Optional<T> = T | undefined

export type ValueOf<T> = T[keyof T]

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RecordValues<T extends Record<string, unknown>> = ValueOf<T>

export type ApiListResponse<T> = {
  data: T[]
  meta: {
    total: number
    page: number
    pageSize: number
  }
}

export type ApiItemResponse<T> = {
  data: T
}