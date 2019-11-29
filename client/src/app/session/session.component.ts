import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  user = {};

  constructor(private service: UserService, private http: HttpClient) { }

  ngOnInit() {
    this.service.userSession()
    .subscribe((data) => this.user = data);
  }

}
