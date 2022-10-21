import 'dotenv/config'
import express from 'express'
import getSheet from './sheet/getSheet.js'
import saveContact from './contact/saveContact.js'

const API_PORT = process.env.API_PORT
const app = express();

app.get("/getSheet", getSheet)
app.post("/contact", saveContact)


app.listen(API_PORT, () => {
  console.log(`Listening on port ${API_PORT}`);
})

