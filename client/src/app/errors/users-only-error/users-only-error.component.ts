import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-only-error',
  templateUrl: './users-only-error.component.html',
  styleUrls: ['./users-only-error.component.css']
})
export class UsersOnlyErrorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  userOnlyBackNav() {
    this.router.navigateByUrl('/admin');
  }
}
