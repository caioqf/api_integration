import SheetService from "../sheet.service"

describe("Sheet Service", () => {
	const sheetService = new SheetService()

	describe("parseSheet function", () => {
		it("should parse a sheet given an array of contacst", async () => {
			//act

			const contacts = await sheetService.parseSheet([
				[
					"Nome da empresa",
					"Nome completo",
					"Email",
					"Telefone",
					"Website"
				],
				[
					"SubHpot",
					"Marcos Doe",
					"marcos@subhpot.com.br",
					"31999196707",
					"www.xyz.com"
				],
			])


			//assert

			expect(contacts).toMatchObject(
				[
					{
						company: "SubHpot",
						firstname: "Marcos",
						lastname: "Doe",
						email: "marcos@subhpot.com.br",
						phone: "31999196707",
						website: "www.xyz.com"
					}
				]
			)

		})
	})
})