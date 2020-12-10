import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, timeout, find } from 'rxjs/operators';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CURE-ADMIN';
  constructor(public router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      var rt = this.getTitle(this.activatedRoute)
      rt.data.subscribe((data: any) => {
        this.titleService.setTitle(data.title)
      })
    })
  }

  getTitle(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getTitle(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }

  }

}
