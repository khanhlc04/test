export default {
	async checkAuth(){
		if(!appsmith.store.idAccount){
			navigateTo("Login");
		} else{
			const fetchAccount = await Get_Account_By_Id.run();

			if(fetchAccount.Roles[0].value !== "Chủ"){
				Button3.setVisibility(false);

				const fetchProject = await Get_Projects_Manager.run();
				if(fetchProject.count === 0){
					Button4.setVisibility(false);
				}
			} else {
				Button5.setVisibility(false);
			}
		}
	},

	async init(){
		let fetchTask;

		fetchTask = await Get_Tasks.run();
		data.tasks = fetchTask.results;
		
		const fetchTaskManage = await Get_Projects_Manager.run();
		data.tasks_manage = fetchTaskManage.results;
		
		data.list_data = data.tasks;
	},
	
	switchList(){
		if(Select1.selectedOptionValue == "doing"){
			data.list_data = data.tasks;
		}else{
			data.list_data = data.tasks_manage;
		}
	}
}