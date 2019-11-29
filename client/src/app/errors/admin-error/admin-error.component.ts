import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-error',
  templateUrl: './admin-error.component.html',
  styleUrls: ['./admin-error.component.css']
})
export class AdminErrorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  nonAdminBackNav() {
    this.router.navigateByUrl('/main');
  }
}
