/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */
const nodemailer = require('nodemailer')
import { validate } from 'email-validator'

const host = process.env.SMTP.HOST
const port = process.env.SMTP.PORT
const user = process.env.SMTP.USER
const pass = process.env.SMTP.PASSWORD

export default async function (req, res) {
  const { title, emailTo, data, name, email, phone } = req.body
  
  let html = ''
  html = html + `Name: ${name}<br />`
  html = html + `Email: ${email}<br />`
  html = html + `Celular: ${phone}<br />`

  data.map((f) => {
    if (f.value || f.type === 'files') {
      if (f.type === 'image' && f.link) {
        html = html + `${f.name}: <a href="${f.link}">${f.link}</a><br />`
      } else
      if (f.type === 'files' && f.files && f.files.length > 0) {
        f.files.map((file,i)=>{
          html = html + `${f.name} ${i+1}: <a href="${file.link}">${file.link}</a><br />`
        })
      } else 
      if (f.type === 'currency' && f.valueFmt) {
        html = html + `${f.name}: ${f.valueFmt}<br />`
      } else {
        html = html + `${f.name}: ${f.value}<br />`
      }
    }
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

  const transporter = nodemailer.createTransport({
    port,
    host,
    auth: { user, pass },
    secure: true,
  })

  const mailOption = {
    from: `${user}`,
    to: to.indexOf(',') == -1 ? to : to.split(','),
    subject: title,
    html,
  }

  let info = await transporter.sendMail(mailOption)

  res.status(200).json({ messageId: info.messageId })
}
