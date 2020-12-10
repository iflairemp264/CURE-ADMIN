import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-update-variety-category',
  templateUrl: './update-variety-category.component.html',
  styleUrls: ['./update-variety-category.component.scss'],
})
export class UpdateVarietyCategoryComponent implements OnInit {
  updateVarietyForm: FormGroup;
  id: any;
  selectedImage: File
  editRecord: any
  baseUrl = `${environment.api.baseurl}`;
  imgUrl = `${environment.api.baseurlImg}`;
  selectedStatus: any
  deleted_img:any = []
  statusData = [
    {
      id: '0', value: 'Activé'
    }, { id: '1', value: 'Désactivé' }
  ]
  constructor(private route: Router,
    private authService: AuthService,
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit() {
    this.updateVarietyForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'varietyCat_img': new FormControl(null),
      'status': new FormControl(null, [Validators.required])
    }, { updateOn: 'blur' });

    this.id = this.activatedRoute.snapshot.queryParams['id']
    if (this.activatedRoute.snapshot.queryParams['id']) {
      let record;
      this.authService.vaietyCategoryDetails(this.id).subscribe(res => {
        
        if (res && res['data']) {
          record = res['data']
          this.editRecord = record[0]
          this.updateVarietyForm.patchValue({
            'name': this.editRecord.name,
            // 'varietyCat_img': this.editRecord.image,
            'status': this.editRecord.status
          
          })
          this.selectedStatus = this.editRecord.status
        }

      })

    }

  }
  onSubmitForm(value) {
    let formData: FormData = new FormData();
    formData.append('id', this.id)
    formData.append('name', value.name)
    formData.append('varietyCat_img', this.selectedImage)
    formData.append('status',value.status)
    formData.append('del_img',this.deleted_img)
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('_token'),
    });


    this.http.post(`${this.baseUrl}/varietyCategory/edit`, formData, { headers })
      .pipe(map((res: any) => {
        if (res && res['status'] == 200) {
          this.toast.success(res['message']);
          this.route.navigate(['/varietycategory']);
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
  statusSelect(status) {
    this.selectedStatus = status
  }
  handleFileInput(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      if(file.size > 150000){
        this.toast.warning("la taille de l'image doit être inférieure à 150 Ko");
      }
      this.selectedImage = file
    }
  }
 

}
