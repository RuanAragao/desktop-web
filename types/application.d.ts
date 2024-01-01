type Application = {
  name: string
  version: string
  author: string
  description: string
  main: string
  icon: string
  slug: string
  app?: () => Promise<typeof import('*.vue')>
  command?: string
  pid?: number
  windowSize?: {
    width: number
    height: number
  }
}

declare function defineApplication(app: Application): Application

export { type Application, defineApplication }
