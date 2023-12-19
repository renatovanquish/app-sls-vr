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
    res.status(200).json({})
    return null 
    
    await transporter.sendMail({
      from: `${user}`,
      to: 'renato@vanquish.com.br',
      subject: `API HOTMART BODY - ${process.env.COMPANY}`,
      html: JSON.stringify({
        body: req.body,
      }),
    })

    if (req && req.body && req.body.hottok === process.env.HOTMART_HOTTOK) {
      const { relationID } = req.query
      const { status, email, name, phone_local_code, phone_number, doc_type, doc } = req.body
      const phone = phone_local_code && phone_number ? `+55${phone_local_code}${phone_number}` : ''
      const cpf = doc_type == 'CPF' && doc ? doc : ''

      if (email && status == 'approved') {
        const {
          data: { getUserByEmail },
        } = (await API.graphql({
          query: queries.getUserByEmail,
          variables: { email },
          authMode: GRAPHQL_AUTH_MODE.API_KEY,
        }))

        let userID = getUserByEmail.items.length > 0 ? getUserByEmail.items[0].id : ''

        if (!userID) {
          const {
            data: { adminCreateUser },
          } = (await API.graphql({
            query: mutations.adminCreateUser,
            variables: {
              name,
              email: email.trim().toLowerCase(),
              phone: null,
              messageAction: null,
              passwordLength: process.env.PASSWORD_LENGTH,
            },
            authMode: GRAPHQL_AUTH_MODE.API_KEY,
          }))

          userID = adminCreateUser.substr(4, adminCreateUser.length - 5)

          if (userID) {
            await API.graphql({
              query: mutations.createUser,
              variables: {
                input: {
                  id: userID,
                  name,
                  email: email.trim().toLowerCase(),
                  phone,
                  status: 'PREREGISTER',
                  active: false,
                  search: name.toLowerCase()
                }
              },
              authMode: GRAPHQL_AUTH_MODE.API_KEY,
            })

            await API.graphql({
              query: mutations.createProfile,
              variables: {
                input: {
                  userID,
                  gender: 'UNKNOWN',
                  doc: cpf,
                  docType: 'CPF'
                },
              },
              authMode: GRAPHQL_AUTH_MODE.API_KEY,
            })
          }
        }

        if (userID) {
          let {
            data: { getRelation },
          } = (await API.graphql({
            query: queries.getRelation,
            variables: { id: relationID.toString() },
            authMode: GRAPHQL_AUTH_MODE.API_KEY,
          }))

          if (getRelation && getRelation.id) {
            const {
              data: {
                listRelationsLinkByRelationUser: { items, nextToken },
              },
            } = (await API.graphql({
              query: queries.listRelationsLinkByRelationUser,
              variables: {
                relationID: getRelation.id,
                userID: { eq: userID }
              },
              authMode: GRAPHQL_AUTH_MODE.API_KEY,
            }))

            if (items.length === 0) {
              await API.graphql({
                query: mutations.createRelationLink,
                variables: {
                  input: {
                    userID,
                    relationID: getRelation.id,
                    type: getRelation.type,
                    notify: 0,
                  }
                },
                authMode: GRAPHQL_AUTH_MODE.API_KEY,
              })
            }

            if (getRelation.members.indexOf(userID) === -1) {
              getRelation.members.push(userID)
              await API.graphql({
                query: mutations.updateRelation,
                variables: {
                  input: {
                    id: getRelation.id,
                    mode: getRelation.mode,
                    members: getRelation.members,
                    status: getRelation.status,
                  }
                },
                authMode: GRAPHQL_AUTH_MODE.API_KEY,
              })
            }

            await transporter.sendMail({
              from: `${user}`,
              to: 'renato@vanquish.com.br',
              subject: `API HOTMART - ${process.env.COMPANY}`,
              html: JSON.stringify({
                relationID: getRelation.id,
                email,
                name,
                userID,
                body: req.body,
              }),
            })
            res.status(200).json({})
          } else {
            res.status(200).json({})
          }
        } else {
          res.status(200).json({})
        }
      } else {
        await transporter.sendMail({
          from: `${user}`,
          to: 'renato@vanquish.com.br',
          subject: `API HOTMART 1 - ${process.env.COMPANY}`,
          html: JSON.stringify({
            status, email,
            body: req.body,
          }),
        })
        res.status(200).json({})
      }

    } else {
      await transporter.sendMail({
        from: `${user}`,
        to: 'renato@vanquish.com.br',
        subject: `API HOTMART 2 - ${process.env.COMPANY}`,
        html: JSON.stringify({
          body: req.body,
        }),
      })
      res.status(200).json({})
    }


  } catch (error) {
    if (error) {
      await transporter.sendMail({
        from: `${user}`,
        to: 'renato@vanquish.com.br',
        subject: `API HOTMART ERROR - ${process.env.COMPANY}`,
        html: JSON.stringify({
          error,
          body: req.body,
        }),
      })
    }
    res.status(200).json({})
  }
}