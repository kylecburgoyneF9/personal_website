import sgMail from '@sendgrid/mail'

export default async function (req, res) {
  const data = JSON.parse(req.body)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  let msg;

  if (req?.body) {
    msg = {
      to: `${process.env.SENDGRID_TO}`, //  your recipient
      from: `${process.env.SENDGRID_FROM}`, //  your verified sender of sendgrid account
      subject: `${data.subject}`,
      html: `
        <h2>${data.name}</h2>
        <h3>${data.email}</h3>
        <h3>${data.phone}</h3>
        <p>${data.message}</p>`
    }
  }

  else {
    msg = {
      to: `${process.env.SENDGRID_TO}`, //  your recipient
      from: `${process.env.SENDGRID_FROM}`, //  your verified sender of sendgrid account
      subject: `helloo`,
      html: `
        <h2>helloo</h2>
        <h3>helloo</h3>
        <h3>helloo</h3>
        <p>helloo</p>`
    }
  }

   

  try {
    await sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
        res.status(200).send('success')
      })
      .catch((error) => {
        console.error(error)
      })
  } catch (error) {
    console.log('ERROR', error)
    res.status(400).send('error')
  }
}