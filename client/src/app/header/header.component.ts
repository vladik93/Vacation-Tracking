import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  session = {};
  constructor(private userService: UserService, private router: Router, private cookie: CookieService) { }

  ngOnInit() {
    this.userService.userSession()
    .subscribe((data) => this.session = data);
  }

  onSessionLogout() {
    this.userService.userSessionLogout()
    .pipe(map(() => {
      this.cookie.delete('express-session-storage', '/'); // setting the cookie path to '/' (all) worked for logging out in charts
      this.router.navigateByUrl('/login');
    }))
    .subscribe((data) => console.log(data));
  }


}
