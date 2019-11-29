import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMsg = '';
  userModel: User = {
    id: null,
    first_name: '',
    last_name: '',
    username: '',
    password: ''
  };

  constructor(private service: UserService, private cookie: CookieService, private router: Router) { }

  ngOnInit() {
    if (this.cookie.check('express-session-storage') === true) {
      this.router.navigateByUrl('error/still_logged_error');
    }
  }

  // onNewUserSubmit(user: User) {
  //   this.service.postUser(user).subscribe(
  //     data => console.log(data)
  //   );
  //   this.router.navigateByUrl('/login');
  // }

  onNewUserSubmit(user: User) {
    this.errorMsg = '';
    this.service.fetchAllUsers()
    .pipe(map((value) => {
      for (let i = 0; i < value.length; i++) {
       // console.log(value[i].first_name);
       const firstName = user.first_name;
       const lastName = user.last_name;
       const username = user.username;
       const password = user.password;

       if (value[i].first_name === firstName && value[i].last_name === lastName) {
         this.errorMsg = 'The user (First and Last Name) already exists';
         return;

       } else if (value[i].username === username) {
         this.errorMsg = 'The username is already taken';
         return;
       } else if (password.length < 6) {
         this.errorMsg = 'The password must be at least 6 characters long';
         return;
       } else if (firstName === '' || lastName  === '' || username === '' || password === '') {
        this.errorMsg = 'All fields must be filled';
        return;
       }
      }

      this.service.postUser(user)
      .pipe(map(() => {
        this.router.navigateByUrl('/login');
      }))
      .subscribe((val) => console.log(val));
    }))
    .subscribe((data) => console.log(data));
  }
}
