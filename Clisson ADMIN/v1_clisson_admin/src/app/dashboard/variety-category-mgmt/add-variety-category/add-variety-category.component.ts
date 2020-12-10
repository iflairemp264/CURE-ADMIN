import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { AuthService } from 'app/shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-add-variety-category',
  templateUrl: './add-variety-category.component.html',
  styleUrls: ['./add-variety-category.component.scss']
})
export class AddVarietyCategoryComponent implements OnInit {
  add_var_cat_form: FormGroup;
  private url = `${environment.api.baseurl}`;
  selectedImage: File
  selectedStatus: any
  statusData = [
    {
      id: '0', value: 'Activé'
    },
    { id: '1', value: 'Désactivé' }
  ]
  formData = new FormData();
  @ViewChild('f', { static: false }) floatingLabelForm: NgForm;
  @ViewChild('vform', { static: false }) validationForm: FormGroup;
 
  fileObject: any;

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private route: Router,
    private http: HttpClient
  ) { }

  handleFileInput(imgObj) {
    this.selectedImage = imgObj.target.files[0];
    this.formData.append('varietyCat_img', this.selectedImage)
    //  this.formData.append('name', 'this is ')

  }

  ngOnInit() {
    this.add_var_cat_form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'varietyCat_img': new FormControl(null,[Validators.required]),
      'status': new FormControl('', [Validators.required])
    }, { updateOn: 'blur' });
  }

  // onAddVarietyCategorySubmit(value) {
  //   console.log("value", value);
  //   //   let formData: FormData = new FormData();
  //   //   formData.append('varityCat_img', this.selectedImage);   
  //   this.formData.append('name', value.name);
  //   this.formData.append('status', value.status);
  //   this.authService.addVarietyCategory(this.formData).subscribe(res => {
  //     if (res && res['status'] == 200) {
  //       this.toast.success(res['message']);
  //       this.route.navigate(['/varietycategory']);
  //       this.add_var_cat_form.reset();
  //     }
  //     else {
  //       this.toast.warning(res['message']);
  //       this.route.navigate(['/varietycategory']);
  //     }
  //   })
  // }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      if(file.size > 150000){
        this.toast.warning("la taille de l'image doit être inférieure à 150 Ko");
      }
      this.selectedImage = file
    }
  }
  onAddVariety(value) {
    let formData: FormData = new FormData();
    formData.append('varietyCat_img', this.selectedImage);
    formData.append('name', value.name);
    formData.append('status', value.status);
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('_token'),
      // 'Content-Type': 'multipart/form-data'
    });
    // this.authService.addVarietyCategory(value, this.selectedImage).subscribe(res => {
    //   console.log("response from", res);

    // })
    this.http.post(`${this.url}/varietyCategory/add`, formData, { headers })
      .pipe(map((res: any) => {
        if (res && res['status'] == 200) {
          this.toast.success(res['message']);
          this.route.navigate(['/varietycategory']);
          this.add_var_cat_form.reset();
        }
        else {
          this.toast.warning(res['message']);
          this.route.navigate(['/varietycategory']);
        }
      })).subscribe(data => {
        console.log(data);
      },
        error => {
          console.log(error);

        })
  }

  onClickCancel() {
    this.route.navigate(['/varietycategory']);
  }

}

