import { Component, Input, OnInit, Output } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit  {

  constructor(private service: SharedService ,
    private router: Router,
    private toastr: ToastrService) {
  }

  ActivateAddEditDepComp:boolean=true;


  @Input()

  dep: any;
  DepartmentId: Number;
  DepartmentName: string = '';


  ngOnInit(): void {
    this.DepartmentId = this.dep.DepartmentId;
    this.DepartmentName = this.dep.DepartmentName;
  }

  toast(pop){
    this.toastr.success(pop);
  }

  AddDepartment() {
    var val = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName,
    }
    this.service.addDepList(val).subscribe(res => {
      this.toast("Added Successfully")
    });
    this.reloadCurrentRoute()
  }

  UpdateDepartment() {
    var val = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName,
    }
    this.service.updateDepList(val).subscribe(res => {
      this.toast("Update Successfully")
    });
    this.reloadCurrentRoute()
  }

  closeClick(){
    this.ActivateAddEditDepComp=false;
  }
  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

}
