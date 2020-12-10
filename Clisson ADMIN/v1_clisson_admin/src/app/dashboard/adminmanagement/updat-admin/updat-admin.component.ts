import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder, NgForm, FormControlName } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/shared/auth/auth.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updat-admin',
  templateUrl: './updat-admin.component.html',
  styleUrls: ['./updat-admin.component.scss']
})
export class UpdatAdminComponent implements OnInit {
  @ViewChild('f', { static: false }) floatingLabelForm: NgForm;
  @ViewChild('vform', { static: false }) validationForm: FormGroup;
  updatAdmin: FormGroup
  id: any
  retriveAdminName: any;
  editRecord: any
  constructor(private fb: FormBuilder,
    private toast: ToastrService,
    private authService: AuthService,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.updatAdmin = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      // 'id': new FormControlName(null, [Validators.required])
    }, { updateOn: 'blur' });

    if (this.activatedRoute.snapshot.queryParams['id']) {
      this.id = this.activatedRoute.snapshot.queryParams['id']
      let record = [];
      this.authService.adminDetails(this.id).subscribe(res => {
        if (res && res['data']) {
          this.editRecord = res['data']
          this.updatAdmin.patchValue({
            'name': this.editRecord.name
          })
        }
      })
      // this.authService.getUsers().subscribe(res => {
      //   for (let i = 0; i < res['data'].length; i++) {
      //     const element = res['data'][i];
      //     record.push(element)
      //   }
      //   this.editRecord  = record.find(x=> x.id == this.id)
      //   this.updatAdmin.patchValue({
      //     'name':this.editRecord.name
      //   })
      // })
    }
  }


  onUpdatAdminSubmit(value) {
    let obj = {
      'name': value.name,
      'id': this.id
    }
    this.authService.updateAdmin(obj).subscribe(res => {
      if (res && res['code'] == 200) {
        this.toast.success(res['message']);
        this.updatAdmin.reset();
        this.route.navigate(['/admin']);
      }
    });

  }
  onClickCancel() {
    this.route.navigate(['/admin'])
  }

}
