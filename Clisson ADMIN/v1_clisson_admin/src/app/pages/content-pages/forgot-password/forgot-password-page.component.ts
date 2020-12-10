import { Component, ViewChild } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup } from '@angular/forms'
import { AuthService } from 'app/shared/auth/auth.service';
import { Toast, ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent {
    @ViewChild('f', { static: false }) forogtPasswordForm: NgForm;
    @ViewChild('f', { static: false }) floatingLabelForm: NgForm;
    @ViewChild('vform', { static: false }) validationForm: FormGroup;
    forgotForm: FormGroup;
    constructor(private router: Router,
        private route: ActivatedRoute,
        private authServie: AuthService,
        private toast:ToastrService,) {
        this.forgotForm = new FormGroup({
            'password': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]),
            'newpassword': new FormControl(null, [Validators.required]),
        })
    }

    // On submit click, reset form fields
    onSubmit(value) {
        
        let obj={
            'oldPwd':value.password,
            'newPwd':value.newpassword,
            'id':localStorage.getItem('_id')
        }
        this.authServie.changePassword(obj).subscribe(res => {
            if (res && res['code'] == 200) {
                this.toast.success(res['message']);
                this.router.navigate(['/dashboard']);
            }
            else{
                this.toast.warning(res['message']);
                this.router.navigate(['/pages/changepassword']);
            }
        })
        this.forogtPasswordForm.reset();
    }

    // On login link click
    onLogin() {
        this.router.navigate(['login'], { relativeTo: this.route.parent });
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }

    onForgotFormSubmit() {
        this.forgotForm.reset();
    }
}
