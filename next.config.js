

/** @type {import('next').NextConfig} */

const runtimeCaching = require('next-pwa/cache')
// runtimeCaching[0].handler = 'StaleWhileRevalidate'
// runtimeCaching[0].urlPattern = redirect.destination

const withPWA = require('next-pwa')({
  disable: false,
  register: true,
  dest: 'public',
  runtimeCaching,
})

const redirect = {
  source: '/',
  destination: '/page/home/',
  permanent: true,
}

const settings = {
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  images: {
    domains: [
      'd1fokz5gyb0rt6.cloudfront.net',
      'd32ks7xktgi6v0.cloudfront.net',
      'dwmmakpya687s.cloudfront.net',
      'd3adpvgoxs0ne.cloudfront.net',
      'images.unsplash.com',
      'dev.voceradiologista.com.br',
      'voceradiologista.com.br',
      'appsls35b3bdc71fa2449bb5d2de82371b2eaf121447-dev.s3.us-east-1.amazonaws.com',
      'appsls35b3bdc71fa2449bb5d2de82371b2eaf84656-master.s3.us-east-1.amazonaws.com',
      'app-sls-orcuymrkk-rtcj.vercel.app'
    ],
  },
  env: {
    COMPANY: 'VR Cursos',
    URL: 'https://dev.voceradiologista.com.br/',
    MIDIA_CLOUDFRONT: 'https://d32ks7xktgi6v0.cloudfront.net/',
    GROUPS: ['Admin', 'Professor'],
    ALLOW_LOGIN: ['EMAIL', 'PHONE'],
    DEFAULT_LOGIN: 'EMAIL',
    NO_SIGNUP_CONFIRMATION: false,
    PASSWORD_LENGTH: 6,
    FULL_WIDTH: true,
    APP_COMMERCE: true,
    PRODUCT_TYPE_DEFAULT: 'DIGITAL', // DIGITAL, DELIVERY
    MESSAGE_STATUS_DEFAULT: 'PENDING', // PENDING, APPROVED
    SCROLL_TO_TOP_IN_BOTTOM: false,
    SCHEDULED_DELIVERY: false,
    HOME: redirect.destination,
    AMPLIFY_VIDEO: true,
    SMTP: {
      HOST: 'wezen.vanquish.com.br',
      PORT: 465,
      USER: 'noreply@siteinteligente.com',
      PASSWORD: '95$zaDt1',
    },
    CRYPTO_PASS: 'eebeb3aaa8dfe480979a1947ac88f614',
    PAGARME_API: 'https://api.pagar.me/core/v5',
    PAGARME_SECRET_KEY: '',
    PAGARME_DEBIT: false,
    PAGARME_PIX: true,
    HOTMART_HOTTOK: 'kzXZ66cKBUbhAgKRpRLlZfNyZbfi49f8a8788e-08b5-41c9-9b56-5a6473e2a01a',
    ORDER_STATUS: {
      STANDBY: 'AGUARDANDO PAGTO',
      REJECTED: 'PAGTO REPROVADO',
      APPROVED: 'PEDIDO APROVADO',
      IN_PREPARATION: 'PREPARANDO PEDIDO',
      IN_TRANSIT: 'SAIU PARA ENTREGA',
      DELIVERED: 'ENTREGUE',
      CANCELED: 'CANCELADO',
    },
    RELATIONS: [
      { type: 'CONTACT', label: 'Contato', status: ['ACTIVE'], restricted: false },
      { type: 'PIPELINE', label: 'Pipeline', status: ['AGUARDANDO', 'FINALIZADO'], restricted: false },
      { type: 'COURSE', label: 'Curso', status: ['AGUARDANDO'], restricted: true },
      { type: 'EBOOK', label: 'Ebook', status: ['AGUARDANDO'], restricted: true }
    ]
  },
  async redirects() {
    return [redirect]
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.resolve.alias.canvas = false
      config.resolve.alias.encoding = false
      return config
  }
}

module.exports = withPWA(settings)
