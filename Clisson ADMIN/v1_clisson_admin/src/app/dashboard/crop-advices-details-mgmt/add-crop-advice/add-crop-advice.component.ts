import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/shared/auth/auth.service';

@Component({
  selector: 'app-add-crop-advice',
  templateUrl: './add-crop-advice.component.html',
  styleUrls: ['./add-crop-advice.component.scss']
})
export class AddCropAdviceComponent implements OnInit {
  CropAdviceForm: FormGroup
  varietyList: any;
  varietyName: any;
  selectedVariety: any
  selectedStatus: any
  selectedProdId:any
  reletedprod:any
  statusData = [
    {
      id: '0', value: 'Activé'
    },
    { id: '1', value: 'Désactivé' }
  ]
  constructor(
    private route: Router,
    private toast: ToastrService,
    private authService: AuthService

  ) { }

  ngOnInit() {
    this.getAllVarityList()
    this.CropAdviceForm = new FormGroup({
      'variety_id': new FormControl(null, Validators.required),
      'cropAdvice': new FormControl(null, [Validators.required]),
      'status': new FormControl(null, [Validators.required]),

    })
    this.getCropAdviceList()
  }
  onSubmitForm(value) {
    let obj = {
      'variety_id': value.variety_id,
      'cropAdvice': value.cropAdvice,
      'isCropAdvice': value.status
    }
    this.authService.addCropAdvice(obj).subscribe(res => {

      if (res && res['status'] == 200) {
        this.toast.success(res['message']);
        this.CropAdviceForm.reset();
        this.route.navigate(['/cropadvice'])
      }
      else {
        this.toast.warning(res['message']);
        this.CropAdviceForm.reset();
        this.route.navigate(['/cropadvice'])

      }
    })
  }
  onClickCancel() {
    this.route.navigate(['/cropadvice']);
  }
  onSelectOption(event) {
    this.varietyName = event.target.value

  }

  getCropAdviceList() {
    this.authService.emptyCropAdviceList().subscribe(res => {
      if (res && res['data']) {
        this.varietyList = res['data'];
      }
    })
  }

  getAllVarityList(){
    this.authService.getVarietyList1().subscribe(res=>{
      
      if(res && res['status'] == 200){
        this.reletedprod = res['data']
      }
      
    })
  }
}
