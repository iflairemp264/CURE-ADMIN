import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/shared/auth/auth.service';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment'
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-variety-derails',
  templateUrl: './add-variety-derails.component.html',
  styleUrls: ['./add-variety-derails.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddVarietyDerailsComponent implements OnInit {
  addVarietyForm: FormGroup;
  fileObject: any;
  category = [];
  SelectedCategory: any
  reletedprod = []
  selectedProdId: any
  related: any
  multiImg: any

  private url = `${environment.api.baseurl}`;
  seletcedPremium: any
  PremiumData = [
    {
      id: '0', value: 'defaut'
    },
    {
      id: '1', value: 'Niveau 1'
    },
    {
      id: '2', value: 'Niveau 2'
    }
  ]
  statusData = [
    {
      id: '0', value: 'Activé'
    },
    { id: '1', value: 'Désactivé' }
  ]
  selectedStatus: any;

  constructor(
    private toast: ToastrService,
    private authService: AuthService,
    private route: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getCategoryList();
    this.addVarietyForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'yield': new FormControl(null, [Validators.required]),
      'preservation': new FormControl(null, Validators.required),
      'skinColor': new FormControl(null, [Validators.required]),
      'fleshColor': new FormControl(null, [Validators.required]),
      'category_id': new FormControl(null, [Validators.required]),
      'status': new FormControl(null, [Validators.required]),
      'variety_images': new FormControl(null, [Validators.required]),
      'relatedVariety': new FormControl(null),
      'small': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      'medium': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      'big': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      'premium': new FormControl(null, [Validators.required]),
      'mildew_resistance': new FormControl(null, [Validators.required]),
      'maturation_time': new FormControl(null, [Validators.required]),
    }, { updateOn: 'blur' });
  }
  onSubmit(value) {

    let formData: FormData = new FormData();
    for (let i = 0; i < this.fileObject.length; i++) {
      const element = this.fileObject[i];
      formData.append('varietyCat_img', element);
    }
    formData.append('name', value.name)
    formData.append('description', value.description)
    formData.append('yield', value.yield)
    formData.append('preservation', value.preservation)
    formData.append('skinColor', value.skinColor)
    formData.append('fleshColor', value.fleshColor)
    formData.append('category_id', this.SelectedCategory)
    formData.append('status', this.selectedStatus)
    formData.append('relatedVariety', this.selectedProdId)
    formData.append('small', value.small)
    formData.append('medium', value.medium)
    formData.append('big', value.big)
    formData.append('premium_variety', this.seletcedPremium)
    formData.append('mildew_resistance', value.mildew_resistance)
    formData.append('maturation_time', value.maturation_time)
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('_token'),
    });

    this.http.post(`${this.url}/variety/add`, formData, { headers })
      .pipe(map((res: any) => {
        if (res && res['status'] == 400) {
          this.toast.success(res['message']);
          this.route.navigate(['/variety']);
          this.addVarietyForm.reset();
        }
        else {
          this.toast.warning(res['message']);
          this.route.navigate(['/variety']);
        }
      }))
      .subscribe(data => { }, error => {
        console.log(error);

      })

  }
  onClickCancel() {
    this.route.navigate(['/variety']);
  }
  handleFileInput(imgObj) {
    // if (imgObj.type === 'image/jpeg' || imgObj.type === 'image/png' || imgObj.type === 'image/jpg') {
    //   this.toast.warning('Please Select Image File')
    for (let i = 0; i < imgObj.length; i++) {
      if (imgObj[i].size > 150000) {
        this.toast.warning("la taille de l'image doit être inférieure à 150 Ko");
      }
      this.fileObject = imgObj
    }
  }

  getCategoryList() {
    this.authService.getVarietyCategoryList1().subscribe(res => {
      if (res && res['data']) {
        this.category = res['data']
      }
    })
  }
  selectedOption(value) {
    this.selectedProdId = []
    this.SelectedCategory = value.id
    let obj = {
      'category_id': this.SelectedCategory
    }
    this.authService.getAllVarietyByCategory(obj).subscribe(res => {
      if (res && res['status'] == 200) {
        this.reletedprod = res['data']
      }

    })
  }


}
