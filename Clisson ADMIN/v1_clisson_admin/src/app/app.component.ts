import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    helper = new JwtHelperService();
    token = localStorage.getItem('_token')
    decodedToken = this.helper.decodeToken(this.token);
    expirationDate = this.helper.getTokenExpirationDate(this.token);
    isExpired = this.helper.isTokenExpired(this.token);
    subscription: Subscription;

    constructor(private router: Router,
        private toast: ToastrService) {
    }

    ngOnInit() {
        if (this.token) {
            if (this.isExpired == true) {
                this.toast.error("Token Expire Veuillez vous connecter agian");
                localStorage.clear();
                this.router.navigate(['/pages/login'])
                return false

            }
        }
        this.subscription = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(() => window.scrollTo(0, 0));
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}