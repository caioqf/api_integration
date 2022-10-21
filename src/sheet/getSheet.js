import { google } from 'googleapis';

export default async function getSheet(req, res) {

  //Autentica na api do google
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    },
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/spreadsheets'
    ]
  })

  // define a api que vai usar (google sheets no caso)
  const sheets = google.sheets({
    auth,
    version: 'v4'
  });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: 'Página1'
    })

    res.send(response.data)

  } catch (error) {
    console.log(error);
  }

}