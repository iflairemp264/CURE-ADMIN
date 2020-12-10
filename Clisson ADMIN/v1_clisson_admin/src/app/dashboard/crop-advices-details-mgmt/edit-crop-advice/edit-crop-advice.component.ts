import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/shared/auth/auth.service';

@Component({
  selector: 'app-edit-crop-advice',
  templateUrl: './edit-crop-advice.component.html',
  styleUrls: ['./edit-crop-advice.component.scss']
})
export class EditCropAdviceComponent implements OnInit {
  EditCropAdviceForm: FormGroup
  varietyList: any;
  varietyName: any;
  id: any
  updateRecord: any
  selectedStatus: any
  statusData = [
    {
      id: '0', value: 'Activé'
    },
    { id: '1', value: 'Désactivé' }
  ]
  constructor(
    private route: Router,
    private toast: ToastrService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.getVarietyList()
    this.EditCropAdviceForm = new FormGroup({
      'cropAdvice': new FormControl(null, [Validators.required]),
      'name': new FormControl(),
      'status': new FormControl(null, [Validators.required]),

    })
    if (this.activatedRoute.snapshot.queryParams['id']) {
      this.id = this.activatedRoute.snapshot.queryParams['id']
      this.authService.cropadviceDetails(this.id).subscribe(res => {
        
        if (res && res['data']) {
          this.updateRecord = res['data'][0]
          this.EditCropAdviceForm.patchValue({
            'cropAdvice': this.updateRecord.cropAdvice,
            'name': this.updateRecord.name,
            'status': this.updateRecord.isCropAdvice
          })
        }

      })
    }
  }
  onSubmitForm(value) {
    let obj = {
      'variety_id': this.id,
      'cropAdvice': value.cropAdvice,
      'isCropAdvice': value.status
    }
    this.authService.addCropAdvice(obj).subscribe(res => {
      if (res && res['status'] == 200) {
        this.toast.success(res['message']);
        this.EditCropAdviceForm.reset();
        this.route.navigate(['/cropadvice'])
      }
      else {
        this.toast.warning(res['message']);
      }
    })
  }
  onClickCancel() {
    this.route.navigate(['/cropadvice']);
  }
  onSelectOption(event) {
    this.varietyName = event.target.value

  }

  getVarietyList() {
    this.authService.emptyCropAdviceList().subscribe(res => {
      if (res && res['data']) {
        this.varietyList = res['data'];

      }
    })
  }

}
