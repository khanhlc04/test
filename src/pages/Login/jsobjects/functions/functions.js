export default {
	async login(){
		const fetchAccount = await Get_Account.run();
		
		if(fetchAccount.count == 1){
			storeValue("idAccount", fetchAccount.results[0].id);
			navigateTo("Tổng Quan");
		}
		
		console.log(appsmith.store.idAccount)
	}
}