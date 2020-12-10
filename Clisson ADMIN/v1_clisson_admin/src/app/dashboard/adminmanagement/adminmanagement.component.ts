import { Component, OnInit, ViewChild } from '@angular/core';
import * as tableData from '../../shared/data/smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthService } from 'app/shared/auth/auth.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-adminmanagement',
  templateUrl: './adminmanagement.component.html',
  styleUrls: ['./adminmanagement.component.scss']
})
export class AdminmanagementComponent implements OnInit {
  @ViewChild('f', { static: false }) floatingLabelForm: NgForm;
  @ViewChild('vform', { static: false }) validationForm: FormGroup;
  enable = true;
  allusers: any;
  count = 0;
  page: number = 1
  maxPage:any
  source: LocalDataSource;
  filterSource: LocalDataSource;
  alertSource: LocalDataSource;
  AdminAddForm: FormGroup;
  updatAdmin: FormGroup;
  total_record:any
  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toast: ToastrService,
    private route: Router,
    private activeRoute: ActivatedRoute,
  ) {
    this.source = new LocalDataSource(tableData.data); // create the source
    this.filterSource = new LocalDataSource(tableData.filerdata); // create the source
    this.alertSource = new LocalDataSource(tableData.alertdata); // create the source

  }

  alertsettings = {
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-2"></i>'
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="ft-edit-2 info font-medium-1 mr-2"></i>'
    },
    columns: {
      id: {
        title: 'ID',
      },
      name: {
        title: 'Nom',
      },
      status: {
        title: 'Statut'
      },
    },
    attr: {
      class: "table table-responsive"
    },
  }

  ngOnInit(): void {
    this.getUsers(this.page);
  }

  onChange(adminstatus, adminid) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Le statut d'administrateur sera modifié!",
      showCancelButton: true,
      confirmButtonText: 'Oui, changez-le!',
      cancelButtonText: 'Non, garde-le'
    }).then((result) => {
      let temp;
      if (result.value == true) {
        if (adminstatus == 0) {
          temp = 1
        }
        else {
          temp = 0;
        }
        let obj = {
          'id': JSON.parse(adminid),
          'status': JSON.stringify(temp)
        }
        this.authService.changeAdminStatus(obj).subscribe((res) => {
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
  onDeleteConfirm(id) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Cet utilisateur sera supprimé',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Non, garde-le'
    }).then((result) => {
      if (result.value == true) {
        this.authService.deleteAdmin(id).subscribe((res) => {
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
  getUsers(page) {
    this.authService.getUsers(page).subscribe(res => {
      if (res && res['status'] == 200) {
        this.allusers = res['data']
        this.total_record = res['totalRecords']
        this.maxPage = res['maxPage']
      }
    })
  }

}
