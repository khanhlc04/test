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
			} else{
					Button5.setVisibility(false);
			}
		}
	},
	
	async init(){
		const fetchTask = await Get_Tasks.run();
		
		console.log(fetchTask)
		
		const countActive = fetchTask.results.reduce((acc, item) => item.Trang_Thai.value === "Active" ? acc + 1 : acc, 0);
		
		const countFinish = fetchTask.results.reduce((acc, item) => item.Trang_Thai.value === "Finish" ? acc + 1 : acc, 0);
		
		const countInactive = fetchTask.results.reduce((acc, item) => item.Trang_Thai.value === "Inactive" ? acc + 1 : acc, 0);
		
		data.tasks=[
			{
				"x": "Active",
				"y": countActive
			},
			{
				"x": "Finish",
				"y": countFinish
			},
			{
				"x": "Inactive",
				"y": countInactive
			}
		]
	}
}