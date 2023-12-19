import awsExports from '../aws-exports'
import { Amplify, withSSRContext } from 'aws-amplify'
Amplify.configure({ ...awsExports, ssr: true })
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import * as queries from 'graphql/queries'
import { PagePriority, PageChangeFreq } from 'models'

const url = process.env.URL

export default function Sitemap() {
  return <></>
}

export async function getServerSideProps({ res }: { res: any }) {
  const SSR = withSSRContext(res)
  const {
    data: {
      listPages: { items },
    },
  } = (await SSR.API.graphql({
    query: queries.listPages,
    variables: { limit: 1000 },
    authMode: GRAPHQL_AUTH_MODE.API_KEY,
  })) as GraphQLResult<any>

  const HandleTags = (tags: string) => {
    return tags.toString()
      ? '?' +
          tags
            .toString()
            .replace(/,/g, '_')
            .replace(/ /g, '_')
            .replace(/&/g, '_')
      : ''
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${PageChangeFreq.ALWAYS}</changefreq>
    <priority>1.0</priority>
  </url>
    ${items
      .map((page: any) => {
        return `
          <url>
            <loc>${url}${url?.substr(-1) === '/' ? '' : '/'}page/${
          page.alias
        }${HandleTags(page.tags)}</loc>
            <lastmod>${page.updatedAt}</lastmod>
            <changefreq>${page.changeFreq}</changefreq>
            <priority>${
              page.priority === PagePriority.P0
                ? '0.0'
                : page.priority === PagePriority.P1
                ? '0.1'
                : page.priority === PagePriority.P2
                ? '0.2'
                : page.priority === PagePriority.P3
                ? '0.3'
                : page.priority === PagePriority.P4
                ? '0.4'
                : page.priority === PagePriority.P5
                ? '0.5'
                : page.priority === PagePriority.P6
                ? '0.6'
                : page.priority === PagePriority.P7
                ? '0.7'
                : page.priority === PagePriority.P8
                ? '0.8'
                : page.priority === PagePriority.P9
                ? '0.9'
                : '1.0'
            }</priority>
          </url>
        `
      })
      .join('')}
  </urlset>
  `

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}
