/* eslint-disable import/no-anonymous-default-export */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200
  // const r = await fetch('https://fwsl0j0p04.execute-api.us-east-1.amazonaws.com/scan')
  // const data = await r.json()
  res.status(200).json({ app: 'app' })
}
