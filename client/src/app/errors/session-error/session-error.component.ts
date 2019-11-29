import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-error',
  templateUrl: './session-error.component.html',
  styleUrls: ['./session-error.component.css']
})
export class SessionErrorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onNoSessionFound() {
    this.router.navigateByUrl('/login');

  }

}
