import { Component, OnInit } from '@angular/core';
import { UserService} from '../user.service';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMsg = '';
  model = new User('vlad_admin', '12345', 20, 'test_firstname', 'test_lastname');
  userData: any;

  constructor(private service: UserService, private router: Router, private cookie: CookieService) { }




  ngOnInit() {
    if (this.cookie.check('express-session-storage') === true) {
      this.router.navigateByUrl('error/still_logged_error');
    }
  }

  onUserLogin(user: User) { // Use pipe(map()) to set conditionals before on subscription
    this.service.fetchAllUsers()
    .pipe(map((val) => {
      for (let i = 0; i < val.length; i++) {
        const username = user.username;
        const password = user.password;

        if (val[i].username !== username && val[i].password !== password) {
          this.errorMsg = 'User not registered';
          return;
        } else if (username === '' || password === '') {
          this.errorMsg = 'All fields must be filled';
          return;
        }
      }
    }))
    .subscribe((data) => console.log(data));
    this.service.loginUser(user)
    .pipe(map((value) => {
      if (value.admin.data[0] === 1) {
          this.router.navigateByUrl('/admin');
      } else if (value.admin.data[0] === 0) {
        this.router.navigateByUrl('/main');
      }
    }))
    .subscribe(
      data => console.log(data)
    );
  }
}

// onUserLogin(user: User) {
//   this.errorMsg = '';
//   this.service.fetchAllUsers()
//   .pipe(map((value) => {
//     for (let i = 0; i < value.length; i++) {
//        const username = user.username;
//        const password = user.password;

//        if (value[i].username !== username && value[i].password !== password) {
//          this.errorMsg = `The user isn't registered`;
//          return;
//        }
//     }
//   this.service.loginUser(user)
//   .pipe(map((val) => {
//     if (val.admin.data[0] === 1) {
//       this.router.navigateByUrl('/admin');
//     } else if (val.admin.data[0] === 0) {
//       this.router.navigateByUrl('/main');
//     }
//   }))
//   .subscribe((data) => console.log(data));
//   }));
// }}
