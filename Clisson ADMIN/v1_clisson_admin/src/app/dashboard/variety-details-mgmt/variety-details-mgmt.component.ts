import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment'
@Component({
  selector: 'app-variety-details-mgmt',
  templateUrl: './variety-details-mgmt.component.html',
  styleUrls: ['./variety-details-mgmt.component.scss'],
  providers: [NgbPaginationConfig]
})
export class VarietyDetailsMgmtComponent implements OnInit {
  variety: any;
  pageNo: number = 1
  total_records: any
  search :any
  maxPage:any
  imgurl = `${environment.api.baseurlImg}`
  constructor(private authService: AuthService,
    private toast: ToastrService,
    private route: Router,
    config: NgbPaginationConfig) {
    config.boundaryLinks = true;
    config.maxSize = 15;
  }

  ngOnInit() {
    this.VarietyList(this.pageNo);
  }
  VarietyList(pageNo) {
    this.authService.getVarietyList(pageNo).subscribe(res => {
      if (res && res['status'] == 200) {
        this.variety = res['data'];
        this.total_records = res['totalRecords']
        this.maxPage = res['maxPage']
      }
      else {
        this.toast.warning(res['message']);
      }
    })
  }

  onChange(variety_status, varietyid) {

    Swal.fire({
      title: 'Are You Sure?',
      text: 'Varity Status will be Changed!',
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

        this.authService.changeVarietyStatus(obj).subscribe((res) => {
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

  onDeleteConfirm(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Variety Details Will be Deleted',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.authService.deleteVariety(id).subscribe((res) => {
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
    if (term > 1) {
      this.search = true
      this.authService.searchRecord(term).subscribe(res => {
        if (res && res['status'] == 400 && res['data'].variety) {
          this.variety = res['data'].variety
          
        }
      })
    }
    else {
      this.ngOnInit()
      this.search = false
    }
  }
  shortRecord() {
    this.variety.sort((b, a) => 0 - (a > b ? -1 : 1));

  }
}
