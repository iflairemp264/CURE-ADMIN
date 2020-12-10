import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'app/shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-update-recipe-details',
  templateUrl: './update-recipe-details.component.html',
  styleUrls: ['./update-recipe-details.component.scss'],
})
export class UpdateRecipeDetailsComponent implements OnInit {
  updateReciepeForm: FormGroup;
  fileToUpload: File = null;
  selectedImage: any
  selectedProdId: any
  updateRecord: any
  relatedRecipe: any
  allRecipeList: any
  url = `${environment.api.baseurl}`;
  imgUrl = `${environment.api.baseurlImg}`;
  selectedStatus: any
  relatedId = []
  recipe_id: any
  deleted_img: any = []
  statusData = [
    {
      id: '0', value: 'Activé'
    }, { id: '1', value: 'Désactivé' }
  ]
  reletedRecipe: any
  id: any
  constructor(private authService: AuthService,
    private toast: ToastrService,
    private route: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.allRecipe()
    this.updateReciepeForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'number_of_persons': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(1)]),
      'varieties_used': new FormControl(null, Validators.required),
      'ingredients': new FormControl(null, Validators.required),
      'preparation_steps': new FormControl(null, Validators.required),
      'more': new FormControl(null, Validators.required),
      'status': new FormControl(null, [Validators.required, Validators.pattern('[0-1]'), Validators.maxLength(1)]),
      'recipe_img': new FormControl(null),
      'reletedprod': new FormControl(null)
    })

    if (this.activatedRoute.snapshot.queryParams['id']) {
      this.id = this.activatedRoute.snapshot.queryParams['id']
      this.authService.recipeDetails(this.id).subscribe(res => {
        if (res && res['status'] == 200) {
          this.updateRecord = res['data'][0]

          this.reletedRecipe = res['related']
          this.reletedRecipe.map(x => {
            if (x) this.relatedId.push(x.id)
          })
          this.selectedProdId = [...this.relatedId]
          this.updateReciepeForm.patchValue({
            'name': this.updateRecord.name,
            'number_of_persons': this.updateRecord.number_of_persons,
            'varieties_used': this.updateRecord.varieties_used,
            'ingredients': this.updateRecord.ingredients,
            'preparation_steps': this.updateRecord.preparation_steps,
            'more': this.updateRecord.le_plus,
            'status': this.updateRecord.status,
            'reletedprod': this.selectedProdId
            // 'recipe_img': this.updateRecord.picture,
          })
        }
      })

    }
  }
  onUpdateReciepeFormSubmit(value) {
    let formData: FormData = new FormData();
    if (this.selectedImage && this.selectedImage.length > 0) {
      for (let i = 0; i < this.selectedImage.length; i++) {
        const element = this.selectedImage[i];
        formData.append('recipe_img', element);
      }
    }

    formData.append('id', this.id)
    formData.append('name', value.name)
    formData.append('number_of_persons', value.number_of_persons)
    formData.append('varieties_used', value.varieties_used)
    formData.append('ingredients', value.ingredients)
    formData.append('preparation_steps', value.preparation_steps)
    formData.append('lePlus', value.more)
    formData.append('status', this.selectedStatus)
    formData.append('relatedRecipe', value.reletedprod)
    formData.append('del_img',this.deleted_img)

    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('_token'),
      // 'Content-Type': 'multipart/form-data'
    });

    this.http.post(`${this.url}/recipe/edit`, formData, { headers })
      .pipe(map((res: any) => {
                
        if (res && res['status'] == 200) {
          this.toast.success(res['message']);
          this.route.navigate(['/recipe']);
          this.updateReciepeForm.reset();
        }
        else {
          this.toast.warning(res['message']);
        }
      })).subscribe(data => {
        console.log(data);
      },
        error => {
          console.log(error);

        })

  }
  onClickCancel() {
    this.route.navigate(['/recipe']);
  }

  handleFileInput(imgObj) {
    for (let i = 0; i < imgObj.length; i++) {
      if (imgObj[i].size > 150000) {
        this.toast.warning("la taille de l'image doit être inférieure à 150 Ko");
      }
      this.selectedImage = imgObj
    }

  }
  statusSelect(status) {
    this.selectedStatus = status
  }
  allRecipe() {
    this.authService.getAllRecipe().subscribe(res => {
      if (res && res['data']) {
        this.allRecipeList = res['data']
      }
    })
  }
  onRemoveImg(img) {
    let index = this.updateRecord.picture.findIndex(x => x == img)
    this.updateRecord.picture.splice(index, 1)
    this.deleted_img.push(img.images)
    

  }
  delImage(i){
    
  }
}
