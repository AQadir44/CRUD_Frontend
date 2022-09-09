import { Component, OnInit , Input} from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor( private service: SharedService,
    private router: Router,
    private toastr: ToastrService,
) { }
  ActivateAddEditCom:boolean=true

  @Input()
  Emp:any;
  EmployeeId:string;
  EmployeeName:string;
  Department:string;
  DateofJoining:string;
  PhotoFile:string;
  PhotoFilePath:string;


  DepartmentList:any=[];

  ngOnInit(): void {
    this.loaddepartments();

  }


  // checkDate() {
  //   let formatedDate = new DatePipe(this.DateOfJoining)
  //   console.log(formatedDate);
  //   return formatedDate
  // }

  loaddepartments(){
    this.service.getDepList().subscribe((data:any)=>{
      this.DepartmentList = data

      this.EmployeeId = this.Emp.EmployeeId
      this.EmployeeName = this.Emp.EmployeeName
      this.Department = this.Emp.Department
      this.DateofJoining = this.Emp.DateofJoining
      this.PhotoFile = this.Emp.PhotoFile
      this.PhotoFilePath = this.service.PhotoUrl+this.PhotoFile


    })

  }
  toast(pop){
    this.toastr.success(pop);
  }

  toastFailed(pop){
    this.toastr.warning(pop);
  }

  AddEmployee(){
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateofJoining: this.DateofJoining,
      PhotoFile: this.PhotoFile

    };
    this.service.addEmpList(val).subscribe(res=>{
     console.log(res)
     if(res == "Added"){
       this.toast("Added Successfully")
     }
     else{
      this.toastFailed("Failed")
     }
    });
    this.reloadCurrentRoute()
  }
  UpdateEmployee(){
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateofJoining: this.DateofJoining,
      PhotoFile: this.PhotoFile

    };
    this.service.updateEmpList(val).subscribe(res=>{
     if(res == "Updated"){
       this.toast("Updated Successfully")
     }
     else{
      this.toastFailed("Failed")
     }
    });
    this.reloadCurrentRoute()
  }


  uploadPhoto(event){
    var file = event.target.files[0];
    console.log(file)
    const formData:FormData= new FormData();
    formData.append('uploadedfile',file,file.name);


    this.service.UploadPhoto(formData).subscribe((data:any) => {
      console.log(formData)

      this.PhotoFile = data.toString();
      this.PhotoFilePath = this.service.PhotoUrl+this.PhotoFile
    })


  }
  closeModal(){
    this.ActivateAddEditCom=false
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}
}
