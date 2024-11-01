export default {
	checkAuth(){
		if(!appsmith.store.idAccount){
			navigateTo("Login");
		}
	},
	
	async init(){
		const fetchAccount = await Get_Account_By_Id.run();
		
		let fetchTask;

		if(fetchAccount.Roles[0].value === "Chủ"){
			fetchTask = await Get_Projects.run();
		} else {
			fetchTask = await Get_Projects_Manager.run();
			Button3.setVisibility(false);
			Button1.setVisibility(false);
			Button5.setVisibility(false);
		}

		data.tasks = fetchTask.results;
	}
}