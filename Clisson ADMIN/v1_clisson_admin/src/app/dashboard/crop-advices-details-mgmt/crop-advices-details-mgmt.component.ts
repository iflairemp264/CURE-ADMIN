import { Component, QueryList, OnInit, ViewChildren } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment'


@Component({
  selector: 'app-crop-advices-details-mgmt',
  templateUrl: './crop-advices-details-mgmt.component.html',
  styleUrls: ['./crop-advices-details-mgmt.component.scss'],
  providers: [NgbPaginationConfig]
})
export class CropAdvicesDetailsMgmtComponent implements OnInit {

  allCropAdvice: any
  selectedStatus: any
  imgurl = `${environment.api.baseurlImg}`
  page: number = 1
  total_record: any
  search:any
  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private route: Router,
    config: NgbPaginationConfig) {
    config.boundaryLinks = true;
    config.maxSize = 15;
  }




  ngOnInit() {
    this.getCropAdviceList(this.page)
  }
  getCropAdviceList(page) {
    this.authService.getCropadvice(page).subscribe(res => {
      if (res && res['data']) {
        this.allCropAdvice = res['data'];
        this.total_record = res['totalRecords']
      }
      else {
        this.toast.warning(res['message'])
      }
    })
  }

  onDeleteConfirm(id) {

    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "L'avis de recadrage sera supprimé",
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: "Non, garde-le"
    }).then((result) => {
      if (result.value == true) {
        this.authService.deleteCropAdvice(id).subscribe((res) => {
          if (res && res['status'] == 200) {
            this.toast.success(res['message'])
            this.ngOnInit();
          }
          else {
            this.toast.warning(res['message'])
          }
        })
      }
      else {
        this.ngOnInit();
      }
    })
  }
  onChangeStatus(status, id) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Le statut de l'avis de recadrage sera modifié!",
      showCancelButton: true,
      confirmButtonText: 'Oui, changez-le!',
      cancelButtonText: 'Non, garde-le'
    }).then((result) => {
      let temp;
      if (result.value == true) {
        if (status == 0) {
          temp = 1
        }
        else {
          temp = 0;
        }
        let obj = {
          'id': JSON.parse(id),
          'isCropAdvice': JSON.stringify(temp)
        }
        this.authService.cropadviceStatus(obj).subscribe((res) => {
          if (res && res['status'] == 200) {
            this.toast.success(res['message']);
            this.ngOnInit();
          }
        })
      }
      else {
        this.ngOnInit();
      }
    })
  }
  serachRecord(term) {
    if (term.length > 1) {
      this.search = true
      this.authService.searchRecord(term).subscribe(res => {
        if (res && res['status'] == 400 && res['data'].cropAdvice) {
          this.allCropAdvice = res['data'].cropAdvice
        }
      })
    }
    else {
      this.ngOnInit()
      this.search = false
    }
  }
  shortRecord() {
    this.allCropAdvice.sort((b, a) => 0 - (a > b ? -1 : 1));


  }
}
