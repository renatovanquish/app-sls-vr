import NextHead from 'next/head'
import { useTheme } from 'next-themes'
import config from 'config/seo.json'

interface Props {
  title?: string
  description?: string
  alias?: string
  thumbnail?: string
}

const Head = (props: Props): JSX.Element => {
  const { title, description, alias, thumbnail } = props
  const { theme } = useTheme()
  return (
    <>
      <NextHead>
        <meta charSet="utf-8" />
        <title>{`${config.title}${title ? ' - ' + title : ''}`}</title>
        <meta
          name="Description"
          content={`${description ? description : config.description}`}
        />
        <meta httpEquiv="Content-Language" content="pt-br" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="thumbnail" content={thumbnail ? `${process.env.MIDIA_CLOUDFRONT}${thumbnail}` : `${process.env.URL}icons/256x256-icon.png`} />
        <link itemProp="thumbnailUrl" href={thumbnail ? `${process.env.MIDIA_CLOUDFRONT}${thumbnail}` : `${process.env.URL}icons/256x256-icon.png`} />
        <link rel="icon" type="image/png" href="/icons/16x16-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icons/192x192-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/icons/57x57-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/icons/60x60-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/icons/72x72-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/icons/76x76-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/icons/114x114-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/icons/120x120-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/icons/144x144-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/152x152-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/180x180-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/32x32-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/icons/96x96-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/16x16-icon.png"
        />

        <meta
          name="theme-color"
          content={theme === 'dark' ? '#282a36' : '#fafafa'}
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="application-name"
          content={`${config.title}${title ? ' - ' + title : ''}`}
        />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="default"
        />
        <meta
          name="apple-mobile-web-app-title"
          content={`${config.title}${title ? ' - ' + title : ''}`}
        />
        <link rel="apple-touch-icon" href="/icons/192x192-icon.png" />

        <meta name="msapplication-navbutton-color" content="#fafafa" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/icons/144x144-icon.png"
        />

        <meta
          name="og:locale"
          property="og:locale"
          content="pt_BR"
          key="oglocale"
        />
        <meta
          name="og:url"
          property="og:url"
          content={`${process.env.URL}${alias ? 'page/' + alias + '/' : ''}`}
          key="ogurl"
        />
        <meta
          name="og:title"
          property="og:title"
          content={`${config.title}${title ? ' - ' + title : ''}`}
          key="ogtitle"
        />
        <meta
          name="og:description"
          property="og:description"
          content={`${description ? description : config.description}`}
          key="ogdescription"
        />
        <meta
          name="og:site_name"
          property="og:site_name"
          content={`${config.title}${title ? ' - ' + title : ''}`}
          key="ogsite_name"
        />
        <meta
          name="og:image"
          itemProp="image"
          property="og:image:secure_url"
          content={thumbnail ? `${process.env.MIDIA_CLOUDFRONT}${thumbnail}` : `${process.env.URL}icons/256x256-icon.png`}
          key="ogimage"
        />
        <meta
          name="og:image:type"
          property="og:image:type"
          content="image/png"
          key="ogimage_type"
        />
        <meta
          name="og:image:width"
          property="og:image:width"
          content="256"
          key="ogimage_width"
        />
        <meta
          name="og:image:height"
          property="og:image:height"
          content="256"
          key="ogimage_height"
        />
        <meta
          name="og:type"
          property="og:type"
          content="website"
          key="ogtype"
        />

        <link rel="manifest" href="/manifest.json" key="manifest" />
      </NextHead>
    </>
  )
}

export default Head
