import postmark from 'postmark'

export default async function(req, res) {
    const client = new postmark.ServerClient(process.env.POSTMARK);
    console.log(req.body)
    try {
       await client.sendEmail(req.body).then(() => {
        res.status(200).send('Message sent successfully.')

       })
    } catch (error) {
      console.log('ERROR', error)
      res.status(400).send('Message not sent.')
    }
  }

