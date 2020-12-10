import { Component, OnInit, Directive, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/shared/auth/auth.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment'
@Component({
  selector: 'app-add-recipe-details',
  templateUrl: './add-recipe-details.component.html',
  styleUrls: ['./add-recipe-details.component.scss'],
})
export class AddRecipeDetailsComponent implements OnInit {
  addReciepeForm: FormGroup;
  private url = `${environment.api.baseurl}`;
  fileObject: any;
  selectedStatus: any
  reletedProd = []
  selectedProdId: string
  statusData = [{
    id: '0', value: 'Activé'
  }, { id: '1', value: 'Désactivé' }]

  constructor(
    private route: Router,
    private toast: ToastrService,
    private authService: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getReletedProd()
    this.addReciepeForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'number_of_persons': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(1)]),
      'varieties_used': new FormControl(null, Validators.required),
      'ingredients': new FormControl(null, Validators.required),
      'preparation_steps': new FormControl(null, Validators.required),
      'more': new FormControl(null, Validators.required),
      'status': new FormControl(null, [Validators.required, Validators.pattern('[0-1]'), Validators.maxLength(1)]),
      'recipe_img': new FormControl(null, [Validators.required]),
      'reletedprod': new FormControl(null, [Validators.required])
    })
  }
  onAddReciepeFormSubmit(value) {

    let formData: FormData = new FormData();
    for (let i = 0; i < this.fileObject.length; i++) {
      const element = this.fileObject[i];
      formData.append('recipe_img', element);
    }
    // formData.append('recipe_img', this.fileObject);
    formData.append('name', value.name)
    formData.append('number_of_persons', value.number_of_persons)
    formData.append('varieties_used', value.varieties_used)
    formData.append('ingredients', value.ingredients)
    formData.append('preparation_steps', value.preparation_steps)
    formData.append('lePlus', value.more)
    formData.append('status', this.selectedStatus)
    formData.append('relatedRecipe', this.selectedProdId)

    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('_token'),
      // 'Content-Type': 'multipart/form-data'
    });

    this.http.post(`${this.url}/recipe/add`, formData, { headers })
      .pipe(map((res: any) => {
        if (res && res['status'] == 200) {
          this.toast.success(res['message']);
          this.route.navigate(['/recipe']);
          this.addReciepeForm.reset();
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

  handleFileInput(filesObj) {
    for (let i = 0; i < filesObj.length; i++) {
      if(filesObj[i].size > 150000){
        this.toast.warning("la taille de l'image doit être inférieure à 150 Ko");
      }
      this.fileObject = filesObj
    }
    
  }
  statusSelect(status) {
    this.selectedStatus = status
  }
  getReletedProd() {
    this.authService.getAllRecipe().subscribe(res => {
      if (res && res['status'] == 200) {
        this.reletedProd = res['data']
      }
    })
  }

}
