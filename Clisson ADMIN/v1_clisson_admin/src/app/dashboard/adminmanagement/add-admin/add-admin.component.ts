import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm, FormControl, FormControlName } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/shared/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  AdminAddForm: FormGroup;
  selectedStatus: any
  statusData = [{
    id: '0', value: 'Activé'
  },
  { id: '1', value: 'Désactivé' }
  ]
  @ViewChild('f', { static: false }) floatingLabelForm: NgForm;
  @ViewChild('vform', { static: false }) validationForm: FormGroup;
  constructor(
    private toast: ToastrService,
    private authService: AuthService,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.AdminAddForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]),
      'status': new FormControl(null, [Validators.required, Validators.pattern('[0-1]'), Validators.maxLength(1)])
      // 'confirm_password': new FormControl('',Validators.required)

    }, { updateOn: 'blur' });

  }

  onAdminAddFormSubmit(value) {
    let obj = {
      'name': value.name,
      'password': value.password,
      'status': this.selectedStatus
    }
    this.authService.addUser(obj).subscribe(res => {
      if (res && res['status'] == 200) {
        this.toast.success(res['message']);
        this.AdminAddForm.reset();
        this.route.navigate(['/admin']);
      }
      else {
        this.AdminAddForm.reset();
        this.route.navigate(['/admin']);
      }
    })
  }
  onClickCancel() {
    this.route.navigate(['/admin'])
  }

  statusSelect(status) {
    this.selectedStatus = status
  }
}



/*

 if (this.activatedRoute.snapshot.queryParams['ind']) {
  this.activatedRoute.queryParams.subscribe(params => {
    this.ind = params['ind'];
    var retrievedData1 = localStorage.getItem("Data");
    this.arryData = JSON.parse(retrievedData1);
    this.newData.push(this.arryData[this.ind]);
    this.registerForm.patchValue(this.arryData[this.ind]);
  });

}
}
get f() { return this.registerForm.controls; }

updateRecord() {
    if(this.registerForm.invalid){
        alert("First you have to Register your self");
    }
    else{
        // store current record into abc
        var currentRecord = this.registerForm.value;
        // Get back Record from "DATA" from local storage
        var GetRecord = JSON.parse(localStorage.getItem("Data"));
        //GetRecord[0].mail="admin1@gmail.com";
        GetRecord[this.ind] = currentRecord;
        // save edited record into localstorage
        localStorage.setItem("Data", JSON.stringify(GetRecord));
        this.route.navigate(['/dashboard']);
        this.modalRef.hide();
        return true;
    }
  }

*/