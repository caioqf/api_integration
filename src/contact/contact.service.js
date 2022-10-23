export default class ContactService {

  constructor(hubspotClient, sheetsService) {
    this.hubspotClient = hubspotClient
    this.sheetService = sheetsService
  }
  async getContacts() {

    try {
      const apiResponse = await this.hubspotClient.crm.contacts.getAll();

      return apiResponse

    } catch (e) {

      console.log(e);

      return {
        status: 400,
        message: "Erro ao obter contato."
      }

    }

  }

  async saveContact(contactData) {

    try {

      const SimplePublicObjectInput = { properties: contactData };

      const apiResponse = await this.hubspotClient.crm.contacts.basicApi.create(SimplePublicObjectInput);

      return apiResponse

    } catch (e) {
      return {
        status: e.code,
        message: e.body.message
      }

    }

  }

  async import(sheetId) {
    try {
      const sheet = await this.sheetService.getSheet(sheetId)
      const parsedSheet = await this.sheetService.parseSheet(sheet.values)
      let errors = []

      for (let contact of parsedSheet) {
        const saved = await this.saveContact(contact)

        // adicionando contatos ja cadastrados anteriormente num array para informar 
        if (saved.status === 409) {
          errors.push(contact)
        }
      }

      if (errors.length > 0) {
        return {
          status: 400,
          message: 'Could not save the following repeated contacts',
          data: errors
        }
      }

      return {
        status: 200,
        message: 'Saved.'
      }

    } catch (error) {
      return {
        status: 500,
        message: 'Unexpected error.'
      }
    }
  }
}