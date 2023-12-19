/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */
const nodemailer = require('nodemailer')
import { validate } from 'email-validator'

const host = process.env.SMTP.HOST
const port = process.env.SMTP.PORT
const user = process.env.SMTP.USER
const pass = process.env.SMTP.PASSWORD

export default async function sendEmail(req, res) {
  const { name, description, email } = req.body

  const transporter = nodemailer.createTransport({
    port,
    host,
    auth: { user, pass },
    secure: true,
  })

  const mailOption = {
    from: {
      name: `${process.env.COMPANY}`,
      address: `${user}`,
    },
    to: {
      name,
      address: `${email}`,
    },
    subject: `Convite ${process.env.COMPANY}`,
    html: description,
  }

  let info = await transporter.sendMail(mailOption)

  res.status(200).json({ messageId: info.messageId })
}
