import 'dotenv/config'
import express from 'express'
import getSheet from './sheet/getSheet.js'
import saveContact from './contact/saveContact.js'
import getContact from './contact/getContacts.js'
import bodyParser from 'body-parser'

const API_PORT = process.env.API_PORT

const app = express();

app.use(bodyParser.json())


app.get("/sheet", getSheet)
app.post("/contact", saveContact)
app.get("/contact", getContact)


app.listen(API_PORT, () => {
  console.log(`Listening on port ${API_PORT}`);
})

