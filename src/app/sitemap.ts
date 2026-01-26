import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.cryptik.tech'
  const currentDate = new Date().toISOString()
  
  const routes = [
    '',
    '/dashboard',
    '/technical',
    '/team',
    '/security',
    '/catalog',
    '/resources',
    '/resources/blog',
    '/resources/white-papers',
    '/resources/use-cases',
    '/resources/knowledge-base',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
