import fetch from 'node-fetch'

export default async function handler(req, res) {
  try {
    let { params } = req.query
    
    const url = `${process.env.PAGARME_API}/${params.join('/')}`
    const secretKey = Buffer.from(`${process.env.PAGARME_SECRET_KEY}:`).toString('base64')
    const publicKey = Buffer.from(`${process.env.PAGARME_PUBLIC_KEY}:`).toString('base64')

    console.log(url)
    
    var options = {
      method: req.method,
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${secretKey}`,
      },
      body: JSON.stringify(req.body ? req.body : {}) 
    }

    const response = await fetch(url, options)
    const data = await response.json()
    res.status(200).json({data})
  } catch (error) {
    res.status(500).json(error)
  }
}
