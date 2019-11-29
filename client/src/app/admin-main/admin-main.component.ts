import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { UserService } from '../user.service';
import { VacationService } from '../vacation.service';
import { Vacation } from '../vacation.model';
import { Form, NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
    datePickerConfig: Partial<BsDatepickerConfig>;
    public modalRef: BsModalRef;
    alerts: any[] = [{
        type: 'danger',
        msg: 'You have deleted the vacation',
        timeout: 3000
    }];

    cookieValue: string;
    imageUrl = 'http://localhost/vladi_project_images/no_image.jpg';

    defaultImage = 'http://localhost/vladi_project_images/no_image.jpg';

    vacations: Vacation[] = [];
    vacationById: any = {
        id: null,
        description: '',
        destination: '',
        image: '',
        checked_image: '',
        start_date: '',
        start_date_format: new Date(),
        end_date_format: new Date(),
        end_date: '',
        price: null
    };

    onClosed(dismissedAlert: AlertComponent): void {
        this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
    }

    constructor(private service: VacationService, private modalService: BsModalService, private cookieService: CookieService,
        private userService: UserService, private router: Router ) {}
    public openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template); // {3}
    }

    ngOnInit() {
        this.cookieValue = this.cookieService.get('express-session-storage');
        if (this.cookieService.check('express-session-storage') === false) {
            this.router.navigateByUrl('error/session_error');
        }

        this.userService.userSession()
        .pipe(map((user) => {
            if (user.admin.data[0] === 0) {
                this.router.navigateByUrl('error/admin_error');
            }
        }))
        .subscribe();

        this.showAllVacations();
        setInterval(() => {
            this.showAllVacations();
        }, 4000);

    }

    showAllVacations() {
        this.service.getVacations().subscribe(
            data => this.vacations = data
        );
    }

    showVacationById(id) {
        this.service.getVacationById(id)
        .subscribe(
            data => this.vacationById = data[0]
        );
    }

    onAddVacation(data) {
        this.service.postVacation(data).subscribe(
            post => console.log(post)
        );
        console.log(data);
    }

    onUpdateVacation(data: Vacation) {
        this.service.updateVacation(data, this.vacationById.id)
        .pipe(map((val) => {
            console.log(val);
        }))
        .subscribe(
            update => console.log(update)
        );
    }

    onDeleteVacation(id) {
        this.service.deleteVacation(id).subscribe(
            data => console.log(data)
        );
    }

    onStartDateChange() {
        if (this.vacationById.start_date_format !== '') {
            this.vacationById.end_date_format = '';
        }
    }

    onEndDateChange() {
        if (this.vacationById.end_date_format !== '') {
            this.vacationById.start_date_format = '';
        }
    }

}
