import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit{
   formValue !: FormGroup;
   employeeModelObj : EmployeeModel = new EmployeeModel();
   employeeData! : any;
   showAdd!: boolean;
   showUpdate!: boolean;
  constructor(private formbuilder: FormBuilder,
              private api: ApiService){}

  ngOnInit(): void {

    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobileNo: [''],
      salary: ['']
    })
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate= false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobileNo = this.formValue.value.mobileNo;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res => {
      console.log(res);
      alert("Employee added successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
    },
    err => {
      alert("something went wrong");
    })
  }

  getAllEmployee() {
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

  deleteEmployee(row: any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert('deleted');
      this.getAllEmployee();
    })
  }

  onEdit(row: any){
    this.showAdd = true;
    this.showUpdate= false;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobileNo'].setValue(row.mobileNo);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobileNo = this.formValue.value.mobileNo;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res =>{
      alert("updated")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
    })
  }

}
