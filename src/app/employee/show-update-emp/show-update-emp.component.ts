import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-show-update-emp',
  templateUrl: './show-update-emp.component.html',
  styleUrls: ['./show-update-emp.component.css']
})
export class ShowUpdateEmpComponent implements OnInit {

  constructor(private service: SharedService,
    private toastr: ToastrService,) { }
  EmployeeList: any =[]
  deldata:any= []

  @Input()

  ModalTitle:string
  ActivateAddEditCom:boolean=false
  Emp:any


  p: number = 1;
  itemsPerPage :  number = 5;
  collection: any=[];

  EmployeeListWithoutFilter:any=[];
  EmployeeNameFilter:string = "";
  DepartmentFilter:string="";
  DateOfJoiningFilter:string="";



  ngOnInit(): void {
    this.refreshEmpList()
  }

  toast(pop){
    this.toastr.success(pop);
  }

  AddEmployeeModal(){
    this.Emp = {
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFile:"/anonymous.png",
    }
    this.ModalTitle="Add Employee"
    this.ActivateAddEditCom = true
  }

  toastFailed(pop){
    this.toastr.warning(pop);
  }



  EditEmployeeModel(item){
    console.log(item)
    this.Emp = item
    this.ModalTitle="Edit Employee"
    this.ActivateAddEditCom=true
  }
  deleteEmp(){
    this.service.deleteEmpList(this.deldata.EmployeeId).subscribe(res =>{
      if(res=='Deleted'){
        this.toast("Deleted Successfully")
      }else{
        this.toastFailed("Failed")
      }
      this.closeModal()
    }

      )

  }

  deleteEmpModal(item){
    this.deldata= item
  }

  filterdata(){
    var EmployeeNameFilter  = this.EmployeeNameFilter;
    var DepartmentFilter  = this.DepartmentFilter;
    var DateOfJoiningFilter  = this.DateOfJoiningFilter;

    this.EmployeeList = this.EmployeeListWithoutFilter.filter(
      function(el){
        return el.EmployeeName.toString().toLowerCase().includes(
          EmployeeNameFilter.toString().trim().toLowerCase())
          &&
        el.Department.toString().toLowerCase().includes(
          DepartmentFilter.toString().trim().toLowerCase())

      }
    )
  }

  sortResult(para,asc){
    this.EmployeeList = this.EmployeeListWithoutFilter.sort(function(a,b){
      if(asc){
        return (a[para]>b[para])? 1 : ((a[para]<b[para]) ? -1 : 0);
      }else{
        return (b[para]>a[para])? 1 : ((b[para]<a[para]) ? -1 : 0);
      }
    })

  }
  closeModal(){
    this.ActivateAddEditCom=false
    this.refreshEmpList()
  }
  refreshEmpList(){
    this.service.getEmpList().subscribe(data=>{
      this.EmployeeList = data
      this.EmployeeListWithoutFilter=data
    })
  }

}
