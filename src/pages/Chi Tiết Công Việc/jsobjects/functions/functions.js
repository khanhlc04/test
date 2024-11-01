export default {
	checkAuth(){
		if(!appsmith.store.idAccount){
			navigateTo("Login");
		}
	},

	async init(){
		const fetchTask = await Get_Task_By_Id.run();
		data.task = fetchTask;

		if(data.task.Cong_Viec_Cha.length){
			const fetchParentTask = await Get_Task_By_Id_Parent.run();
			data.task_parent = fetchParentTask;
		}

		const fetchDepartment = await Get_Departments.run();
		data.departments = fetchDepartment.results;

		if(!data.task.Cong_Viec_Cha.length){
			const fetchChildren = await Get_Tasks_Children.run();
			data.task_children = fetchChildren.results;

			ListEmployee.setVisibility(false);
			Button4.setVisibility(false);
			Text11.setVisibility(false);
		} else {
			List1.setVisibility(false);
			Button1.setVisibility(false);
		}

		const fetchAccount = await Get_Account_By_Id.run();

		if(appsmith.store.idAccount !== data.task.Nguoi_Quan_Ly[0].id || fetchAccount.Roles[0].value === "Chủ"){
			Select2.setDisabled(true);
		}
	},

	async getEmployee(){
		if(Select1.selectedOptionValue){
			const arr = [];

			const fetchManager = await Get_Manager.run();

			if(fetchManager.results[0].id !== data.task.Nguoi_Quan_Ly[0].id && 
				 fetchManager.results[0].id !== data.task_parent.Nguoi_Quan_Ly[0].id){
				arr.push({
					"label": fetchManager.results[0].Name + " - Trưởng Phòng",
					"value": fetchManager.results[0].id
				});
			}

			const fetchEmployee = await Get_Employee.run();

			const existItem = [];
			existItem.push(data.task.Nguoi_Quan_Ly[0].id);

			for(const item of ListEmployee.listData){
				existItem.push(item.id);
			}

			for(const e of fetchEmployee.results){
				if(!existItem.includes(e.id)){
					const object = {
						"label": e.Name,
						"value": e.id
					}
					arr.push(object);
				}
			}

			data.employee = arr;
		} else {
			data.employee = "";
		}
	},

	AddNguoiLam(){
		const arr = [];

		for(const item of List1.listData){
			arr.push(item.id);
		}

		const mergeArr = arr.concat(CheckboxGroup1.selectedValues);

		return mergeArr;
	}
}