export default {
	init(){
		Button5.setVisibility(false);
	},
	
	checkAuth(){
		if(!appsmith.store.idAccount){
			navigateTo("Login");
		}
	},
	
	async getRole(){
		const roles = await Get_All_Roles.run();

		for(const item of roles.results){
			const r = {
				id: item.id,
				role: item.Role_Name
			};

			data.role.push(r);
		}
	},

	addAccount(){
		const name = NE_fullName.text.trim();
		const email = NE_email.text.trim();

		const neRole = data.role.filter(item => item.role === NE_role.selectedOptionValue);

		const account = {
			"Name": name,
			"Password": "fithou123",
			"Roles": [
				neRole[0].id
			],
			"Email": email
		};

		return account;
	}
}