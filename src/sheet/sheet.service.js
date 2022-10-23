import { google } from 'googleapis';


export default class sheetService {

  async getSheet(sheetId) {

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

    const sheets = google.sheets({
      auth,
      version: 'v4'
    });

    try {
      const sheet = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Página1'
      })

      return sheet.data

    } catch (error) {
      console.log(error);
    }

  }

  async parseSheet(sheetData) {

    try {

      sheetData = sheetData.slice(1)
      let contacts = []

      for (let row of sheetData) {
        const obj = {
          company: row[0],
          firstname: row[1].split(' ')[0],
          lastname: row[1].split(' ')[1],
          email: row[2],
          phone: row[3],
          website: row[4]
        }
        contacts.push(obj)
      }

      return contacts

    } catch (error) {

      console.log(error);
    }
  }
}