export default {
	checkAuth(){
		if(!appsmith.store.idAccount){
			navigateTo("Login");
		}
	},
	
	pickManager(){
			if(appsmith.URL.queryParams.key){
				Select2.setVisibility(false);
			} else {
				Select1.setVisibility(false);
				RadioGroup1.setVisibility(false);
			}
	},
	
	async init(){
		const fetchDepartment = await Get_Departments.run();
		data.departments = fetchDepartment.results;
	},
	
	getCurrentDateFormatted() {
		const today = new Date(); 

		// Định dạng ngày theo múi giờ địa phương
		const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
		const formattedDate = today.toLocaleDateString('vi-VN', options); // Định dạng theo kiểu Việt Nam

		return formattedDate.split('/').reverse().join('/'); 
	}, 

	async getLeadDepartment(){
		const fetchDepartment = await Get_All_Department.run();

		const listLeaders = [];

		for(const item of fetchDepartment.results){
			const lead = {
				"id": item.Truong_Phong[0].id,
				"leader": item.Truong_Phong[0].value
			};

			listLeaders.push(lead);
		}

		data.leaders = listLeaders;
	},

	addTask(){
		const taskName = Input1.text.trim();
		const description = RichTextEditor1.text.trim();
		const dateStarted = moment(DatePicker1.selectedDate).format("YYYY-MM-DD");
		const deadline = moment(DatePicker2.selectedDate).format("YYYY-MM-DD");

		let record = data.leaders.filter(item => item.leader === Select2.selectedOptionValue);
		
		let manager;
		
		if(!record.length){
			manager = RadioGroup1.selectedOptionValue;
		} else {
			manager = record[0].id;
		}
		
		let idTaskParent = appsmith.URL.queryParams.key ? [parseInt(appsmith.URL.queryParams.key)] : "";

		const task = {
			"Ten_Cong_Viec": taskName,
			"Mo_Ta": description,
			"Trang_Thai": "Active",
			"Ngay_Bat_Dau": dateStarted,
			"Ngay_Ket_Thuc": deadline,
			"Nguoi_Quan_Ly": [manager],
			"Cong_Viec_Cha": idTaskParent
		};

		return task;
	},
	
	navPrePage(){
		if(!appsmith.URL.queryParams.key){
			navigateTo('Quản Lý Dự Án', {}, 'SAME_WINDOW');
		}else{
			navigateTo('Chi Tiết Công Việc', {"key": appsmith.URL.queryParams.key}, 'SAME_WINDOW');
		}
	},
	
	async getEmployee(){
		if(Select1.selectedOptionValue){
			const arr = [];
			
			const fetchManager = await Get_Manager.run();
			const fetchTask = await Get_Task_By_Id.run();
			
			if(fetchManager.results[0].id !== fetchTask.Nguoi_Quan_Ly[0].id){
				arr.push({
					"label": fetchManager.results[0].Name + " - Trưởng Phòng",
					"value": fetchManager.results[0].id
				});
			}
			
			const fetchEmployee = await Get_Employee.run();

			for(const e of fetchEmployee.results){
					const object = {
						"label": e.Name,
						"value": e.id
					}
					arr.push(object);
			}
		
			data.employee = arr;
		} else {
			data.employee = "";
		}
	},
}