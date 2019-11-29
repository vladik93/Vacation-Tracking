import { Component, OnInit, ElementRef } from '@angular/core';
import { VacationService } from '../vacation.service';
import { UserService } from '../user.service';
import { Vacation } from '../vacation.model';
import { map } from 'rxjs/operators';
import { User } from '../user.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  vacations: Vacation[] = [];
  session = {};
  likeStatus: any = {};

  constructor(private service: VacationService, private userService: UserService, private el: ElementRef, private cookie: CookieService,
    private router: Router) { }

  ngOnInit() {
    this.userService.userSession()
    .subscribe(data => this.session = data);
    console.log(this.userService.loggedUserData);

    if (this.cookie.check('express-session-storage') === false) {
      this.router.navigateByUrl('error/session_error');
    }

    this.userService.userSession()
      .pipe(map((user) => {
        if (user.admin.data[0] === 1) {
          this.router.navigateByUrl('error/users_only_error');
        }
    }))
    .subscribe();

    this.showVacationsOrdered();
    setInterval(() => {
      this.showVacationsOrdered();
    }, 5000);
  }

  showAllVacations() {
    this.service.getVacations().subscribe(
      data => this.vacations = data
    );
  }

  showVacationsOrdered() {
    this.userService.vacationsOrdered()
    .subscribe(
      data => this.vacations = data
    );
  }

  onFollow(id) {
   this.userService.vacationLike(id)
   .subscribe((data) => console.log(data));
  }




  // onUnfollow(id) {
  //   this.userService.vacationUnlike(id)
  //   .subscribe((data) => console.log(data));
  // }



}
