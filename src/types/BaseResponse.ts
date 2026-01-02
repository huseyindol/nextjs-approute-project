export enum BaseErrorCode {
  AUTHENTICATION_FAILED = 'Authentication failed',
  BAD_CREDENTIALS = 'Invalid username/email or password',
  ACCOUNT_DISABLED = 'User account is disabled',
  ACCOUNT_LOCKED = 'User account is locked',
}

export interface BaseResponse<T> {
  data: T
  message: string | null
  result: boolean | false
  errorCode: BaseErrorCode
  error: string
  status: number
}

export interface SeoInfo {
  id: string
  title: string
  description: string
  keywords: string
  canonicalUrl: string
  noIndex: boolean
  noFollow: boolean
}

export enum ComponentTypeEnum {
  BANNER = 'banner',
  WIDGET = 'widget',
}

export enum WidgetTypeEnum {
  BANNER = 'banner',
  POST = 'post',
}

export interface Banner {
  id: string
  title: string
  altText: string
  image: string
  link: string
  target: string
  type: string
  orderIndex: number
  status: boolean
}

export interface Post {
  id: string
  title: string
  content: string
  slug: string
  status: boolean
  orderIndex: number
  seoInfo: SeoInfo
}

export interface Widget {
  id: string
  name: string
  description: string
  type: WidgetTypeEnum
  content: string
  orderIndex: number
  status: boolean
  banners: Banner[]
  posts: Post[]
}

export interface Component {
  id: string
  name: string
  description: string
  type: ComponentTypeEnum
  content: string
  orderIndex: number
  status: boolean
  pageIds: number[]
  banners: Banner[]
  widgets: Widget[]
}

export interface Page {
  id: string
  title: string
  description: string
  slug: string
  status: boolean
  seoInfo: SeoInfo
  components: Component[]
}
export type PageResponseType = BaseResponse<Page>
export type PageListResponseType = BaseResponse<Page[]>
export type ComponentResponseType = BaseResponse<Component>
export type ComponentListResponseType = BaseResponse<Component[]>
