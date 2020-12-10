import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../../../shared/auth/auth.service'
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
    LoginForm: FormGroup;

    @ViewChild('f', { static: false }) loginForm: NgForm;
    constructor(private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private toast: ToastrService) { }

    ngOnInit() {

        if (this.authService.getToken()) {
            this.router.navigate(['/dashboard'])
        }
        this.LoginForm = new FormGroup({
            'name': new FormControl(null, [Validators.required]),
            'password': new FormControl(null, [Validators.required])
        })

    }
    // On submit button click

    onSubmit(value) {
        this.authService.login(value).subscribe(res => {
            if (res && res['status'] == 200) {
                localStorage.setItem('_token', res['token']);
                localStorage.setItem("_id", res['id']);
                this.toast.success(res['message']);
                this.router.navigate(['/dashboard']);
                this.LoginForm.reset();
            }
            else {
                this.toast.warning(res['message']);
            }
        })
    }

    // onForgotPassword() {
    //     this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    // }
    // // On registration link click
    // onRegister() {
    //     this.router.navigate(['register'], { relativeTo: this.route.parent });
    // }
}
