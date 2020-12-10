import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment'
@Component({
  selector: 'app-variety-category-mgmt',
  templateUrl: './variety-category-mgmt.component.html',
  styleUrls: ['./variety-category-mgmt.component.scss']
})
export class VarietyCategoryMgmtComponent implements OnInit {
  varietyCategoryList = [];
  imgurl = `${environment.api.baseurlImg}`
  search: any
  maxPage: any
  total_record: any
  page:number = 1
  
  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getList(this.page)
  }

  onChange(variety_status, varietyid) {

    Swal.fire({
      title: 'Are You Sure?',
      text: 'Varity Category Status will be Changed!',
      showCancelButton: true,
      confirmButtonText: 'Yes, Change it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      let temp;
      if (result.value == true) {
        if (variety_status == 0) {
          temp = 1
        }
        else {
          temp = 0;
        }
        let obj = {
          'id': JSON.parse(varietyid),
          'status': JSON.stringify(temp)
        }
        this.authService.changeVarietyCategoryStatus(obj).subscribe((res) => {
          if (res && res['status'] == 200) {
            this.toast.success(res['message']);
            this.ngOnInit();
          }
          else {
            this.toast.warning(res['message']);
            this.ngOnInit();
          }
        })
      }
      else {
        this.ngOnInit();
      }
    })
  }
  getList(page) {
    this.authService.getVarietyCategoryList(page).subscribe(res => {
      if (res && res['status'] == 200) {
        this.varietyCategoryList = res['data'];
        this.maxPage = res['maxPage']
        this.total_record = res['totalRecords']

      }
    })
  }

  onDeleteConfirm(id) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'This Variety Category will be Deleted ',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.authService.deleteVarietyCategory(id).subscribe((res) => {
          if (res && res['status'] == 200) {
            this.toast.success(res['message'])
            this.ngOnInit();
          }
        })
      }
      else {
        this.ngOnInit();
      }
    })
  }
  searchRecord(term) {
    if (term.length > 1) {
      this.search = true
      this.authService.searchRecord(term).subscribe(res => {
        if (res && res['status'] == 400) {
          if (res['data'].varietyCategory) {
            this.varietyCategoryList = res['data'].varietyCategory
          }
        }
      })
    }
    else {
      this.ngOnInit();
      this.search = false
    }
  }
  shortRecord() {
    this.varietyCategoryList.sort((b, a) => 0 - (a > b ? -1 : 1));
    // console.log("reocrd", this.varietyCategoryList.sort());

  }
}
