import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/shared/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-update-variety-derails',
  templateUrl: './update-variety-derails.component.html',
  styleUrls: ['./update-variety-derails.component.scss']
})
export class UpdateVarietyDerailsComponent implements OnInit {
  updateVarietyForm: FormGroup
  reletedprod: any
  relatedVariety2: any
  selectedProdId: any
  selectedVarietyProd: any
  fileObject: any;
  updateRecord: any
  category = [];
  cat_id: any
  SelectedCategory: any
  imgUrl = `${environment.api.baseurlImg}`;
  baseurl = `${environment.api.baseurl}`;
  id: any
  relatedId = []
  selectedStatus: any
  deleted_img: any = []

  private url = `${environment.api.baseurl}`;
  statusData = [
    {
      id: '0', value: 'Activé'
    },
    { id: '1', value: 'Désactivé' }
  ]
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
  constructor(private toast: ToastrService,
    private authService: AuthService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit() {
    this.getCategoryList()
    this.updateVarietyForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'yield': new FormControl(null, [Validators.required]),
      'preservation': new FormControl(null, Validators.required),
      'skinColor': new FormControl(null, [Validators.required]),
      'fleshColor': new FormControl(null, [Validators.required]),
      'category_id': new FormControl(null, [Validators.required]),
      'status': new FormControl(null, [Validators.required]),
      'variety_Img': new FormControl(null),
      'relatedVariety': new FormControl(null),
      'small': new FormControl(null, [Validators.required]),
      'medium': new FormControl(null, [Validators.required]),
      'maturation_time': new FormControl(null, [Validators.required]),
      'big': new FormControl(null, [Validators.required]),
      'mildew_resistance': new FormControl(null, [Validators.required]),
      'premium': new FormControl(null, Validators.required)
    }, { updateOn: 'blur' });

    if (this.activatedRoute.snapshot.queryParams['id']) {
      this.id = this.activatedRoute.snapshot.queryParams['id']

      this.authService.varietyDetail(this.id).subscribe(res => {
        if (res && res['status'] == 200) {
          this.updateRecord = res['data']
          // console.log("updateRecord",this.updateRecord.pictures);
          this.cat_id = this.updateRecord.category_id
          this.reletedprod = res['related']
          this.reletedprod['1'].map(x => {
            if (x) this.relatedId.push(x.id)
          })
          this.reletedprod['2'].map(x => {
            if (x) this.relatedId.push(x.id)
          })
          this.reletedprod['default'].map(x => {
            if (x) this.relatedId.push(x.id)
          })
          this.selectedVarietyProd = [...this.relatedId]
          // console.log("ProdId Related",this.selectedVarietyProd);

          let obj = {
            'category_id': this.cat_id
          }
          this.authService.getAllVarietyByCategory(obj).subscribe(res => {

            if (res && res['status'] == 200) {
              this.relatedVariety2 = res['data']
              this.selectedProdId = this.relatedVariety2.filter(x => {
                if (this.relatedId.length > 0) return this.relatedId.includes(x.id)

              })

            }
          })

          /* temp1.filter(x=>temp2.includes(x.id)) */

          this.updateVarietyForm.patchValue({
            'name': this.updateRecord.name,
            'description': this.updateRecord.description,
            'yield': this.updateRecord.yield,
            'preservation': this.updateRecord.preservation,
            'skinColor': this.updateRecord.skin_color,
            'fleshColor': this.updateRecord.flesh_color,
            'category_id': this.updateRecord.category_id,
            'status': this.updateRecord.status,
            'relatedVariety': this.selectedVarietyProd,
            'small': this.updateRecord.small,
            'medium': this.updateRecord.medium,
            'big': this.updateRecord.big,
            'mildew_resistance': this.updateRecord.mildew_resistance,
            'premium': this.updateRecord.premium_variety,
            'maturation_time': this.updateRecord.maturation_time
            // 'variety_Img': this.updateRecord.pictures[0].images,

          })
          // console.log(this.updateVarietyForm.controls.relatedVariety.value);
        }
      })
    }

  }
  onSubmit(value) {

    let formData: FormData = new FormData();
    if (this.fileObject) {
      for (let i = 0; i < this.fileObject.length; i++) {
        const element = this.fileObject[i];
        formData.append('varietyCat_img', element);
      }
    }
    formData.append('variety_id', this.id)
    formData.append('name', value.name)
    formData.append('description', value.description)
    formData.append('yield', value.yield)
    formData.append('preservation', value.preservation)
    formData.append('skinColor', value.skinColor)
    formData.append('fleshColor', value.fleshColor)
    formData.append('category_id', value.category_id)
    formData.append('status', this.selectedStatus)
    formData.append('relatedVariety', value.relatedVariety)
    formData.append('small', value.small)
    formData.append('medium', value.medium)
    formData.append('big', value.big)
    formData.append('premium_variety', this.seletcedPremium)
    formData.append('maturation_time', value.maturation_time)
    formData.append('mildew_resistance', value.mildew_resistance)
    formData.append('del_img', this.deleted_img)

    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('_token'),
    });
    this.http.post(`${this.url}/variety/edit`, formData, { headers })
      .pipe(map((res: any) => {

        if (res && res['status'] == 200) {
          this.toast.success(res['message']);
          this.route.navigate(['/variety']);
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
    this.updateVarietyForm.controls['relatedVariety'].setValue['']
    this.selectedVarietyProd = []
    this.SelectedCategory = value.id
    let obj = {
      'category_id': this.SelectedCategory
    }
    this.authService.getAllVarietyByCategory(obj).subscribe(res => {
      if (res && res['status'] == 200) {
        this.relatedVariety2 = res['data']
      }
    })
  }
  onRemoveImg(item) {

    let index = this.updateRecord.pictures.findIndex(x => x == item)
    this.updateRecord.pictures.splice(index, 1)

    this.deleted_img.push(item.images)
  }
}
