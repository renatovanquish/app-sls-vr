import Amplify from 'aws-amplify'
import awsExports from '../../../aws-exports'
Amplify.configure({ ...awsExports, ssr: true })

import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API } from 'aws-amplify'
import * as mutations from 'graphql/mutations'
import * as queries from 'graphql/queries'

const nodemailer = require('nodemailer')
const host = process.env.SMTP.HOST
const port = process.env.SMTP.PORT
const user = process.env.SMTP.USER
const pass = process.env.SMTP.PASSWORD
const transporter = nodemailer.createTransport({
  port,
  host,
  auth: { user, pass },
  secure: true,
})

export default async function handler(req, res) {
  try {
    if (req && req.body) {
      const { type, data } = req.body

      if (type === 'order.paid') {
        const { code, charges } = data

        if (charges && charges[0] && charges[0].last_transaction) {
          const { last_transaction } = charges[0]
          const { transaction_type } = last_transaction
          if (transaction_type === 'pix') {
            const {
              data: { getOrder },
            } = await API.graphql({
              query: queries.getOrder,
              variables: { id: code },
              authMode: GRAPHQL_AUTH_MODE.API_KEY,
            })

            if (getOrder && getOrder.status === 'STANDBY') {
              await API.graphql({
                query: mutations.updateOrder,
                variables: {
                  input: {
                    id: code,
                    status: 'APPROVED',
                    createdAt: getOrder.createdAt,
                  },
                },
                authMode: GRAPHQL_AUTH_MODE.API_KEY,
              })
            }
            res.status(200).json({})

          } else {
            res.status(200).json({})
          }
        } else {
          res.status(200).json({})
        }
      } else {
        res.status(200).json({})
      }
    } else {
      res.status(200).json({})
    }
  } catch (error) {
    console.log(error)
    if (error) {
      await transporter.sendMail({
        from: `${user}`,
        to: 'renato@vanquish.com.br',
        subject: `Pix ERROR - ${process.env.COMPANY}`,
        html: JSON.stringify(error),
      })
    }
  }
}
