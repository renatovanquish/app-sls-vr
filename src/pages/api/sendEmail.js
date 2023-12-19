/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */
const nodemailer = require('nodemailer')
import { validate } from 'email-validator'

const host = process.env.SMTP.HOST
const port = process.env.SMTP.PORT
const user = process.env.SMTP.USER
const pass = process.env.SMTP.PASSWORD

export default async function sendEmail(req, res) {
  const { name, email, phone, type, message, subject, emailTo } = req.body

  const transporter = nodemailer.createTransport({
    port,
    host,
    auth: { user, pass },
    secure: true,
  })

  let to = ''
  if (!emailTo) {
    to = user
  } else {
    emailTo.split(',').map((eml) => {
      if (eml && validate(eml.trim().toLowerCase())) {
        if (to) {
          to = to + ','
        }
        to = to + eml.trim().toLowerCase()
      }
    })
  }

  let html = '<div>'
  html = html + `Nome: ${name}<br />`
  html = html + `Email: ${email}<br />`
  html = html + `Celular: ${phone}<br />`
  if (type) {
    html = html + `Tipo: ${type}<br />`
  }
  html = html + `Mensagem:<br />${message}`
  html = html + '</div>'

  const mailOption = {
    from: `${email}`,
    to: to.indexOf(',') == -1 ? to : to.split(','),
    subject,
    html,
  }

  let info = await transporter.sendMail(mailOption)

  res.status(200).json({ messageId: info.messageId })
}
