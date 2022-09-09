
import { Component, OnInit , Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-show-update-dep',
  templateUrl: './show-update-dep.component.html',
  styleUrls: ['./show-update-dep.component.css' ]
})
export class ShowUpdateDepComponent implements OnInit {

  constructor(private service:SharedService,
    private toastr: ToastrService){}

  DepartmentList:any=[];

  @Input()
  department: any
  DepartmentId: string;
  DepartmentName: string = '';
  ModalTitle:string;
  ActivateAddEditDepComp:boolean=false;
  Delcom:boolean=false;
  dep:any;
  deldata:any

  popPara:string;

  p: number = 1;
  itemsPerPage : number = 5;
  collection: any=[];


  DepertmentNameFilter: string ="";
  DepartmentListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshDepList();

  }

  toast(pop){
    this.toastr.success(pop);
  }

  addClick(){
    this.dep = {
      DepartmentId:0,
      DepartmentName:""
    }
    this.ModalTitle="Add Department";
    this.ActivateAddEditDepComp = true;
  }

  editClick(item){
    this.dep = item;
    this.ModalTitle="Edit Department";
    this.ActivateAddEditDepComp = true;

  }

  deleteDep(){
    this.service.deleteDepList(this.deldata.DepartmentId).subscribe(
      data => {
        this.toast("Delete Successfully")
        this.refreshDepList()
      }
    )
  }

  deleteClick(item){
    this.deldata = item
  }


  filterdata(){
    var DepartmentNameFilter  = this.DepertmentNameFilter;
    this.DepartmentList = this.DepartmentListWithoutFilter.filter(
      function(el){
        return el.DepartmentName.toString().toLowerCase().includes(
          DepartmentNameFilter.toString().trim().toLowerCase())
      }
    )
  }
  sortResult(para,asc){
    this.DepartmentList = this.DepartmentListWithoutFilter.sort(function(a,b){
      if(asc){
        return (a[para]>b[para])? 1 : ((a[para]<b[para]) ? -1 : 0);
      }else{
        return (b[para]>a[para])? 1 : ((b[para]<a[para]) ? -1 : 0);
      }
    })

  }

  closeClick(){
    this.ActivateAddEditDepComp=false;
    this.refreshDepList()
  }
  refreshDepList(){
    // Asynchronyx Operation
    this.service.getDepList().subscribe(data => {
      this.DepartmentList = data;
      this.DepartmentListWithoutFilter = data;
    })
  }


}
