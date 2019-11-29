import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-still-logged-error',
  templateUrl: './still-logged-error.component.html',
  styleUrls: ['./still-logged-error.component.css']
})
export class StillLoggedErrorComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onLoggedBackNav() {
    this.userService.userSession()
    .pipe(map(user => {
      if (user.admin.data[0] === 0) {
        this.router.navigateByUrl('/main');
      } else if (user.admin.data[0] === 1) {
        this.router.navigateByUrl('/admin');
      }
    }))
    .subscribe();
  }

}
